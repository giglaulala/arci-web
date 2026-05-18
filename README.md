# Georgian Editorial Portfolio

Static Georgian-first editorial/portfolio website built with Next.js 14, Tailwind CSS, `next/image`, Framer Motion, and `next-intl`.

## Getting Started

Install dependencies and run the development server:

```bash
npm run dev
```

Open [http://localhost:3000/ka](http://localhost:3000/ka) with your browser to see the Georgian site.

## Content Editing

Editable content lives in `/content`:

- `content/site.json`: identity, biography, navigation, contact, social links, and CMS recommendation.
- `content/projects.json`: selected portfolio projects and image metadata.
- `content/timeline.json`: chronological biography or project milestones.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run format
npm run format:check
```

## Stack Notes

See `docs/tech-stack.md` for the stack recommendation and the Sanity CMS migration path.

## Deployment

Deploy on Vercel with the default Next.js preset. No custom build settings are required.
