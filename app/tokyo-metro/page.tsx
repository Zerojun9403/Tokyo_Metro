import Link from "next/link";
import { ArrowLeft, TrainFront } from "lucide-react";

const tokyoMetroLines = [
  {
    id: "ginza",
    code: "G",
    ja: "銀座線",
    ko: "긴자선",
    en: "Ginza Line",
    color: "#FF9500",
  },
  {
    id: "marunouchi",
    code: "M",
    ja: "丸ノ内線",
    ko: "마루노우치선",
    en: "Marunouchi Line",
    color: "#F62E36",
  },
  {
    id: "hibiya",
    code: "H",
    ja: "日比谷線",
    ko: "히비야선",
    en: "Hibiya Line",
    color: "#B5B5AC",
  },
  {
    id: "tozai",
    code: "T",
    ja: "東西線",
    ko: "도자이선",
    en: "Tozai Line",
    color: "#009BBF",
  },
  {
    id: "chiyoda",
    code: "C",
    ja: "千代田線",
    ko: "치요다선",
    en: "Chiyoda Line",
    color: "#00BB85",
  },
  {
    id: "yurakucho",
    code: "Y",
    ja: "有楽町線",
    ko: "유라쿠초선",
    en: "Yurakucho Line",
    color: "#C1A470",
  },
  {
    id: "hanzomon",
    code: "Z",
    ja: "半蔵門線",
    ko: "한조몬선",
    en: "Hanzomon Line",
    color: "#8F76D6",
  },
  {
    id: "namboku",
    code: "N",
    ja: "南北線",
    ko: "난보쿠선",
    en: "Namboku Line",
    color: "#00AC9B",
  },
  {
    id: "fukutoshin",
    code: "F",
    ja: "副都心線",
    ko: "후쿠토신선",
    en: "Fukutoshin Line",
    color: "#9C5E31",
  },
];

export default function TokyoMetroPage() {
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
              transition
              hover:bg-zinc-100
            "
            aria-label="메인으로 돌아가기"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#149DD3] text-white">
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
                東京メトロ
              </h1>

              <p className="text-xs font-medium text-zinc-500">도쿄메트로</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14 lg:py-16">
        <div className="mb-9 sm:mb-12">
          <p className="mb-3 text-sm font-black text-[#149DD3]">TOKYO METRO</p>

          <h2 className="text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
            이용할 노선을
            <br className="sm:hidden" /> 선택하세요
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">
            도쿄메트로의 노선을 선택하여 역 정보와 열차 정보를 확인할 수
            있습니다.
          </p>
        </div>

        {/* Lines */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {tokyoMetroLines.map((line) => (
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
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-md
              "
            >
              {/* Line color */}
              <div
                className="absolute inset-x-0 top-0 h-1.5"
                style={{
                  backgroundColor: line.color,
                }}
              />

              <div className="mb-7 flex items-start justify-between">
                {/* Line symbol */}
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
                    text-lg
                    font-black
                    text-zinc-950
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
          ))}
        </div>

        {/* Notice */}
        <div className="mt-10 rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-center">
          <p className="text-xs leading-5 text-zinc-400">
            도쿄메트로 노선 서비스는 순차적으로 추가될 예정입니다.
          </p>
        </div>
      </section>
    </main>
  );
}
