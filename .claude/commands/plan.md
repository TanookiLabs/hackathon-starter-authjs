Help the user turn their idea into a concrete plan. This is the first step before building — get clarity on what to build and how.

Steps:

1. Ask the user to describe their idea in plain language. What does it do? Who is it for?
2. Break the idea down into a requirements document with these sections:
   - **One-liner**: What the app does in one sentence
   - **Target user**: Who uses this
   - **Core features**: 3-5 things the app must do (prioritized)
   - **Nice-to-haves**: Features to add if there's time
   - **Data model**: What tables/data the app needs (keep it minimal)
   - **Pages**: List each screen and what it shows
   - **APIs needed**: Any external services (Replicate, Stripe, etc.)
3. Write this to a `requirements.md` file in the project root
4. Then create an `implementation-plan.md` with ordered build steps:
   - Step 1 is always: define the core data model in lib/db/schema.ts and run `npm run db:push`
   - Step 2 is always: build the main page that displays data using Drizzle queries
   - Step 3 is always: add the form/action to create data
   - Then layer on additional features one at a time
   - Each step should be small enough to complete in 15-30 minutes
5. Show the plan to the user and ask for feedback before proceeding
6. Remind the user they can run /build to start executing the plan
