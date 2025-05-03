"use server";
import { z } from "zod";
import { actionClient } from "./safe-actions";
import { actionOutputSchema } from "@/schema/action.schema";
import { db } from "@/db";
import { filesSchema } from "@/schema/files.schema";
import { files } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { generateCreateTableSQL } from "@/lib/utils";
import { eq } from "drizzle-orm";

const fetchUserFilesSchema = z.object({
  userId: z.string(),
  query: z.string().optional(),
});

export const fetchUserFiles = actionClient
  .schema(fetchUserFilesSchema)
  .outputSchema(actionOutputSchema)
  .action(async ({ parsedInput: { userId } }) => {
    try {
      const files = await db.query.files.findMany({
        where: (files, { eq }) => eq(files.userId, userId),
        orderBy: (files, { desc }) => [desc(files.uploadedAt)],
      });

      return {
        status: "success",
        data: files,
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
        // Create new table with the table name
        await tx.execute(generateCreateTableSQL(headers, tableName));
        console.log("Table created successfully", tableName);

        // Insert the data into the new table
        let insertSQL = `INSERT INTO "${tableName}" VALUES `;

        for (const row of rows) {
          const values = headers.map((header) => row[header]);
          const escapedValues = values.map((value) =>
            value === null ? "NULL" : `'${value}'`
          );
          insertSQL += `(${escapedValues.join(",")}),`;
        }

        // Remove the trailing comma
        insertSQL = insertSQL.slice(0, -1);

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

      return {
        status: "success",
        message: "File deleted successfully",
      };
    } catch (error) {
      console.log("Error deleting user file:", error);
      throw error;
    }
  });
