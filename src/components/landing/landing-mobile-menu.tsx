"use client";

import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { getLocalizedHref } from "@/lib/href";
import type { HomeNavigationItem } from "@/types/home";

type LandingMobileMenuProps = {
  navigation: HomeNavigationItem[];
  locale: string;
};

export function LandingMobileMenu({
  navigation,
  locale,
}: LandingMobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedLabel, setExpandedLabel] = useState<string>();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        aria-expanded={isOpen}
        aria-label="მენიუ"
        className="inline-flex items-center gap-2 rounded-sm border border-landing-divider bg-landing-surface px-4 py-2.5 font-body-landing text-sm font-semibold text-landing-text transition hover:border-landing-accent lg:hidden"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <Menu className="h-4 w-4" />
        მენიუ
      </button>

      <div
        className={`fixed inset-0 z-[100] lg:hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <button
          aria-label="მენიუს დახურვა"
          className={`absolute inset-0 bg-black/80 transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
          type="button"
        />
        <aside
          className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col overflow-y-auto bg-landing-bg px-6 py-6 transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-8 flex justify-end">
            <button
              className="inline-flex items-center gap-2 border border-landing-divider px-4 py-2 font-body-landing text-xs font-semibold text-landing-text"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              <X className="h-3.5 w-3.5" />
              დახურვა
            </button>
          </div>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const isExpanded = expandedLabel === item.label;

              if (item.megaMenu) {
                return (
                  <div key={item.label}>
                    <button
                      className="flex w-full items-center justify-between py-3 text-left font-body-landing text-sm font-semibold text-landing-text"
                      onClick={() =>
                        setExpandedLabel(isExpanded ? undefined : item.label)
                      }
                      type="button"
                    >
                      <span>{item.label}</span>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                    {isExpanded ? (
                      <div className="mb-3 border-l-2 border-landing-accent pl-4">
                        {item.megaMenu.columns.flatMap((column) =>
                          column.links.map((link) => (
                            <a
                              className="block py-2 font-body-landing text-sm text-landing-muted transition hover:text-landing-text"
                              href={getLocalizedHref(link.href, locale)}
                              key={`${column.title}-${link.label}`}
                              onClick={() => setIsOpen(false)}
                            >
                              {link.label}
                            </a>
                          )),
                        )}
                      </div>
                    ) : null}
                  </div>
                );
              }

              return (
                <a
                  className="block py-3 font-body-landing text-sm font-semibold text-landing-text"
                  href={getLocalizedHref(item.href, locale)}
                  key={item.label}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </aside>
      </div>
    </>
  );
}
