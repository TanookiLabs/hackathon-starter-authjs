Execute the implementation plan step by step. If no plan exists, ask the user to run /plan first.

Steps:

1. Read `implementation-plan.md` from the project root. If it doesn't exist, tell the user to run /plan first.
2. Read `requirements.md` for context on the overall project.
3. Identify the next incomplete step in the plan.
4. Before starting the step, briefly tell the user what you're about to build.
5. Implement the step:
   - Write the code (server actions, components, pages)
   - Use shadcn/ui components and Tailwind CSS for UI
   - Handle errors gracefully
   - Test by checking for TypeScript errors
6. After completing the step, update `implementation-plan.md` to mark it as done (prefix with ✅)
7. Summarize what was built and tell the user to check it in the browser at localhost:3000
8. Ask if they want to continue to the next step, make adjustments, or commit progress with /snapshot
