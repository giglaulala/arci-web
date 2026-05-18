export type SiteConfig = {
  name: string;
  since: string;
  role: string;
  headline: string;
  subtitle: string;
  description: string;
  location: string;
  phone: string;
  email: string;
  hours: string;
  address: string;
  portrait: ImageContent;
  navigation: Array<{
    label: string;
    href: string;
  }>;
  bio: string[];
  social: Array<{
    label: string;
    href: string;
    icon: "facebook" | "x" | "youtube" | "linkedin";
  }>;
  footerColumns: Array<{
    title: string;
    links: Array<{
      label: string;
      href: string;
    }>;
  }>;
  tagline: string;
};

export type ImageContent = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  era: "1980s" | "1994-2001" | "2008-2018" | "2018-present";
  year: string;
  summary: string;
  image: ImageContent;
  href: string;
};

export type TimelineEntry = {
  id: string;
  year: string;
  title: string;
  description: string;
  quote?: string;
  images: Array<ImageContent & { caption?: string }>;
};
