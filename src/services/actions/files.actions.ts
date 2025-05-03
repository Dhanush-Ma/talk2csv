"use server";
import { z } from "zod";
import { actionClient } from "./safe-actions";
import { actionOutputSchema } from "@/schema/action.schema";
import { db } from "@/db";
import { filesSchema } from "@/schema/files.schema";
import { files } from "@/db/schema";
import { revalidatePath } from "next/cache";

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
  .schema(filesSchema.extend({ userId: z.string() }))
  .outputSchema(actionOutputSchema)
  .action(async ({ parsedInput }) => {
    try {
      const { name, tags, file, userId } = parsedInput;

      const newFile = await db.insert(files).values({
        name: name,
        tags: tags,
        rows: file.size,
        size: file.size,
        tableName: file.name,
        userId: userId,
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
