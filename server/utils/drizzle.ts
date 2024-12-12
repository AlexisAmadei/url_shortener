import * as schema from '../database/schema'
import { drizzle } from 'drizzle-orm/node-postgres';

// This is a trick to make `tables` available in the app, as it is auto-imported by Nitro
export const tables = schema

// This is imported automatically in the app !
export function useDrizzle() {
  // console.log("DATABASE_URL:", process.env.DATABASE_URL);
  return drizzle(process.env.DATABASE_URL!, {
    schema,
  });
}
