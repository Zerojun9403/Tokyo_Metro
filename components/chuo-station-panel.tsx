"use client";

import type { GinzaStation } from "@/data/ginza";
import { GINZA_COLOR } from "@/data/ginza";

type GinzaStationPanelProps = {
  station: GinzaStation | null;
  onClose: () => void;
};

const CONNECTING_RAILWAYS: Record<
  string,
  {
    code: string;
    name: string;
    color: string;
  }[]
> = {
  Shibuya: [
    { code: "JY", name: "JR山手線", color: "#9ACD32" },
    { code: "Z", name: "半蔵門線", color: "#8F76D6" },
    { code: "F", name: "副都心線", color: "#9C5E31" },
  ],

  OmoteSando: [
    { code: "C", name: "千代田線", color: "#00BB85" },
    { code: "Z", name: "半蔵門線", color: "#8F76D6" },
  ],

  AoyamaItchome: [
    { code: "Z", name: "半蔵門線", color: "#8F76D6" },
    { code: "E", name: "都営大江戸線", color: "#B6007A" },
  ],

  AkasakaMitsuke: [{ code: "M", name: "丸ノ内線", color: "#F62E36" }],

  TameikeSanno: [{ code: "N", name: "南北線", color: "#00AC9B" }],

  Shimbashi: [
    { code: "JY", name: "JR山手線", color: "#9ACD32" },
    { code: "JK", name: "JR京浜東北線", color: "#00B2E5" },
    { code: "A", name: "都営浅草線", color: "#E85298" },
  ],

  Ginza: [
    { code: "M", name: "丸ノ内線", color: "#F62E36" },
    { code: "H", name: "日比谷線", color: "#B5B5AC" },
  ],

  Nihombashi: [
    { code: "T", name: "東西線", color: "#009BBF" },
    { code: "A", name: "都営浅草線", color: "#E85298" },
  ],

  Mitsukoshimae: [{ code: "Z", name: "半蔵門線", color: "#8F76D6" }],

  Kanda: [
    { code: "JY", name: "JR山手線", color: "#9ACD32" },
    { code: "JK", name: "JR京浜東北線", color: "#00B2E5" },
    { code: "JC", name: "JR中央線快速", color: "#F15A22" },
  ],

  UenoHirokoji: [{ code: "H", name: "日比谷線", color: "#B5B5AC" }],

  Ueno: [
    { code: "JY", name: "JR山手線", color: "#9ACD32" },
    { code: "JK", name: "JR京浜東北線", color: "#00B2E5" },
    { code: "H", name: "日比谷線", color: "#B5B5AC" },
  ],

  Asakusa: [{ code: "A", name: "都営浅草線", color: "#E85298" }],
};

export function GinzaStationPanel({
  station,
  onClose,
}: GinzaStationPanelProps) {
  if (!station) {
    return null;
  }

  const connectingRailways = CONNECTING_RAILWAYS[station.id] ?? [];

  return (
    <>
      {/* 배경 */}
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
      />

      {/* 패널 */}
      <aside className="fixed bottom-0 right-0 top-0 z-50 w-full overflow-y-auto bg-white shadow-2xl sm:w-[460px]">
        {/* 상단 */}
        <div className="border-b border-zinc-200 px-6 py-6">
          <div className="flex items-start justify-between gap-5">
            <div className="flex min-w-0 items-center gap-4">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 bg-white text-lg font-black"
                style={{
                  borderColor: GINZA_COLOR,
                  color: GINZA_COLOR,
                }}
              >
                {station.code}
              </div>

              <div className="min-w-0">
                <p className="text-xs font-bold text-zinc-400">
                  東京メトロ銀座線
                </p>

                <h2 className="mt-1 text-3xl font-black tracking-tight text-zinc-950">
                  {station.ja}
                </h2>

                <p className="mt-1 text-sm font-semibold text-zinc-600">
                  {station.ko}
                </p>

                <p className="text-xs text-zinc-400">{station.en}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xl font-bold text-zinc-500 transition hover:bg-zinc-200 hover:text-zinc-950"
            >
              ×
            </button>
          </div>
        </div>

        {/* 노선 */}
        <div className="border-b border-zinc-100 px-6 py-6">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.15em] text-zinc-400">
            Line
          </p>

          <div className="flex items-center gap-4 rounded-2xl bg-zinc-50 p-4">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-black text-white"
              style={{ backgroundColor: GINZA_COLOR }}
            >
              G
            </div>

            <div>
              <p className="font-black text-zinc-950">東京メトロ銀座線</p>

              <p className="text-sm text-zinc-500">도쿄메트로 긴자선</p>
            </div>
          </div>
        </div>

        {/* 운행 방향 */}
        <div className="border-b border-zinc-100 px-6 py-6">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.15em] text-zinc-400">
            Direction
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-zinc-200 p-4">
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: GINZA_COLOR }}
                />

                <span className="font-black text-zinc-950">← 渋谷方面</span>
              </div>

              <p className="mt-2 text-xs font-semibold text-zinc-500">
                시부야 방면
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 p-4 text-right">
              <div className="flex items-center justify-end gap-2">
                <span className="font-black text-zinc-950">浅草方面 →</span>

                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: GINZA_COLOR }}
                />
              </div>

              <p className="mt-2 text-xs font-semibold text-zinc-500">
                아사쿠사 방면
              </p>
            </div>
          </div>
        </div>

        {/* 환승 */}
        <div className="px-6 py-6">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.15em] text-zinc-400">
            Transfer
          </p>

          {connectingRailways.length > 0 ? (
            <div className="space-y-3">
              {connectingRailways.map((railway) => (
                <div
                  key={`${station.id}-${railway.code}`}
                  className="flex items-center gap-4 rounded-2xl border border-zinc-200 p-4"
                >
                  <div
                    className="flex h-11 min-w-11 items-center justify-center rounded-xl px-2 text-sm font-black text-white"
                    style={{
                      backgroundColor: railway.color,
                    }}
                  >
                    {railway.code}
                  </div>

                  <div>
                    <p className="font-bold text-zinc-950">{railway.name}</p>

                    <p className="text-xs text-zinc-400">환승 가능</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-zinc-50 p-5 text-sm font-medium text-zinc-500">
              표시할 환승 노선이 없습니다.
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
