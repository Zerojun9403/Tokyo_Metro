import Link from "next/link";
import { ChuoRapidMap } from "@/components/chuo-rapid-map";
import { ArrowLeft, TrainFront } from "lucide-react";

export default function ChuoRapidPage() {
  return (
    <main className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/jr-east"
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              px-3
              py-2
              text-sm
              font-bold
              text-zinc-600
              transition-colors
              hover:bg-zinc-100
              hover:text-zinc-950
            "
          >
            <ArrowLeft className="h-4 w-4" />
            <span>JR동일본 노선</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          {/* Line information */}
          <div className="flex items-center gap-4">
            <div
              className="
                flex
                h-16
                w-16
                shrink-0
                items-center
                justify-center
                rounded-full
                border-[5px]
                bg-white
                text-xl
                font-black
                text-zinc-950
              "
              style={{
                borderColor: "#F15A22",
              }}
            >
              JC
            </div>

            <div>
              <p className="text-xs font-black tracking-wider text-[#F15A22]">
                JR EAST
              </p>

              <h1
                lang="ja"
                className="
                  mt-1
                  text-2xl
                  font-black
                  tracking-tight
                  text-zinc-950
                  sm:text-3xl
                "
              >
                中央線快速
              </h1>

              <p className="mt-1 text-sm font-bold text-zinc-700 sm:text-base">
                주오선 쾌속
              </p>

              <p className="text-xs text-zinc-400 sm:text-sm">
                Chuo Line (Rapid)
              </p>
            </div>
          </div>

          <div className="my-8 h-px bg-zinc-100" />
          <ChuoRapidMap />
        </div>
      </section>
    </main>
  );
}
