export type HomeNavLink = {
  label: string;
  href: string;
};

export type HomeMegaMenu = {
  columns: Array<{
    title: string;
    links: HomeNavLink[];
  }>;
  cta: {
    title: string;
    description: string;
    href: string;
  };
};

export type HomeNavigationItem = {
  label: string;
  href: string;
  megaMenu?: HomeMegaMenu;
};

export type HomeContent = {
  hero: {
    taglineLine1: string;
    taglineAccent: string;
    ctaPrompt: string;
    choices: Array<{
      id: string;
      title: string;
      description: string;
      cta: string;
      href: string;
    }>;
    scrollLabel: string;
  };
  stats: string[];
  about: {
    headline: string;
    body: string;
    cta: string;
  };
  services: {
    intro: string;
    approach: Array<{
      id: string;
      label: string;
      description: string;
      href: string;
    }>;
    expertise: string[];
    cta: string;
  };
  featuredProject: {
    overline: string;
    title: string;
    description: string;
    cta: string;
    image: string;
  };
  news: {
    overline: string;
    headline: string;
    cta: string;
    articles: Array<{
      category: string;
      title: string;
      image: string;
      href: string;
    }>;
  };
  community: {
    city: string;
    headline: string;
    body: string;
    ctaTeam: string;
    ctaLocations: string;
  };
  commitments: {
    intro: string;
    pillars: Array<{
      number: string;
      label: string;
      headline: string;
      body: string;
      href: string;
    }>;
  };
  careers: {
    headline: string;
    subheadline: string;
    cta: string;
  };
  contact: {
    title: string;
    subcontractorNote: string;
    subcontractorCta: string;
    ethicsTitle: string;
    ethicsBody: string;
    form: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      message: string;
      submit: string;
      success: string;
    };
  };
  footer: {
    nav: HomeNavLink[];
    legal: HomeNavLink[];
    equalOpportunity: string;
  };
  navigation: HomeNavigationItem[];
};
