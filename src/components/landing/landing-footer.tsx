import { SocialIcon } from "@/components/social-icon";
import type { HomeContent } from "@/types/home";
import type { SiteConfig } from "@/types/content";

type LandingFooterProps = {
  footer: HomeContent["footer"];
  site: Pick<SiteConfig, "name" | "social">;
};

export function LandingFooter({ footer, site }: LandingFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-landing-divider bg-landing-bg px-6 py-14 sm:px-10">
      <div className="mx-auto max-w-[1440px]">
        <nav className="flex flex-wrap gap-x-8 gap-y-3 border-b border-landing-divider pb-8">
          {footer.nav.map((item) => (
            <a
              className="landing-link-underline font-body-landing text-sm text-landing-text/85 transition hover:text-landing-text"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-8 py-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            {site.social.map((item) => (
              <a
                aria-label={item.label}
                className="inline-flex h-10 w-10 items-center justify-center border border-landing-divider text-landing-text/80 transition hover:border-landing-accent hover:text-landing-accent"
                href={item.href}
                key={item.label}
                rel="noreferrer"
                target="_blank"
              >
                <SocialIcon name={item.icon} />
              </a>
            ))}
          </div>

          <p className="font-body-landing text-sm text-landing-muted">
            © {year} {site.name}. ყველა უფლება დაცულია.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {footer.legal.map((item) => (
              <a
                className="font-body-landing text-xs text-landing-muted transition hover:text-landing-text"
                href={item.href}
                key={item.label}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <p className="border-t border-landing-divider pt-8 font-body-landing text-xs leading-6 text-landing-muted">
          {footer.equalOpportunity}
        </p>
      </div>
    </footer>
  );
}
