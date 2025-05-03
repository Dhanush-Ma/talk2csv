import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import users from "./user";

const files = pgTable("files", {
  id: uuid("id").primaryKey().defaultRandom(),
  tableName: varchar("table_name", { length: 63 }).notNull(),
  name: text("name").notNull(),
  size: integer("size").notNull(),
  rows: integer("rows").notNull(),
  tags: text("tags")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  uploadedAt: timestamp("uploaded_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  userId: uuid("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
});

export default files;

export type SelectUserFile = typeof files.$inferSelect;
