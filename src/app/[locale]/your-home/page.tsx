import { ArrowUpRight, ChevronDown, Languages, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import heroImage from "@/components/image-1.png";
import conceptImage from "@/components/image-2.png";
import galleryImageOne from "@/components/image-3.png";
import galleryImageTwo from "@/components/image-4.png";
import galleryImageThree from "@/components/image-5.png";
import projectImageOne from "@/components/image-6.png";
import projectImageTwo from "@/components/image-7.png";
import projectImageThree from "@/components/image-8.png";
import logo from "@/components/Logo.png";
import { Reveal } from "@/components/reveal";
import { SiteMenu } from "@/components/site-menu";
import { Link, routing, type Locale } from "@/i18n/routing";
import { getSiteConfig } from "@/lib/content";

type PageProps = {
  params: { locale: Locale };
};

const galleryImages = [
  {
    src: galleryImageOne,
    alt: "საცხოვრებელი კომპლექსის ეზო",
    label: "ეზო და რეკრეაცია",
  },
  {
    src: galleryImageTwo,
    alt: "თანამედროვე საცხოვრებელი სახლი",
    label: "სახლები ნათელი ფასადებით",
  },
  {
    src: galleryImageThree,
    alt: "მწვანე საცხოვრებელი სივრცე",
    label: "მწვანე ბილიკები",
  },
];

const projectCards = [
  {
    title: "მზიანი ეზოები",
    subtitle: "საერთო სივრცეები ყოველდღიური ცხოვრებისთვის",
    image: projectImageOne,
    tag: "სივრცე",
  },
  {
    title: "სუფთა არქიტექტურა",
    subtitle: "ბინები მკაფიო გეგმებით და ბუნებრივი განათებით",
    image: projectImageTwo,
    tag: "არქიტექტურა",
  },
  {
    title: "ქალაქთან ახლოს",
    subtitle: "საცხოვრებელი უბანი, რომელიც ყოველდღიურ მარშრუტებს ამარტივებს",
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
        className="relative flex min-h-[430px] items-center justify-center overflow-hidden px-6 pb-24 pt-32 text-center text-stone-50 sm:min-h-[520px] sm:px-10"
        id="hero"
      >
        <Image
          alt="შენი სახლის საცხოვრებელი კომპლექსი ღამით"
          className="object-cover"
          fill
          priority
          sizes="100vw"
          src={heroImage}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/15 to-black/65" />
        <Reveal className="relative z-10 max-w-4xl">
          <p className="mb-5 font-latin text-xs uppercase tracking-[0.5em] text-stone-300">
            ARCI Living
          </p>
          <h1 className="font-display text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl lg:text-7xl">
            შენი სახლი-ს
            <br />
            კონცეფცია
          </h1>
        </Reveal>
      </section>

      <section className="bg-stone-100 px-6 py-20 sm:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="mb-5 font-latin text-xs uppercase tracking-[0.42em] text-stone-500">
              Concept
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
                  alt="საცხოვრებელი კომპლექსის პანორამული ხედი"
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
      </section>

      <section className="bg-[#211d1d] px-6 py-20 text-stone-50 sm:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="font-latin text-xs uppercase tracking-[0.42em] text-stone-500">
                Gallery
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em]">
                ფოტო გალერეა
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                aria-label="წინა ფოტო"
                className="grid h-10 w-10 place-items-center bg-stone-700 text-sm text-white transition hover:bg-white hover:text-stone-950"
                type="button"
              >
                ‹
              </button>
              <button
                aria-label="შემდეგი ფოტო"
                className="grid h-10 w-10 place-items-center bg-stone-700 text-sm text-white transition hover:bg-white hover:text-stone-950"
                type="button"
              >
                ›
              </button>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {galleryImages.map((image, index) => (
              <Reveal delay={index * 0.08} key={image.label}>
                <figure>
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-800">
                    <Image
                      alt={image.alt}
                      className="object-cover transition duration-500 hover:scale-105"
                      fill
                      sizes="(min-width: 768px) 31vw, 100vw"
                      src={image.src}
                    />
                  </div>
                  <figcaption className="mt-4 border-t border-white/25 pt-4 text-sm text-stone-300">
                    {image.label}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        className="bg-stone-100 px-6 py-20 text-stone-950 sm:px-10 lg:py-28"
        id="projects"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-4xl">
            <p className="font-latin text-xs uppercase tracking-[0.42em] text-stone-500">
              Your Home Projects
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
              „შენი სახლი“-ს პროექტები
            </h2>
            <p className="mt-6 text-base leading-8 text-stone-600">
              საცხოვრებელი პროექტები, რომლებიც აერთიანებს სუფთა არქიტექტურას,
              გამწვანებულ ეზოებს და ფუნქციურ გეგმებს სხვადასხვა ცხოვრების
              რიტმისთვის.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {projectCards.map((project, index) => (
              <Reveal delay={index * 0.08} key={project.title}>
                <article className="group border-b border-stone-300 pb-6">
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-300">
                    <Image
                      alt={project.title}
                      className="object-cover transition duration-500 group-hover:scale-105"
                      fill
                      sizes="(min-width: 768px) 31vw, 100vw"
                      src={project.image}
                    />
                    <span className="absolute left-4 top-4 bg-white px-3 py-1.5 text-xs font-semibold text-stone-950 shadow-lg">
                      {project.tag}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.03em]">
                    {project.title}
                  </h3>
                  <p className="mt-3 min-h-16 text-sm leading-7 text-stone-600">
                    {project.subtitle}
                  </p>
                  <a
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 transition hover:underline"
                    href="#contact"
                  >
                    პროექტის ნახვა
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
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
