import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import chats from "./chat";

export const rolesEnum = pgEnum("roles", [
  "system",
  "user",
  "assistant",
  "data",
]);

const message = pgTable("message", {
  id: uuid("id").primaryKey().defaultRandom(),
  role: rolesEnum("role").notNull(),
  content: text("content").notNull(),
  chatId: uuid("chat_id")
    .references(() => chats.id, {
      onDelete: "cascade",
    })
    .notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
});

export default message;

export type Message = typeof message.$inferSelect;
