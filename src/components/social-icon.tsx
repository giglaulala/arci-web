import type { SiteConfig } from "@/types/content";

type SocialIconName = SiteConfig["social"][number]["icon"];

const paths: Record<SocialIconName, string> = {
  facebook:
    "M14 8.5h2.2V5.2c-.38-.05-1.69-.16-3.21-.16-3.18 0-5.36 1.94-5.36 5.5v3.09H4v3.69h3.63V24h4.46v-6.68h3.49l.55-3.69h-4.04v-2.72c0-1.07.3-2.41 1.91-2.41Z",
  x: "M17.53 3h3.05l-6.67 7.62L21.75 21h-6.14l-4.81-6.29L5.29 21H2.22l7.14-8.16L1.84 3h6.3l4.35 5.75L17.53 3Zm-1.07 16.17h1.69L7.22 4.74H5.4l11.06 14.43Z",
  youtube:
    "M23.5 7.2a3.02 3.02 0 0 0-2.12-2.14C19.5 4.56 12 4.56 12 4.56s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 7.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 4.8 3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-4.8ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z",
  linkedin:
    "M6.94 8.9V21H3.25V8.9h3.69ZM5.1 3a2.11 2.11 0 1 1 0 4.22A2.11 2.11 0 0 1 5.1 3Zm6.07 5.9h3.53v1.65h.05c.49-.93 1.7-1.91 3.49-1.91 3.73 0 4.42 2.46 4.42 5.65V21h-3.68v-5.95c0-1.42-.03-3.25-1.98-3.25-1.99 0-2.29 1.55-2.29 3.15V21h-3.69V8.9h.15Z",
};

export function SocialIcon({ name }: { name: SocialIconName }) {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d={paths[name]} />
    </svg>
  );
}
