import bcrypt from "bcryptjs"
import { config } from "dotenv"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { users } from "./schema"

config({ path: ".env.local" })

const client = postgres(process.env.DATABASE_URL!, { prepare: false })
const db = drizzle(client)

async function main() {
  const password = await bcrypt.hash("password", 10)

  await db
    .insert(users)
    .values([
      { name: "Alice", email: "alice@example.com", password },
      { name: "Bob", email: "bob@example.com", password },
      { name: "Charlie", email: "charlie@example.com", password },
    ])
    .onConflictDoNothing()

  console.log("Seeded 3 demo users (password: 'password')")
  console.log("  alice@example.com")
  console.log("  bob@example.com")
  console.log("  charlie@example.com")

  await client.end()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
