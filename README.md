# Product Portfolio Website

This repository powers my personal portfolio site showcasing my product work: case studies, experiments, and writing. The site highlights impact, process, and outcomes across projects, with a simple MDX-powered blog for longer-form content.

## What's inside

- **Product case studies**: High-signal write-ups of problems, approach, and measurable results
- **Project gallery**: Visual overview of shipped work, prototypes, and experiments
- **MDX blog**: Longer posts, notes, and learnings about product, design, and strategy
- **Responsive UI**: Fast, accessible, and works across devices

## Tech stack

- **Next.js 14** (App Router), **React**, **TypeScript**
- **Tailwind CSS** for styling
- **shadcn/ui** and **Magic UI** for components and motion
- **MDX** for blog content
- Optimized for **Vercel** deployment

## Content structure

- `src/data/resume.tsx`: Primary data source for experience, projects, and metadata
- `src/app/blog`: Blog index and post routing
- `content/*.mdx`: MDX posts (example: `content/hello-world.mdx`)
- `src/components/*`: UI components

## Local development

1. Install dependencies

   ```bash
   pnpm install
   ```

2. Run the dev server

   ```bash
   pnpm dev
### Environment variables

Create a `.env.local` in the project root with:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
GOOGLE_API_KEY=your-google-generative-ai-key
```

Notes:
- `GOOGLE_API_KEY` is used by `/api/simulator/chat` to power live LLM chat in the simulator.
- Never expose the key on the client; it is only read on the server.

### Security and secrets
- `.env.local` and other env files are gitignored (see `.gitignore`).
- Never commit real keys. If leaked, rotate the key in Google and update env.
- The chat API has basic rate limiting and validates inputs server-side.

   ```

3. Update portfolio content

   - Edit `src/data/resume.tsx` for profile, roles, skills, and projects
   - Add MDX blog posts under `content/`

## Deployment

Deploy to Vercel from your repository. The default configuration works out of the box.

## License

Licensed under the MIT license. See `LICENSE` for details.
