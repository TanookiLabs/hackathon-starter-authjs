Build or redesign a UI based on the user's description. The user will describe what they want the page or component to look like.

Steps:

1. Ask the user to describe the UI they want. Encourage specifics: layout, content, colors, what it reminds them of.
2. Identify which shadcn/ui components to use. Prefer existing components over custom code. Install any needed components with: pnpm dlx shadcn@latest add <component>
3. Build the UI using:
   - shadcn/ui components (Button, Card, Input, Table, Dialog, etc.)
   - Tailwind CSS for layout and spacing
   - Responsive design (works on mobile and desktop)
   - The app's existing color scheme and typography
4. If the UI needs data, wire it up to Drizzle ORM or use realistic placeholder data. Use auth() to get the current user.
5. Make sure the page is accessible from the navigation.
6. Tell the user to check it in the browser and ask what they'd like to adjust.

Style guidelines:

- Use clean, modern layouts with plenty of whitespace
- Cards for content grouping, tables for data lists
- Consistent spacing: use Tailwind's spacing scale (p-4, gap-6, etc.)
- Use the app's existing theme colors, not arbitrary hex values
