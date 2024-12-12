import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { links } from "./links";
import { tags } from "./tags";

export const linkTags = pgTable('link_tags', {
  id: uuid().primaryKey().defaultRandom(),
  linkId: uuid().notNull().references(() => links.id, {
    onDelete: 'cascade',
  }),
  tagId: uuid().notNull().references(() => tags.id, {
    onDelete: 'cascade',
  }),
});