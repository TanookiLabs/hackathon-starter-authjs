Debug and fix the current issue. The user may paste an error message, describe a visual bug, or just say "it's broken."

Steps:

1. If the user provided an error message, read it carefully and identify the root cause.
2. If no error was provided, check for issues:
   - Run the TypeScript type checker to find compile errors
   - Check the terminal output for runtime errors
   - Read recent file changes to find likely problem areas
3. Explain the problem in one sentence (no jargon).
4. Fix the code.
5. Verify the fix by re-running the type checker.
6. Tell the user what was wrong and what you changed.

Common hackathon issues to check for:

- Missing environment variables (check .env.local)
- Database table doesn't exist yet (run npm run db:push)
- Import paths are wrong after moving files
- Missing `"use server"` directive on server actions
- Forgot to install a package (run npm install)
- Auth session is null (user not signed in, or forgot to check auth())
