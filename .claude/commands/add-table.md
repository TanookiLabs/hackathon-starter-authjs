Create a new database table using Drizzle ORM. Ask the user what data they want to store.

Steps:

1. Determine the table name and columns based on the user's description
2. Add the table definition to lib/db/schema.ts using Drizzle's pgTable API
3. Export type helpers using $inferSelect and $inferInsert for the new table
4. Run `npm run db:push` to sync the schema to the database
5. If the table has a user-owned column, add a foreign key reference to users.id: `userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" })`
6. Create a server action that uses `db` from lib/db/drizzle.ts to insert and query data. Use `auth()` from auth.ts to get the current user's ID for filtering.
7. Show the user a quick example of how to use the new table in a component
