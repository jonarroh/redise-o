import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const userPreferences = sqliteTable('userPreferences', {
  id: integer('id').primaryKey(),
  fontSize: integer('fontSize'),
  theme: text('theme'),
});