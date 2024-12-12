import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
// import { string } from "zod";

export const visits = pgTable('visits', {
  id: uuid().primaryKey().defaultRandom(),
  linkId: text('link_id'),
  createdAt: timestamp('created_at').notNull(),
  ip: text().notNull(),
  userAgent: text('user_agent').notNull(),
})
