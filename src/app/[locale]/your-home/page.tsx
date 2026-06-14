import { ArrowUpRight, ChevronDown, Languages, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import heroImage from "@/components/sheni-univ-qucha.jpg";
import conceptImage from "@/components/sheni-lisi1.jpg";
import galleryImageOne from "@/components/sheni-samgor.jpg";
import galleryImageTwo from "@/components/sheni-lisi.jpg";
import galleryImageThree from "@/components/sheni-univ-qucha.jpg";
import projectImageOne from "@/components/sheni-samgor.jpg";
import projectImageTwo from "@/components/sheni-lisi.jpg";
import projectImageThree from "@/components/sheni-samgor1.jpg";
import logo from "@/components/Logo.png";
import { Reveal } from "@/components/reveal";
import { SiteMenu } from "@/components/site-menu";
import { YourHomeGallery } from "@/components/your-home-gallery";
import { YourHomeProjects } from "@/components/your-home-projects";
import { Link, routing, type Locale } from "@/i18n/routing";
import { getSiteConfig } from "@/lib/content";

type PageProps = {
  params: { locale: Locale };
};

const heroMeta = [
  { label: "ლოკაცია", value: "თბილისი" },
  { label: "ტიპოლოგია", value: "საცხოვრებელი" },
  { label: "პროექტები", value: "03" },
  { label: "სტატუსი", value: "მიმდინარე" },
];

const conceptPrinciples = [
  {
    title: "ბუნებრივი განათება",
    description:
      "ბინები ორიენტირებულია სინათლეზე — ღია გეგმები და ფართო ღიობები დღის ნათელს ღრმად უშვებს სივრცეში.",
  },
  {
    title: "მწვანე ეზოები",
    description:
      "გამწვანებული საერთო სივრცეები აკავშირებს კორპუსებს და ქმნის ყოველდღიური დასვენების ადგილს.",
  },
  {
    title: "ადამიანური მასშტაბი",
    description:
      "მანძილები, ბილიკები და ხედები იგეგმება ადამიანზე — ისე, რომ სახლში დაბრუნება სიმშვიდეს ნიშნავდეს.",
  },
];

const galleryImages = [
  {
    src: galleryImageOne,
    alt: "„შენი სახლი“ — სამგორის საცხოვრებელი ეზო",
    label: "ეზო და რეკრეაცია",
    place: "სამგორი",
  },
  {
    src: galleryImageTwo,
    alt: "„შენი სახლი“ — ლისის საცხოვრებელი კორპუსი",
    label: "საცხოვრებელი კორპუსები",
    place: "ლისი",
  },
  {
    src: galleryImageThree,
    alt: "„შენი სახლი“ — უნივერსიტეტის ქუჩის საცხოვრებელი კორპუსი",
    label: "უნივერსიტეტის ქუჩა",
    place: "ცენტრი",
  },
];

const projectCards = [
  {
    title: "სამგორი",
    subtitle: "საერთო ეზოები და მწვანე სივრცეები ყოველდღიური ცხოვრებისთვის",
    image: projectImageOne,
    tag: "ეზო",
  },
  {
    title: "ლისი",
    subtitle: "საცხოვრებელი კორპუსები მკაფიო გეგმებით და ბუნებრივი განათებით",
    image: projectImageTwo,
    tag: "არქიტექტურა",
  },
  {
    title: "უნივერსიტეტის ქუჩა",
    subtitle: "თანამედროვე საცხოვრებელი კორპუსი ქალაქთან ახლოს",
    image: projectImageThree,
    tag: "ლოკაცია",
  },
];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  return {
    title: "ARCI | შენი სახლი",
    description:
      "ARCI-ის საცხოვრებელი კონცეფცია: მწვანე ეზოები, ნათელი ბინები და ქალაქთან ახლოს დაგეგმილი ყოველდღიურობა.",
    alternates: {
      canonical: `/${params.locale}/your-home`,
      languages: {
        ka: "/ka/your-home",
        en: "/en/your-home",
      },
    },
  };
}

export default async function YourHomePage({ params }: PageProps) {
  setRequestLocale(params.locale);

  const site = getSiteConfig();
  const t = await getTranslations("Site");
  const nextLocale = params.locale === "ka" ? "en" : "ka";

  const getYourHomeNavHref = (href: string) => {
    if (href.startsWith("/")) {
      return `/${params.locale}${href}`;
    }

    return href === "#hero"
      ? `/${params.locale}`
      : `/${params.locale}/biography${href}`;
  };

  return (
    <main className="min-h-screen bg-stone-100 text-stone-950">
      <header className="absolute top-0 z-50 w-full px-6 py-5 text-stone-50 sm:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <Link className="flex items-center" href="/">
            <Image
              alt={`${site.name} logo`}
              className="h-12 w-auto sm:h-14"
              priority
              src={logo}
            />
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-stone-300 lg:flex">
            {site.navigation.map((item) =>
              item.children ? (
                <div className="group relative" key={item.label}>
                  <a
                    aria-haspopup="menu"
                    className="inline-flex items-center gap-1.5 transition hover:text-white"
                    href={getYourHomeNavHref(item.href)}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" />
                  </a>
                  <div className="pointer-events-none absolute left-0 top-full min-w-56 pt-4 opacity-0 transition duration-150 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100">
                    <div className="rounded-2xl border border-white/10 bg-stone-900 p-2 shadow-2xl shadow-black/30">
                      {item.children.map((child) => (
                        <a
                          className="block rounded-xl px-4 py-3 text-sm text-stone-300 transition hover:bg-white/10 hover:text-white"
                          href={getYourHomeNavHref(child.href)}
                          key={child.label}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  className="transition hover:text-white"
                  href={getYourHomeNavHref(item.href)}
                  key={item.href}
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              aria-label={t("switchLocaleAria")}
              className="hidden items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-stone-200 transition hover:border-white/40 hover:bg-white/10 md:inline-flex"
              href="/your-home"
              locale={nextLocale}
            >
              <Languages className="h-4 w-4" />
              {t("switchLocale")}
            </Link>
            <SiteMenu navigation={site.navigation} page="your-home" />
          </div>
        </div>
      </header>

      <section
        className="relative flex min-h-[640px] flex-col justify-end overflow-hidden px-6 pb-10 pt-40 text-stone-50 sm:min-h-[720px] sm:px-10"
        id="hero"
      >
        <Image
          alt="„შენი სახლი“ — უნივერსიტეტის ქუჩის საცხოვრებელი კორპუსი"
          className="object-cover"
          fill
          priority
          sizes="100vw"
          src={heroImage}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/45" />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="font-mono-label text-xs tracking-[0.3em] text-stone-300">
                01
              </span>
              <span className="h-px w-12 bg-white/40" />
              <p className="font-mono-label text-[0.7rem] uppercase tracking-[0.42em] text-stone-300">
                ARCI Living — Concept
              </p>
            </div>
            <h1 className="mt-7 max-w-4xl font-display text-5xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-7xl lg:text-8xl">
              „შენი სახლი“-ს
              <br />
              <span className="text-stone-300">კონცეფცია</span>
            </h1>
          </Reveal>

          <Reveal
            className="mt-14 grid grid-cols-2 gap-px overflow-hidden border-t border-white/15 sm:grid-cols-4"
            delay={0.15}
          >
            {heroMeta.map((item) => (
              <div className="bg-white/[0.03] px-1 py-5 backdrop-blur-sm" key={item.label}>
                <p className="font-mono-label text-[0.6rem] uppercase tracking-[0.3em] text-stone-400">
                  {item.label}
                </p>
                <p className="mt-2 font-display text-xl font-semibold tracking-[-0.02em] text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </Reveal>
        </div>

        <a
          aria-label="ქვემოთ გადახვევა"
          className="group absolute bottom-10 right-6 z-10 hidden items-center gap-3 sm:right-10 sm:inline-flex"
          href="#concept"
        >
          <span className="font-mono-label text-[0.6rem] uppercase tracking-[0.3em] text-stone-300 transition group-hover:text-white">
            Scroll
          </span>
          <span className="grid h-10 w-10 place-items-center rounded-full border border-white/25 transition group-hover:border-white">
            <ChevronDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
          </span>
        </a>
      </section>

      <section className="bg-stone-100 px-6 py-20 sm:px-10 lg:py-28" id="concept">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="mb-5 font-mono-label text-[0.7rem] uppercase tracking-[0.42em] text-stone-500">
              Concept / 02
            </p>
            <h2 className="font-display text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
              კონცეფციის შესახებ
            </h2>
            <div className="mt-8 space-y-5 text-base leading-8 text-stone-600">
              <p>
                „შენი სახლი“ არის საცხოვრებელი გარემო, სადაც ბინა, ეზო,
                გამწვანება და ყოველდღიური სერვისები ერთ მთლიან გამოცდილებად
                იკვრება. აქ არქიტექტურა არ მთავრდება ფასადზე — ის გრძელდება
                ბილიკებში, ხედებში და საერთო სივრცეებში.
              </p>
              <p>
                პროექტის იდეა მარტივია: სახლში დაბრუნება უნდა ნიშნავდეს
                სიმშვიდეს, უსაფრთხოებას და ქალაქთან კავშირის შენარჩუნებას.
                სწორედ ამიტომ მთავარი აქცენტი კეთდება ბუნებრივ განათებაზე,
                მწვანე ეზოებზე და ადამიანზე მორგებულ მასშტაბზე.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <figure className="relative">
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-300 shadow-2xl shadow-stone-300">
                <Image
                  alt="„შენი სახლი“ — ლისის საცხოვრებელი კომპლექსის პანორამა"
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  src={conceptImage}
                />
              </div>
              <figcaption className="absolute -bottom-6 left-6 inline-flex items-center gap-2 bg-white px-5 py-3 text-sm font-semibold shadow-xl shadow-stone-300">
                <MapPin className="h-4 w-4" />
                თბილისი, საცხოვრებელი უბანი
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="mx-auto mt-20 max-w-7xl border-t border-stone-300 lg:mt-28">
          <div className="grid gap-px sm:grid-cols-3">
            {conceptPrinciples.map((principle, index) => (
              <Reveal
                className="border-b border-stone-300 py-8 sm:border-b-0 sm:py-10 sm:pr-8 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-stone-300 sm:[&:not(:first-child)]:pl-8"
                delay={index * 0.08}
                key={principle.title}
              >
                <span className="font-mono-label text-sm tracking-[0.2em] text-stone-400">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold tracking-[-0.02em]">
                  {principle.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-stone-600">
                  {principle.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#211d1d] px-6 py-20 text-stone-50 sm:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <YourHomeGallery images={galleryImages} />
        </div>
      </section>

      <section
        className="bg-stone-100 px-6 py-20 text-stone-950 sm:px-10 lg:py-28"
        id="projects"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-4xl">
              <p className="font-mono-label text-[0.7rem] uppercase tracking-[0.42em] text-stone-500">
                Index / 03
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
                „შენი სახლი“-ს პროექტები
              </h2>
              <p className="mt-6 text-base leading-8 text-stone-600">
                საცხოვრებელი პროექტები, რომლებიც აერთიანებს სუფთა არქიტექტურას,
                გამწვანებულ ეზოებს და ფუნქციურ გეგმებს სხვადასხვა ცხოვრების
                რიტმისთვის.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <YourHomeProjects projects={projectCards} />
          </Reveal>
        </div>
      </section>

      <footer
        className="bg-stone-950 px-6 py-12 text-stone-50 sm:px-10"
        id="contact"
      >
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 border-t border-white/10 pt-10 sm:flex-row sm:items-end">
          <div>
            <p className="font-latin text-3xl font-semibold tracking-[0.22em]">
              {site.name}
            </p>
            <p className="mt-3 max-w-xl text-stone-400">{site.tagline}</p>
          </div>
          <Link
            className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-stone-200"
            href="/biography"
          >
            ბიოგრაფიაზე დაბრუნება
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </footer>
    </main>
  );
}
