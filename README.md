# Hackathon Starter: Next.js + Auth.js + Drizzle

Pre-configured for the AI Bootcamp with Slow Creator Fund. Uses Auth.js (NextAuth v5) for email/password authentication and Drizzle ORM for type-safe database queries. No third-party auth services — everything runs through your own database.

## What's Included

- **Next.js** (App Router) with TypeScript
- **Auth.js** (NextAuth v5) for email/password authentication (bcrypt hashed, JWT sessions)
- **Drizzle ORM** for type-safe database queries (schema-first, auto-syncs to your database)
- **Tailwind CSS** + **shadcn/ui** components
- **Claude Code config** (CLAUDE.md + custom slash commands)
- **Automatic database migrations** on every Vercel deploy
- Ready to deploy on **Vercel**

## Quick Start

### 1. Clone and install

```bash
git clone git@github.com:TanookiLabs/hackathon-starter-authjs.git my-project
cd my-project
npm install
```

### 2. Set up a PostgreSQL database

You need a PostgreSQL database. Pick any provider:

- **Supabase** (recommended): Go to [supabase.com/dashboard](https://supabase.com/dashboard) → create a project → **Connect** → **ORM** tab → select **Drizzle** → copy the `DATABASE_URL`. **Change the port to `5432`** (Session Pooler).
- **Neon**: Go to [neon.tech](https://neon.tech) → create a project → copy the connection string.
- **Railway**: Go to [railway.app](https://railway.app) → add a PostgreSQL service → copy the connection string.

### 3. Configure environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and fill in:
- `AUTH_SECRET` — generate with `npx auth secret`
- `DATABASE_URL` — your PostgreSQL connection string

That's it — just two environment variables to get started.

### 4. Push the database schema

```bash
npm run db:push
```

This creates the auth tables and example `posts` table in your database.

### 5. Run it

```bash
npm run dev
```

Open [localhost:3000](http://localhost:3000) in your browser. You can sign up with any email/password.

### 6. Deploy to Vercel

```bash
# Option A: Tell Claude Code
claude
> "Deploy this to Vercel"

# Option B: Use the Vercel dashboard
# Go to vercel.com/new → Import your GitHub repo → Deploy
```

Add your environment variables in Vercel → Settings → Environment Variables (`AUTH_SECRET`, `DATABASE_URL`).

Database schema migrations run automatically on every deploy — the build command runs `drizzle-kit push` before `next build`, so your production database stays in sync with your code.

## Using Claude Code

This project comes with a `CLAUDE.md` and custom slash commands pre-configured. Open Claude Code in this directory and try:

| Command      | What It Does                                                       |
| ------------ | ------------------------------------------------------------------ |
| `/plan`      | Turn your idea into a requirements + build plan                    |
| `/build`     | Execute the plan step by step                                      |
| `/add-table` | Add a new table to the Drizzle schema                              |
| `/add-ai`    | Add an AI feature (image gen, text gen, chat)                      |
| `/design`    | Build or redesign a UI from a description                          |
| `/fix`       | Debug and fix the current error                                    |
| `/snapshot`  | Save a local git checkpoint                                        |
| `/deploy`    | Commit, push to GitHub, and deploy (schema migrates automatically) |
| `/help`      | Show all available commands and tips                                |

## Adding Features

Tell Claude Code what you want to add. Some examples:

- "Add a dashboard page that shows a list of my brand deals"
- "Add image generation using Replicate — let users describe an image and generate it"
- "Add a contact form that saves submissions to the database"
- "Add Stripe checkout so users can buy my digital products"

## Authentication

Authentication uses **Auth.js (NextAuth v5)** with email/password. Passwords are hashed with bcrypt. Sessions use JWT tokens (no session table lookups on every request).

### Get the current user in a Server Component or Server Action

```typescript
import { auth } from "@/auth"

const session = await auth()
const user = session?.user // { id, name, email }
```

### Get the current user in a Client Component

```typescript
"use client"
import { useSession } from "next-auth/react"

const { data: session } = useSession()
const user = session?.user
```

### Protect a route

Routes under `/protected/*` are automatically protected by `middleware.ts`. To protect additional routes, add them to the matcher:

```typescript
// middleware.ts
export const config = {
  matcher: ["/protected/:path*", "/dashboard/:path*"],
}
```

### Add OAuth providers (optional)

To add Google, GitHub, Discord, or other OAuth providers alongside email/password, edit `auth.ts`:

```typescript
import Google from "next-auth/providers/google"

export const { handlers, auth, signIn, signOut } = NextAuth({
  // ...
  providers: [
    Credentials({ ... }),
    Google,
  ],
})
```

Then add `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` to your `.env.local`.

## Database with Drizzle ORM

Your database schema is defined in `lib/db/schema.ts`. This is the single source of truth for your tables.

### Define a table

```typescript
// lib/db/schema.ts
export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})
```

### Sync to database

```bash
npm run db:push
```

This pushes your schema to the dev database (from `.env.local`). When you deploy to Vercel, the same command runs automatically against the production database.

### Query data

```typescript
import { db } from "@/lib/db/drizzle"
import { products } from "@/lib/db/schema"

// Read all
const allProducts = await db.select().from(products)

// Insert
await db.insert(products).values({ name: "T-Shirt", price: 2500, userId: session.user.id })

// Filter
const cheap = await db.select().from(products).where(lt(products.price, 1000))
```

### Browse data

```bash
npm run db:studio
```

Opens a visual data browser at localhost:4983.

## How Deployment Works

```
You edit lib/db/schema.ts locally
  → npm run db:push syncs to dev database
  → git push to GitHub
  → Vercel builds: runs drizzle-kit push (syncs prod database) then next build
  → Your app and database are both updated
```

No manual migration step. Code and schema deploy together.

## Project Structure

```
auth.ts                         ← Auth.js configuration (credentials provider, JWT)
middleware.ts                   ← Route protection (redirects unauthenticated users)
app/
  page.tsx                      ← Homepage
  layout.tsx                    ← Root layout (fonts, theme, SessionProvider)
  globals.css                   ← Tailwind + CSS variables
  sign-in/page.tsx              ← Email/password sign-in form
  sign-up/page.tsx              ← Registration form
  api/auth/[...nextauth]/
    route.ts                    ← Auth.js API route handler
  protected/
    page.tsx                    ← Protected page (requires login)
components/
  ui/                           ← shadcn/ui components (button, card, input, etc.)
  auth-button.tsx               ← Login/user button (switches based on session)
  sign-in-button.tsx            ← Sign in / Sign up links
  user-button.tsx               ← User dropdown with sign-out
  session-provider.tsx          ← Client-side SessionProvider wrapper
lib/
  actions/
    auth.ts                     ← Sign-up and sign-in server actions
  db/
    drizzle.ts                  ← Database client (Drizzle + postgres.js)
    schema.ts                   ← Database schema (auth tables + your tables)
  utils.ts                      ← cn() helper for classnames
drizzle.config.ts               ← Drizzle Kit configuration
.claude/
  commands/                     ← Custom Claude Code slash commands
CLAUDE.md                       ← Claude Code project config
.env.local.example              ← Environment variable template
```

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in the values you need:

| Variable              | Required              | Where to Get It                            |
| --------------------- | --------------------- | ------------------------------------------ |
| `AUTH_SECRET`         | Yes                   | Generate with `npx auth secret`            |
| `DATABASE_URL`        | Yes                   | Your PostgreSQL provider's dashboard       |
| `REPLICATE_API_TOKEN` | For image/video gen   | replicate.com/account/api-tokens           |
| `OPENAI_API_KEY`      | For text gen (OpenAI) | platform.openai.com/api-keys               |
| `STRIPE_SECRET_KEY`   | For payments          | dashboard.stripe.com/apikeys               |
| `RESEND_API_KEY`      | For email             | resend.com/api-keys                        |
