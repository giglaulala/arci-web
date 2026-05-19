"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const STORAGE_KEY = "arci-cookie-consent";
const PREFERENCES_KEY = "arci-cookie-preferences";
const categories = ["essential", "analytics", "marketing"] as const;

export function CookieConsent() {
  const t = useTranslations("CookieConsent");
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    setIsVisible(localStorage.getItem(STORAGE_KEY) !== "accepted");
  }, []);

  useEffect(() => {
    if (!showPreferences) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowPreferences(false);
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [showPreferences]);

  function acceptCookies() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    localStorage.setItem(
      PREFERENCES_KEY,
      JSON.stringify({ essential: true, analytics: true, marketing: true }),
    );
    setIsVisible(false);
  }

  function savePreferences() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <aside
        aria-label={t("ariaLabel")}
        className="fixed inset-x-0 bottom-0 z-[80] border-t border-white/5 bg-[#211c1d] px-5 py-4 text-stone-100 shadow-2xl shadow-black/30 sm:px-8"
        role="region"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-4xl text-[13px] leading-6 text-stone-300 sm:text-sm">
            <p>{t("message")}</p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <button
              className="min-h-11 bg-white px-6 text-sm font-semibold text-stone-950 transition hover:bg-stone-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#211c1d]"
              onClick={acceptCookies}
              type="button"
            >
              {t("accept")}
            </button>
            <button
              aria-haspopup="dialog"
              className="min-h-11 bg-[#2d2829] px-6 text-sm font-semibold text-stone-100 transition hover:bg-[#373132] focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-[#211c1d]"
              onClick={() => setShowPreferences(true)}
              type="button"
            >
              {t("settings")}
            </button>
          </div>
        </div>
      </aside>

      {showPreferences ? (
        <div
          aria-labelledby="cookie-preferences-title"
          aria-modal="true"
          className="fixed inset-0 z-[90] grid place-items-center bg-black/35 px-5 py-8"
          role="dialog"
        >
          <div className="relative max-h-full w-full max-w-[530px] overflow-y-auto bg-stone-50 px-8 py-9 text-stone-950 shadow-2xl shadow-black/25 sm:px-9">
            <button
              aria-label={t("close")}
              className="absolute right-8 top-8 grid h-8 w-8 place-items-center bg-[#211c1d] text-2xl leading-none text-white transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-2"
              onClick={() => setShowPreferences(false)}
              type="button"
            >
              ×
            </button>

            <h2
              className="pr-12 text-3xl font-bold tracking-[-0.04em]"
              id="cookie-preferences-title"
            >
              {t("modalTitle")}
            </h2>
            <p className="mt-6 text-sm leading-7 text-stone-500">
              {t("modalDescription")}
            </p>

            <div className="mt-7 space-y-6">
              {categories.map((category) => {
                const enabled = preferences[category];
                const isEssential = category === "essential";

                return (
                  <section key={category}>
                    <div className="flex items-center justify-between gap-5">
                      <h3 className="text-xl font-bold tracking-[-0.03em]">
                        {t(`categories.${category}.title`)}
                      </h3>
                      <button
                        aria-checked={enabled}
                        aria-label={t(`categories.${category}.toggleLabel`)}
                        className="relative h-4 w-7 rounded-full bg-stone-400 transition focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-80 data-[checked=true]:bg-[#211c1d]"
                        data-checked={enabled}
                        disabled={isEssential}
                        onClick={() =>
                          setPreferences((current) => ({
                            ...current,
                            [category]: !current[category],
                          }))
                        }
                        role="switch"
                        type="button"
                      >
                        <span
                          className="absolute top-0.5 h-3 w-3 rounded-full bg-white transition data-[checked=false]:left-0.5 data-[checked=true]:left-3.5"
                          data-checked={enabled}
                        />
                      </button>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-stone-500">
                      {t(`categories.${category}.description`)}
                    </p>
                  </section>
                );
              })}
            </div>

            <button
              className="mt-8 min-h-11 w-full border border-stone-200 bg-white px-6 text-sm font-bold text-stone-950 transition hover:border-stone-400 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-2"
              onClick={savePreferences}
              type="button"
            >
              {t("save")}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
