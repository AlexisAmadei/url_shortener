import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const links = pgTable('links', {
  slug: text().primaryKey(),
  url: text().notNull(),
  title: text().notNull(),
  max_visits: integer(),
  available_at: timestamp().defaultNow(),
  expired_at: timestamp(),
  created_at: timestamp().defaultNow(),
  update_at: timestamp().notNull().defaultNow(),
});
