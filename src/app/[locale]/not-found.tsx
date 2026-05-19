import { getLocale } from "next-intl/server";

import { NotFoundView } from "@/components/not-found-view";
import type { Locale } from "@/i18n/routing";

const notFoundCopy: Record<Locale, Parameters<typeof NotFoundView>[0]["copy"]> =
  {
    ka: {
      title: "გვერდი ვერ მოიძებნა",
      description:
        "ბოდიშს გიხდით, გვერდი რომელსაც ეძებთ ვერ მოიძებნა. გთხოვთ გადაამოწმოთ მისამართი ან დაბრუნდეთ მთავარ გვერდზე.",
      action: "მთავარზე დაბრუნება",
    },
    en: {
      title: "Page not found",
      description:
        "Sorry, the page you are looking for could not be found. Please check the address or return to the homepage.",
      action: "Return home",
    },
  };

export default async function NotFound() {
  const locale = (await getLocale()) as Locale;

  return <NotFoundView copy={notFoundCopy[locale]} homeHref={`/${locale}`} />;
}
