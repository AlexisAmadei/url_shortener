import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const tags = pgTable('tags', {
  id: integer().primaryKey(),
  name: text().unique().notNull(),
  color: text().notNull(),
})
