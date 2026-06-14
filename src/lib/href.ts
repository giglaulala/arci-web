export function getLocalizedHref(href: string, locale: string) {
  if (href.startsWith("#") || href.startsWith("http")) {
    return href;
  }

  if (href.startsWith("/")) {
    return `/${locale}${href}`;
  }

  return href;
}
