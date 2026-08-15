import Link from "next/link";
import { ArrowLeft, ArrowRight, TrainFront } from "lucide-react";

const jrEastLines = [
  {
    id: "yamanote",
    code: "JY",
    ja: "山手線",
    ko: "야마노테선",
    en: "Yamanote Line",
    color: "#8FC31F",
    href: "/jr-east/yamanote",
    available: true,
  },
  {
    id: "chuo-rapid",
    code: "JC",
    ja: "中央線快速",
    ko: "주오선 쾌속",
    en: "Chuo Line (Rapid)",
    color: "#F15A22",
    href: "/jr-east/chuo-rapid",
    available: true,
  },
  {
    id: "chuo-sobu",
    code: "JB",
    ja: "中央・総武線",
    ko: "주오·소부선",
    en: "Chuo-Sobu Line",
    color: "#FFD400",
    href: "/jr-east/chuo-sobu",
    available: false,
  },
  {
    id: "keihin-tohoku",
    code: "JK",
    ja: "京浜東北・根岸線",
    ko: "게이힌도호쿠·네기시선",
    en: "Keihin-Tohoku / Negishi Line",
    color: "#00A7E3",
    href: "/jr-east/keihin-tohoku",
    available: false,
  },
  {
    id: "saikyo",
    code: "JA",
    ja: "埼京線",
    ko: "사이쿄선",
    en: "Saikyo Line",
    color: "#00AC9A",
    href: "/jr-east/saikyo",
    available: false,
  },
  {
    id: "shonan-shinjuku",
    code: "JS",
    ja: "湘南新宿ライン",
    ko: "쇼난신주쿠라인",
    en: "Shonan-Shinjuku Line",
    color: "#E21F26",
    href: "/jr-east/shonan-shinjuku",
    available: false,
  },
];

export default function JrEastPage() {
  return (
    <main className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center px-5 py-5 sm:px-8">
          <Link
            href="/"
            className="
              mr-4
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-zinc-200
              bg-white
              transition
              hover:bg-zinc-100
            "
            aria-label="메인으로 돌아가기"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-[#8FC31F]
                text-white
              "
            >
              <TrainFront className="h-5 w-5" />
            </div>

            <div>
              <h1
                lang="ja"
                className="
                  text-lg
                  font-black
                  tracking-tight
                  text-zinc-950
                  [font-family:var(--font-noto-jp),var(--font-noto-kr),sans-serif]
                "
              >
                JR 東日本
              </h1>

              <p className="text-xs font-medium text-zinc-500">JR동일본</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <section
        className="
          mx-auto
          max-w-6xl
          px-5
          py-10
          sm:px-8
          sm:py-14
          lg:py-16
        "
      >
        {/* Title */}
        <div className="mb-9 sm:mb-12">
          <p className="mb-3 text-sm font-black text-[#73A900]">JR EAST</p>

          <h2
            className="
              text-3xl
              font-black
              tracking-tight
              text-zinc-950
              sm:text-4xl
            "
          >
            이용할 노선을
            <br className="sm:hidden" /> 선택하세요
          </h2>

          <p
            className="
              mt-4
              max-w-xl
              text-sm
              leading-6
              text-zinc-500
              sm:text-base
            "
          >
            JR동일본의 도쿄 지역 노선을 선택하여 역 정보와 다음 열차, 환승
            정보를 확인할 수 있습니다.
          </p>
        </div>

        {/* Line Cards */}
        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            lg:grid-cols-3
            lg:gap-5
          "
        >
          {jrEastLines.map((line) => {
            if (line.available) {
              return (
                <Link
                  key={line.id}
                  href={line.href}
                  className="
                    group
                    relative
                    min-h-[220px]
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
                  "
                >
                  {/* Line color */}
                  <div
                    className="absolute inset-x-0 top-0 h-1.5"
                    style={{
                      backgroundColor: line.color,
                    }}
                  />

                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <div className="mb-7 flex items-start justify-between">
                        {/* Line code */}
                        <div
                          className="
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-full
                            border-[4px]
                            bg-white
                            text-base
                            font-black
                          "
                          style={{
                            borderColor: line.color,
                          }}
                        >
                          {line.code}
                        </div>

                        <div
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            bg-zinc-100
                            transition-colors
                            group-hover:bg-zinc-950
                            group-hover:text-white
                          "
                        >
                          <ArrowRight className="h-4 w-4" />
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
                        "
                      >
                        {line.ja}
                      </h3>

                      <p className="mt-2 text-base font-bold text-zinc-700">
                        {line.ko}
                      </p>

                      <p className="mt-1 text-sm text-zinc-400">{line.en}</p>
                    </div>
                  </div>
                </Link>
              );
            }

            return (
              <div
                key={line.id}
                className="
                  relative
                  min-h-[220px]
                  overflow-hidden
                  rounded-3xl
                  border
                  border-zinc-200
                  bg-white
                  p-6
                  opacity-60
                "
              >
                {/* Line color */}
                <div
                  className="absolute inset-x-0 top-0 h-1.5"
                  style={{
                    backgroundColor: line.color,
                  }}
                />

                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="mb-7 flex items-start justify-between">
                      <div
                        className="
                          flex
                          h-14
                          w-14
                          items-center
                          justify-center
                          rounded-full
                          border-[4px]
                          bg-white
                          text-base
                          font-black
                        "
                        style={{
                          borderColor: line.color,
                        }}
                      >
                        {line.code}
                      </div>

                      <span
                        className="
                          rounded-full
                          bg-zinc-100
                          px-3
                          py-1.5
                          text-xs
                          font-bold
                          text-zinc-500
                        "
                      >
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
                      "
                    >
                      {line.ja}
                    </h3>

                    <p className="mt-2 text-base font-bold text-zinc-600">
                      {line.ko}
                    </p>

                    <p className="mt-1 text-sm text-zinc-400">{line.en}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer notice */}
        <div
          className="
            mt-10
            rounded-2xl
            border
            border-zinc-200
            bg-white
            px-5
            py-4
            text-center
          "
        >
          <p className="text-xs leading-5 text-zinc-400">
            현재 야마노테선 서비스를 이용할 수 있으며, 다른 JR동일본 노선은
            순차적으로 추가될 예정입니다.
          </p>
        </div>
      </section>
    </main>
  );
}
