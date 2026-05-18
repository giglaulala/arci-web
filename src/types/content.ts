export type SiteConfig = {
  name: string;
  role: string;
  headline: string;
  description: string;
  location: string;
  email: string;
  portrait: ImageContent;
  navigation: Array<{
    label: string;
    href: string;
  }>;
  bio: string[];
  social: Array<{
    label: string;
    href: string;
    icon: "instagram" | "linkedin" | "github";
  }>;
  cms: {
    recommended: string;
    reason: string;
  };
};

export type ImageContent = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  image: ImageContent;
  href: string;
};

export type TimelineEntry = {
  year: string;
  title: string;
  description: string;
};
