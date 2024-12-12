import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const links = pgTable('links', {
  id: uuid().primaryKey().defaultRandom(),
  slug: text().notNull().unique(),
  url: text().notNull(),
  title: text().notNull(),
  maxVisits: integer('max_visits'),
  availableAt: timestamp('available_at').defaultNow(),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
