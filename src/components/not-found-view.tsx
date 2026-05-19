import Link from "next/link";

type NotFoundCopy = {
  title: string;
  description: string;
  action: string;
};

type NotFoundViewProps = {
  copy: NotFoundCopy;
  homeHref: string;
};

export function NotFoundView({ copy, homeHref }: NotFoundViewProps) {
  return (
    <main className="grid min-h-screen place-items-center overflow-hidden bg-[#211d1c] px-6 py-20 text-stone-50">
      <section className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <div
          aria-label="404"
          className="flex items-center justify-center gap-4 font-latin text-[clamp(4.5rem,13vw,9rem)] font-light leading-none tracking-[0.02em] text-white sm:gap-5"
        >
          <span className="grid aspect-square w-[1.05em] place-items-center border-[3px] border-stone-100 bg-transparent">
            4
          </span>
          <span className="grid aspect-square w-[1.05em] place-items-center border-[3px] border-stone-100 bg-transparent">
            0
          </span>
          <span className="grid aspect-square w-[1.05em] place-items-center border-[3px] border-stone-100 bg-stone-50 text-[#211d1c]">
            4
          </span>
        </div>

        <h1 className="mt-9 font-display text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
          {copy.title}
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-7 text-stone-400 sm:text-base">
          {copy.description}
        </p>

        <Link
          className="mt-11 inline-flex min-w-52 items-center justify-center bg-stone-50 px-8 py-4 text-sm font-bold text-[#211d1c] transition hover:bg-stone-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-50"
          href={homeHref}
        >
          {copy.action}
        </Link>
      </section>
    </main>
  );
}
