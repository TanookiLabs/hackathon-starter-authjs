Deploy the app: push code to GitHub, which triggers Vercel to build and deploy. Database schema migrations run automatically during the Vercel build.

Steps:

1. If lib/db/schema.ts has changed, run `npm run db:push` to sync the local dev database first
2. Commit all changes to git with a descriptive commit message that summarizes what was changed
3. Push to GitHub
4. Confirm the Vercel deployment is building. Show the deployment URL when done.
5. Explain: Vercel runs `drizzle-kit push && next build`, so the database schema is updated automatically during every deploy. No manual migration step needed. Preview deploys sync the dev DB, production deploys sync the prod DB — based on the DATABASE_URL configured for each Vercel environment scope.
6. Remind the user: make sure their environment variables are set in Vercel Settings:
   - AUTH_SECRET (all scopes)
   - DATABASE_URL for Production scope → prod database connection string
   - DATABASE_URL for Preview scope → dev database connection string
