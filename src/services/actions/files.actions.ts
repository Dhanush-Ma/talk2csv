"use server";
import { z } from "zod";
import { actionClient } from "./safe-actions";
import { actionOutputSchema } from "@/schema/action.schema";
import { db } from "@/db";
import { filesSchema } from "@/schema/files.schema";
import { files } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { generateCreateTableSQL } from "@/lib/utils";
import { and, desc, eq, ilike } from "drizzle-orm";
import { AppConfig } from "@/lib/config";

const fetchUserFilesSchema = z.object({
  userId: z.string(),
  query: z.string().optional(),
});

export const fetchUserFiles = actionClient
  .schema(fetchUserFilesSchema)
  .outputSchema(actionOutputSchema)
  .action(async ({ parsedInput: { userId, query } }) => {
    try {
      const fetchedFiles = await db
        .select()
        .from(files)
        .where(
          and(
            eq(files.userId, userId),
            query ? ilike(files.name, query) : undefined
            // query ? ilike(files.tags, `%${query}%`) : undefined
          )
        )
        .orderBy(desc(files.uploadedAt));

      return {
        status: "success",
        data: fetchedFiles,
      };
    } catch (error) {
      console.log("Error fetching user files:", error);
      return {
        status: "error",
        message:
          "An error occurred while fetching user files. Try again later.",
      };
    }
  });

export const fetchUserFile = actionClient
  .schema(
    z.object({
      fileId: z.string(),
    })
  )
  .outputSchema(actionOutputSchema)
  .action(async ({ parsedInput: { fileId } }) => {
    try {
      const fetchedFile = await db
        .select()
        .from(files)
        .where(eq(files.id, fileId))
        .limit(1);

      if (fetchedFile.length === 0) {
        return {
          status: "error",
          message: "File not found.",
        };
      }

      return {
        status: "success",
        data: fetchedFile[0],
      };
    } catch (error) {
      console.log("Error fetching user file:", error);
      return {
        status: "error",
        message:
          "An error occurred while fetching the user file. Try again later.",
      };
    }
  });

export const fetchFileData = actionClient
  .schema(
    z.object({
      tableName: z.string(),
      offset: z.number(),
    })
  )
  .outputSchema(actionOutputSchema)
  .action(async ({ parsedInput: { tableName, offset } }) => {
    try {
      const pgHeaders = await db.execute(
        `SELECT column_name FROM information_schema.columns WHERE table_name = '${tableName}' AND table_schema = 'public'`
      );
      const headers = pgHeaders.map((h) => h["column_name"] as string);

      const pgRows = await db.execute(
        `SELECT * FROM "${tableName}" ORDER BY "${headers[0]}" LIMIT ${AppConfig.TABLE_PAGE_SIZE} OFFSET ${offset}`
      );
      const rows: string[][] = pgRows.map((row) =>
        headers.map((header) => {
          const value = row[header];
          return value === null || value === undefined ? "" : String(value);
        })
      );

      const noOfRows = await db.execute(`SELECT COUNT(*) FROM "${tableName}"`);

      return {
        status: "success",
        data: {
          rows,
          headers,
          rowsCount: noOfRows[0]["count"] as number,
        },
      };
    } catch (error) {
      console.log("Error fetching file data:", error);
      throw error;
    }
  });

export const createUserFile = actionClient
  .schema(
    filesSchema.extend({
      userId: z.string(),
      tableName: z.string(),
      headers: z.array(z.string()),
      rows: z.any(),
    })
  )
  .outputSchema(actionOutputSchema)
  .action(async ({ parsedInput }) => {
    try {
      const { name, tags, file, userId, tableName, headers, rows } =
        parsedInput;
      const newFile = await db.transaction(async (tx) => {
        const validHeaders = headers.filter((header) => header);

        // Create new table with the table name
        await tx.execute(generateCreateTableSQL(validHeaders, tableName));
        console.log("Table created successfully", tableName);

        // Insert the data into the new table
        let insertSQL = `INSERT INTO "${tableName}" VALUES `;

        for (const row of rows) {
          const values = validHeaders.map((header) => row[header]);
          const escapedValues = values.map((value) => {
            if (value === null || value === undefined) return "NULL";
            const escaped = String(value).replace(/'/g, "''");
            return `'${escaped}'`;
          });
          insertSQL += `(${escapedValues.join(",")}),`;
        }

        // Remove the trailing comma
        insertSQL = insertSQL.slice(0, -1);
        console.log(insertSQL);

        await tx.execute(insertSQL);
        console.log("Data inserted successfully");

        const f = await tx.insert(files).values({
          name: name,
          tags: tags,
          rows: rows.length,
          size: file.size,
          tableName: tableName,
          userId: userId,
        });
        console.log("File inserted successfully", f);

        return f;
      });

      revalidatePath("/files");

      return {
        status: "success",
        data: newFile,
      };
    } catch (error) {
      console.log("Error creating user file:", error);
      throw error;
    }
  });

export const deleteUserFile = actionClient
  .schema(
    z.object({
      fileId: z.string(),
      tableName: z.string(),
    })
  )
  .outputSchema(actionOutputSchema)
  .action(async ({ parsedInput }) => {
    try {
      const { fileId, tableName } = parsedInput;

      await db.transaction(async (tx) => {
        // Create new table with the table name
        await tx.execute(`DROP TABLE IF EXISTS "${tableName}";`);
        console.log("Table deleted successfully", tableName);

        await db.delete(files).where(eq(files.id, fileId));
        console.log("File deleted successfully", fileId);
      });

      revalidatePath("/files");
      revalidatePath("/chat", "layout");

      return {
        status: "success",
        message: "File deleted successfully",
      };
    } catch (error) {
      console.log("Error deleting user file:", error);
      throw error;
    }
  });
