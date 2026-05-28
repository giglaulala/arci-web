"use client";

import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Link } from "@/i18n/routing";
import type { SiteConfig } from "@/types/content";

type SiteMenuProps = {
  navigation: SiteConfig["navigation"];
  page: "home" | "biography" | "your-home";
};

export function SiteMenu({ navigation, page }: SiteMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedLabel, setExpandedLabel] = useState(
    navigation.find((item) => item.children)?.label,
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const getHref = (href: string) => {
    if (href.startsWith("/")) {
      return href;
    }

    if (page === "home") {
      return href === "#hero" ? "/" : `/biography${href}`;
    }

    return href === "#hero" ? "/" : `/biography${href}`;
  };

  return (
    <>
      <button
        className="inline-flex items-center gap-2 rounded-none bg-white px-5 py-2.5 text-sm font-semibold text-stone-950 transition hover:bg-stone-200"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <Menu className="h-4 w-4" />
        მენიუ
      </button>

      <div
        className={`fixed inset-0 z-[100] transition ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <button
          aria-label="მენიუს დახურვა"
          className={`absolute inset-0 bg-black/70 transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
          type="button"
        />

        <aside
          aria-label="საიტის მენიუ"
          className={`absolute right-0 top-0 h-full w-full max-w-[390px] overflow-y-auto bg-white px-7 py-6 text-stone-950 shadow-2xl transition-transform duration-300 sm:max-w-[430px] ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-8 flex justify-end">
            <button
              className="inline-flex items-center gap-2 border border-stone-200 bg-white px-4 py-2 text-xs font-semibold text-stone-950 transition hover:bg-stone-100"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              <X className="h-3.5 w-3.5" />
              დახურვა
            </button>
          </div>

          <nav className="space-y-1 text-sm font-semibold">
            {navigation.map((item) => {
              const isExpanded = expandedLabel === item.label;

              if (item.children) {
                return (
                  <div key={item.label}>
                    <button
                      className="flex w-full items-center justify-between py-3 text-left transition hover:text-stone-500"
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
                      <div className="-mx-7 bg-stone-100 px-7 py-3">
                        <Link
                          className="block py-3 text-sm transition hover:text-stone-500"
                          href={getHref(item.href)}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                        {item.children.map((child) => (
                          <Link
                            className="block py-3 text-sm font-normal text-stone-700 transition hover:text-stone-950"
                            href={getHref(child.href)}
                            key={child.label}
                            onClick={() => setIsOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              }

              return (
                <Link
                  className="block py-3 underline-offset-4 transition first:underline hover:text-stone-500"
                  href={getHref(item.href)}
                  key={item.label}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
      </div>
    </>
  );
}
