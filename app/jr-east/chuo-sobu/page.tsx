import Link from "next/link";

import { ChuoSobuMap } from "@/components/chuo-sobu-map";

export default function ChuoSobuPage() {
  return (
    <main className="min-h-screen bg-[#fcfcfb] text-zinc-950">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <Link
              href="/jr-east"
              className="text-sm font-bold text-zinc-500 transition-colors hover:text-zinc-950"
            >
              ← JR東日本
            </Link>
            <p className="mt-1 text-xs font-medium text-zinc-400">
              JR East Railway
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: "#FFD400" }}
            />
            <span className="text-sm font-black">JB</span>
          </div>
        </div>
      </header>

      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border-[4px] bg-white text-lg font-black shadow-sm"
                  style={{ borderColor: "#FFD400" }}
                >
                  JB
                </div>

                <div>
                  <p className="text-sm font-bold text-zinc-500">JR東日本</p>
                  <p className="text-xs text-zinc-400">JR East</p>
                </div>
              </div>

              <h1
                lang="ja"
                className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl"
              >
                中央・総武線
              </h1>

              <p className="mt-3 text-lg font-bold text-zinc-700 sm:text-xl">
                주오·소부선 각역정차
              </p>

              <p className="mt-2 text-sm font-medium text-zinc-400 sm:text-base">
                Chūō-Sōbu Line (Local)
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <InfoCard label="노선 코드" value="JB" />
              <InfoCard label="구간" value="미타카 ↔ 지바" />
              <InfoCard label="역 수" value="39" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        <div className="mb-6">
          <p className="text-sm font-black text-zinc-950">ROUTE MAP</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
            <h2 className="text-2xl font-black sm:text-3xl">
              주오·소부선 노선도
            </h2>
            <span className="text-sm font-medium text-zinc-400">
              中央・総武線 路線図
            </span>
          </div>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            역 이름이나 역 표시를 선택하면 해당 역 정보를 확인할 수 있습니다.
          </p>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="h-2 w-full" style={{ backgroundColor: "#FFD400" }} />
          <div className="p-3 sm:p-5">
            <ChuoSobuMap />
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-zinc-100/80 px-5 py-4 text-sm leading-6 text-zinc-600">
          현재 노선도는 미타카(JB01)에서 지바(JB39)까지 표시합니다. 다음
          단계에서 역 상세 정보와 미타카 방면·지바 방면 시간표를 연결할
          예정입니다.
        </div>
      </section>
    </main>
  );
}

interface InfoCardProps {
  label: string;
  value: string;
}

function InfoCard({ label, value }: InfoCardProps) {
  return (
    <div className="min-w-[92px] rounded-2xl border border-zinc-200 bg-[#fcfcfb] px-3 py-3 sm:min-w-[112px] sm:px-4">
      <p className="text-[10px] font-bold text-zinc-400 sm:text-xs">{label}</p>
      <p className="mt-1 break-keep text-xs font-black text-zinc-900 sm:text-sm">
        {value}
      </p>
    </div>
  );
}
