Save a checkpoint of the current work. This creates a git commit so the user can always come back to this point.

Steps:

1. Run git status to see what changed
2. Stage all changed and new files (except .env.local and node_modules)
3. Generate a short, descriptive commit message based on what changed (e.g., "add user profiles page with edit form")
4. Create the commit
5. Confirm success and show a one-line summary of what was saved
6. Do NOT push to GitHub — this is a local save point only. Tell the user to run /deploy when they're ready to go live.
