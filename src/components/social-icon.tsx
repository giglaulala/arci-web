import type { SiteConfig } from "@/types/content";

type SocialIconName = SiteConfig["social"][number]["icon"];

const paths: Record<SocialIconName, string> = {
  instagram:
    "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5.5A4.5 4.5 0 1 0 12 16.5 4.5 4.5 0 0 0 12 7.5Zm5.25-.75h.01",
  linkedin:
    "M6.94 8.9V21H3.25V8.9h3.69ZM5.1 3a2.11 2.11 0 1 1 0 4.22A2.11 2.11 0 0 1 5.1 3Zm6.07 5.9h3.53v1.65h.05c.49-.93 1.7-1.91 3.49-1.91 3.73 0 4.42 2.46 4.42 5.65V21h-3.68v-5.95c0-1.42-.03-3.25-1.98-3.25-1.99 0-2.29 1.55-2.29 3.15V21h-3.69V8.9h.15Z",
  github:
    "M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.55 9.55 0 0 1 12 5.82c.85 0 1.7.11 2.5.34 1.9-1.3 2.74-1.03 2.74-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z",
};

export function SocialIcon({ name }: { name: SocialIconName }) {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
    >
      <path d={paths[name]} />
    </svg>
  );
}
