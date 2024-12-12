import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const tags = pgTable('tags', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().unique().notNull(),
  color: text().notNull(),
})
