Create a new page in the Next.js app. Ask the user what the page should be called and what it should contain.

Steps:

1. Create a new directory under app/ with the page name (e.g., app/dashboard/)
2. Create a page.tsx file with a React component
3. Use shadcn/ui components and Tailwind CSS for styling
4. If the page needs data from the database, use Drizzle ORM (db from lib/db/drizzle.ts) in a server action or server component. Use auth() from auth.ts to get the current user.
5. Add a link to the new page in the navigation/header
