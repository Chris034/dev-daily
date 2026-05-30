import { defineConfig } from 'drizzle-orm';

export default defineConfig({
  schema: './src/db/schema.ts',
  driver: 'pg',
  connectionString: process.env.DATABASE_URL,
  migrations: {
    directory: './src/db/migrations',
  },
});