# Tech Stack Recommendation

This site is set up as a Georgian-first static editorial portfolio.

## Selected Stack

- Framework: Next.js 14 App Router for static generation, metadata, image optimization, and Vercel deployment.
- Styling: Tailwind CSS for alternating editorial sections, responsive spacing, and fast iteration.
- Fonts: `next/font/google` with Noto Sans Georgian for Georgian text, Inter for Latin UI text, and Playfair Display as an optional Latin display face.
- Content: JSON files in `/content` for site config, projects, and timeline entries. This keeps editing simple before CMS migration.
- CMS recommendation: Sanity. It fits this project better than Contentful because schemas live with code, image handling is strong, previews are straightforward, and migration from structured JSON is direct.
- Images: `next/image` with remote Unsplash placeholders configured in `next.config.mjs`. Replace these with uploaded editorial photography when ready.
- Animations: Framer Motion is isolated in `src/components/reveal.tsx` for subtle one-time scroll fades.
- i18n: `next-intl` is configured with `ka` as the default locale and `en` prepared for a future language toggle.
- Icons: Lucide React is used for interface icons; social icons are inline custom SVG paths in `src/components/social-icon.tsx`.

## CMS Migration Path

When the content model settles, mirror the three JSON shapes as Sanity document schemas:

- `siteConfig`: singleton document for identity, navigation, biography, contact, and social links.
- `project`: repeatable document with slug, title, category, year, summary, image, and link fields.
- `timelineEntry`: repeatable document with year, title, description, and optional sort order.

After that, replace `src/lib/content.ts` with Sanity fetches while keeping the page components unchanged.
