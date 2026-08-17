import Link from "next/link";
import { ArrowRight, ExternalLink, TrainFront } from "lucide-react";

const railwayCompanies = [
  {
    id: "jr-east",
    ja: "JR 東日本",
    ko: "JR동일본",
    en: "JR East",
    href: "/jr-east",
    external: false,
    available: true,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-5 sm:px-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-white">
            <TrainFront className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-lg font-black tracking-tight text-zinc-950">
              도쿄전철
            </h1>
            <p className="text-xs font-medium text-zinc-500">
              Tokyo Railway Guide
            </p>
          </div>
        </div>
      </header>

      {/* Main */}
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
        <div className="mb-9 sm:mb-12">
          <p className="mb-3 text-sm font-bold text-[#8fc31f]">TOKYO RAILWAY</p>

          <h2 className="text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
            이용할 철도회사를
            <br className="sm:hidden" /> 선택하세요
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">
            도쿄의 철도회사와 노선을 선택하여 역 정보, 환승 노선, 다음 열차
            정보를 확인할 수 있습니다.
          </p>
        </div>

        {/* Company cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
          {railwayCompanies.map((company) => {
            if (company.available) {
              return (
                <Link
                  key={company.id}
                  href={company.href}
                  target={company.external ? "_blank" : undefined}
                  rel={company.external ? "noopener noreferrer" : undefined}
                  className="
                    group
                    relative
                    min-h-[180px]
                    overflow-hidden
                    rounded-3xl
                    border
                    border-zinc-200
                    bg-white
                    p-6
                    shadow-sm
                    transition-all
                    duration-200
                    hover:-translate-y-1
                    hover:border-zinc-300
                    hover:shadow-lg
                    sm:min-h-[210px]
                    sm:p-8
                  "
                >
                  <div className="absolute left-0 top-0 h-full w-1.5 bg-[#8fc31f]" />

                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <div className="mb-5 flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8fc31f]/10">
                          <TrainFront className="h-5 w-5 text-[#6fa900]" />
                        </div>

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 transition-colors group-hover:bg-zinc-950 group-hover:text-white">
                          {company.external ? (
                            <ExternalLink className="h-4 w-4" />
                          ) : (
                            <ArrowRight className="h-4 w-4" />
                          )}
                        </div>
                      </div>

                      <h3
                        lang="ja"
                        className="
                          text-2xl
                          font-black
                          tracking-tight
                          text-zinc-950
                          [font-family:var(--font-noto-jp),var(--font-noto-kr),sans-serif]
                          sm:text-3xl
                        "
                      >
                        {company.ja}
                      </h3>

                      <p className="mt-2 text-base font-bold text-zinc-700">
                        {company.ko}
                      </p>

                      <p className="mt-1 text-sm text-zinc-400">{company.en}</p>

                      <p className="mt-4 text-xs font-bold text-zinc-400">
                        {company.external
                          ? "독립 서비스 열기 ↗"
                          : "서비스 열기 →"}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            }

            return (
              <div
                key={company.id}
                className="
                  relative
                  min-h-[180px]
                  overflow-hidden
                  rounded-3xl
                  border
                  border-zinc-200
                  bg-white
                  p-6
                  opacity-60
                  sm:min-h-[210px]
                  sm:p-8
                "
              >
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100">
                        <TrainFront className="h-5 w-5 text-zinc-400" />
                      </div>

                      <span className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-bold text-zinc-500">
                        준비 중
                      </span>
                    </div>

                    <h3
                      lang="ja"
                      className="
                        text-2xl
                        font-black
                        tracking-tight
                        text-zinc-700
                        [font-family:var(--font-noto-jp),var(--font-noto-kr),sans-serif]
                        sm:text-3xl
                      "
                    >
                      {company.ja}
                    </h3>

                    <p className="mt-2 text-base font-bold text-zinc-600">
                      {company.ko}
                    </p>

                    <p className="mt-1 text-sm text-zinc-400">{company.en}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-xs leading-5 text-zinc-400">
          제공되는 철도 정보는 실제 운행 상황과 차이가 있을 수 있습니다.
        </p>
      </section>
    </main>
  );
}
