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

### 2. Set up Supabase

You'll create **two Supabase projects** — one for development and one for production. This keeps your dev data completely separate from your live app.

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Create a project named `my-project-dev`
3. Create a second project named `my-project-prod`
4. For each project, go to **Connect** → **ORM** tab → select **Drizzle** → copy the `DATABASE_URL`

> ⚠️ **Important:** Supabase's Drizzle example uses port `6543` (Transaction Pooler), which breaks `db:push`. **Change the port to `5432`** (Session Pooler) before pasting.
>
> It should look like: `postgresql://postgres.YOURREF:PASSWORD@aws-X-REGION.pooler.supabase.com:5432/postgres`

Save both connection strings — you'll use the dev one locally and the prod one in Vercel.

### 3. Configure local environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and fill in:
- `AUTH_SECRET` — generate with `npx auth secret`
- `DATABASE_URL` — your **dev** Supabase connection string

### 4. Push the database schema

```bash
npm run db:push
```

This creates the auth tables and example `posts` table in your dev database.

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

Add environment variables in **Vercel → Settings → Environment Variables**:

| Variable       | Value                                    |
| -------------- | ---------------------------------------- |
| `AUTH_SECRET`  | Same secret you generated locally        |
| `DATABASE_URL` | Your **prod** Supabase connection string |

Database schema migrations run automatically on every deploy — the build command runs `drizzle-kit push` before `next build`, so your production database stays in sync with your code.

## How It Works: Dev vs Production

```
LOCAL DEVELOPMENT
  .env.local → DATABASE_URL points to dev Supabase project
  npm run db:push → syncs schema to dev database
  npm run dev → runs app against dev database

PRODUCTION (Vercel)
  Vercel env vars → DATABASE_URL points to prod Supabase project
  git push → Vercel builds → drizzle-kit push syncs schema to prod database → next build runs
  Your app and production database are both updated automatically
```

| Environment | Database | How Schema Gets Updated |
|-------------|----------|------------------------|
| **Local dev** | Dev Supabase project (from `.env.local`) | You run `npm run db:push` |
| **Production** | Prod Supabase project (from Vercel env vars) | Automatic on every `git push` / deploy |

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

### Route protection

All routes are protected by default — any page you create requires login automatically. Public routes (like the homepage and sign-in pages) are explicitly whitelisted in `proxy.ts`.

To make a new route public, add it to the `publicRoutes` array:

```typescript
// proxy.ts
const publicRoutes = ["/", "/sign-in", "/sign-up", "/api/auth", "/pricing"]
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

## Project Structure

```
auth.ts                         ← Auth.js configuration (credentials provider, JWT)
proxy.ts                        ← Route protection (all routes require login by default)
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
| `DATABASE_URL`        | Yes                   | Supabase → Connect → ORM → Drizzle        |
| `REPLICATE_API_TOKEN` | For image/video gen   | replicate.com/account/api-tokens           |
| `OPENAI_API_KEY`      | For text gen (OpenAI) | platform.openai.com/api-keys               |
| `STRIPE_SECRET_KEY`   | For payments          | dashboard.stripe.com/apikeys               |
| `RESEND_API_KEY`      | For email             | resend.com/api-keys                        |
