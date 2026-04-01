Show the user a summary of available custom commands and helpful tips for this hackathon project.

Available commands:

**Planning & Research:**

- /research — Look up a product, API, concept, or competitor before building
- /plan — Turn your idea into a requirements doc + step-by-step implementation plan
- /build — Execute your implementation plan one step at a time

**Building:**

- /new-page — Create a new page with navigation
- /add-table — Add a new table to the Drizzle schema and push to database
- /add-ai — Add an AI feature (image gen, text gen, chat)
- /design — Build or redesign a UI from a description

**Maintenance:**

- /fix — Debug and fix the current error
- /snapshot — Save a local git checkpoint of your progress
- /deploy — Commit, push to GitHub, deploy to Vercel, and sync database schema if changed
- /help — Show this help message

**Recommended workflow:**

1. /research — explore your idea and what APIs are available
2. /plan — write requirements and an implementation plan
3. /build — execute the plan step by step (repeat until done)
4. /snapshot — save checkpoints as you go
5. /deploy — ship it live when you're ready to demo

Tips:

- Be specific in your prompts: "Add a grid of 3 cards with name, image, and description" works better than "Add some cards"
- Give context: reference your requirements.md or describe your end goal
- Iterate: "Make the cards bigger" / "Change the color to blue" / "Add a loading spinner"
- If something breaks: run /fix or just paste the error message
- Commit often: /snapshot creates a save point you can always go back to
- Check your app: open localhost:3000 in your browser to see changes in real-time
