Add an AI-powered feature to the app. Ask the user what kind of AI feature they want.

Common options:

- **Image generation**: Use Replicate API with the FLUX or Ideogram model
- **Text generation / chat**: Use the Vercel AI SDK with OpenAI or Anthropic
- **Content analysis**: Use the Vercel AI SDK for text processing

Steps:

1. Install the required package (replicate, ai, @ai-sdk/openai, etc.)
2. Add the API key to .env.local
3. Create a server action that calls the AI API
4. Build a UI component that lets the user interact with the AI feature
5. Handle loading states and errors gracefully
