"use server";

import { db } from "@/db";
import chats from "@/db/schema/chat";
import { createClient } from "@/lib/supabase/server";
import { actionOutputSchema } from "@/schema/action.schema";
import { and, desc, eq, asc } from "drizzle-orm";
import { actionClient } from "./safe-actions";
import { z } from "zod";
import message from "@/db/schema/message";
import { files } from "@/db/schema";
import { generateTalk2CSVSystemPrompt } from "@/lib/chat.config";
import { revalidatePath } from "next/cache";

export const fetchUserChats = actionClient
  .outputSchema(actionOutputSchema)
  .action(async () => {
    try {
      const client = await createClient();
      const {
        data: { user },
      } = await client.auth.getUser();

      if (!user) throw new Error("User not found");

      const fetchedChats = await db
        .select()
        .from(chats)
        .where(eq(chats.userId, user.id))
        .orderBy(desc(chats.updatedAt));

      return {
        status: "success",
        data: fetchedChats,
      };
    } catch (error) {
      console.log("Error fetching user chats:", error);
      return {
        status: "error",
        message:
          "An error occurred while fetching user chats. Try again later.",
        data: [],
      };
    }
  });

export const fetchChatMessages = actionClient
  .schema(z.object({ chatId: z.string() }))
  .outputSchema(actionOutputSchema)
  .action(async ({ parsedInput: { chatId } }) => {
    try {
      const client = await createClient();
      const {
        data: { user },
      } = await client.auth.getUser();

      if (!user) throw new Error("User not found.");

      const chat = await db
        .select()
        .from(chats)
        .where(and(eq(chats.userId, user.id), eq(chats.id, chatId)))
        .limit(1);

      if (!chat.length) {
        const errorMessage =
          "The chat requested does not exist or the user does not have permissions to the chat.";
        console.log(errorMessage);
        return {
          status: "error",
          message: errorMessage,
        };
      }

      const [chatMessages, file] = await Promise.all([
        await db
          .select()
          .from(message)
          .where(eq(message.chatId, chatId))
          .orderBy(asc(message.createdAt)),

        await db
          .select()
          .from(files)
          .where(eq(files.id, chat[0].fileId!))
          .limit(1),
      ]);

      return {
        status: "success",
        data: {
          chat: chat[0],
          file: file[0],
          messages: chatMessages,
        },
      };
    } catch (error) {
      console.log("Error fetching chat messages:", error);
      return {
        status: "error",
        message:
          "An error occurred while fetching chat messages. Try again later.",
      };
    }
  });

export const saveChatMessage = actionClient
  .schema(
    z.object({
      chatId: z.string(),
      role: z.enum(["user", "assistant"]),
      content: z.string(),
      parts: z.array(z.record(z.string(), z.any())).optional(),
    })
  )
  .outputSchema(actionOutputSchema)
  .action(async ({ parsedInput: { chatId, content, role, parts } }) => {
    try {
      const client = await createClient();
      const {
        data: { user },
      } = await client.auth.getUser();

      if (!user) throw new Error("User not found.");

      const savedMessage = await db
        .insert(message)
        .values({
          chatId,
          role,
          content,
          parts: parts ? JSON.stringify(parts) : null,
        })
        .returning({ savedMessageId: message.id });

      return {
        status: "success",
        data: savedMessage,
      };
    } catch (error) {
      console.log("Error saving chat message:", error);
      return {
        status: "error",
        message:
          "An error occurred while saving the chat message. Try again later.",
      };
    }
  });

export const createNewChat = actionClient
  .schema(z.object({ fileId: z.string() }))
  .outputSchema(actionOutputSchema)
  .action(async ({ parsedInput: { fileId } }) => {
    try {
      const filesResponse = await db
        .select({
          tableName: files.tableName,
          fileName: files.name,
          userId: files.userId,
        })
        .from(files)
        .where(eq(files.id, fileId))
        .limit(1);

      if (!filesResponse.length) {
        return {
          status: "error",
          message: "File not found.",
        };
      }

      const file = filesResponse[0];

      const chatId = await db.transaction(async (tx) => {
        const newChat = await tx
          .insert(chats)
          .values({
            title: `Exploring insights from ${file.fileName}`,
            userId: file.userId!,
            fileId: fileId,
          })
          .returning({ newChatId: chats.id });

        // Fetch schema for the table using raw SQL
        const schemaResult = await db.execute(
          `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = '${file.tableName}' AND table_schema = 'public'`
        );

        // Format schema as an array of { column_name, data_type }
        const schema = schemaResult.map((row) => ({
          name: row.column_name as string,
          type: row.data_type as string,
        }));

        const SYSTEM_PROMPT = generateTalk2CSVSystemPrompt(
          file.tableName,
          schema
        );

        await tx.insert(message).values({
          chatId: newChat[0].newChatId,
          role: "system",
          content: SYSTEM_PROMPT,
          parts: null,
        });

        return newChat[0].newChatId;
      });

      return {
        status: "success",
        data: {
          chatId,
        },
      };
    } catch (error) {
      console.log("Error creating new chat:", error);
      return {
        status: "error",
        message:
          "An error occurred while creating a new chat. Try again later.",
      };
    }
  });

export const deleteChat = actionClient
  .schema(z.object({ chatId: z.string() }))
  .outputSchema(actionOutputSchema)
  .action(async ({ parsedInput: { chatId } }) => {
    try {
      const client = await createClient();
      const {
        data: { user },
      } = await client.auth.getUser();

      if (!user) throw new Error("User not found.");

      const deletedChat = await db
        .delete(chats)
        .where(and(eq(chats.userId, user.id), eq(chats.id, chatId)))
        .returning({ deletedChatId: chats.id });

      if (!deletedChat.length) {
        return {
          status: "error",
          message:
            "The chat requested does not exist or the user does not have permissions to the chat.",
        };
      }

      revalidatePath(`/chat/${chatId}`);

      return {
        status: "success",
        data: deletedChat,
      };
    } catch (error) {
      console.log("Error deleting chat:", error);
      return {
        status: "error",
        message: "An error occurred while deleting the chat. Try again later.",
      };
    }
  });

export const renameChat = actionClient
  .schema(z.object({ chatId: z.string(), title: z.string() }))
  .outputSchema(actionOutputSchema)
  .action(async ({ parsedInput: { chatId, title } }) => {
    try {
      const client = await createClient();
      const {
        data: { user },
      } = await client.auth.getUser();

      if (!user) throw new Error("User not found.");

      const renamedChat = await db
        .update(chats)
        .set({ title })
        .where(and(eq(chats.userId, user.id), eq(chats.id, chatId)))
        .returning({ renamedChatId: chats.id });

      if (!renamedChat.length) {
        return {
          status: "error",
          message:
            "The chat requested does not exist or the user does not have permissions to the chat.",
        };
      }

      return {
        status: "success",
        data: renamedChat,
      };
    } catch (error) {
      console.log("Error renaming chat:", error);
      return {
        status: "error",
        message: "An error occurred while renaming the chat. Try again later.",
      };
    }
  });
