"use client";

import { useEffect, useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import type { StationApiResponse } from "@/types/station";

interface Station {
  id: string;
  code: string;
  ja: string;
  ko: string;
  en: string;
}

interface ChuoStationPanelProps {
  station: Station | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CHUO_ORANGE = "#F15A22";

export function ChuoStationPanel({
  station,
  open,
  onOpenChange,
}: ChuoStationPanelProps) {
  const [stationInfo, setStationInfo] = useState<StationApiResponse | null>(
    null,
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!station || !open) {
      return;
    }

    const fetchStationData = async () => {
      try {
        setLoading(true);
        setError(null);
        setStationInfo(null);

        const response = await fetch(
          `/api/station?railway=ChuoRapid&station=${encodeURIComponent(
            station.id,
          )}`,
          {
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error("역 정보를 불러오지 못했습니다.");
        }

        const data: StationApiResponse = await response.json();

        setStationInfo(data);
      } catch (error) {
        console.error(error);
        setError("역 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchStationData();
  }, [station, open]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className="
          w-screen
          max-w-none
          overflow-x-hidden
          overflow-y-auto
          border-l
          bg-[#fcfcfb]
          p-0

          sm:w-[92vw]
          sm:max-w-[720px]

          md:w-[760px]
          md:max-w-none

          lg:w-[820px]
          lg:max-w-none

          xl:w-[880px]
          xl:max-w-none
        "
      >
        {station && (
          <>
            {/* =========================
                STATION HEADER
            ========================== */}

            <SheetHeader
              className="
                border-b
                bg-white
                px-4
                py-5
                pr-12
                sm:px-8
                sm:py-7
              "
            >
              <div className="flex items-center gap-4 sm:gap-5">
                {/* Station Code */}

                <div
                  className="
                    flex
                    h-[66px]
                    w-[66px]
                    shrink-0
                    flex-col
                    items-center
                    justify-center
                    rounded-full
                    border-[6px]
                    bg-white
                    text-black
                    shadow-sm

                    sm:h-[82px]
                    sm:w-[82px]
                  "
                  style={{
                    borderColor: CHUO_ORANGE,
                  }}
                >
                  <span className="text-sm font-extrabold leading-none">
                    JC
                  </span>

                  <span className="mt-1 text-2xl font-black leading-none">
                    {getStationNumber(station.code)}
                  </span>
                </div>

                {/* Station Name */}

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                    <SheetTitle
                      lang="ja"
                      className="
                        break-keep
                        text-2xl
                        font-black
                        tracking-tight
                        sm:text-[34px]
                      "
                    >
                      {station.ja}駅
                    </SheetTitle>

                    <span className="text-base font-medium text-zinc-500">
                      {getJapaneseReading(station.id)}
                    </span>
                  </div>

                  <SheetDescription className="mt-2 text-sm text-zinc-700 sm:mt-3 sm:text-base">
                    <span className="font-medium text-zinc-900">
                      {station.en}
                    </span>

                    <span className="mx-2 text-zinc-400">·</span>

                    <span>{station.ko}</span>
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>

            {/* =========================
                BODY
            ========================== */}

            <div className="space-y-6 px-4 py-5 sm:px-8 sm:py-7">
              {/* Loading */}

              {loading && (
                <div className="flex min-h-[320px] flex-col items-center justify-center">
                  <div
                    className="
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-full
                      bg-[#F15A22]/10
                    "
                  >
                    <TrainIcon className="h-8 w-8 text-[#F15A22]" />
                  </div>

                  <p className="mt-5 text-sm font-medium text-zinc-500">
                    역 정보를 불러오는 중...
                  </p>
                </div>
              )}

              {/* Error */}

              {!loading && error && (
                <div
                  className="
                    rounded-2xl
                    border
                    border-red-200
                    bg-red-50
                    p-5
                    text-sm
                    text-red-600
                  "
                >
                  {error}
                </div>
              )}

              {/* Station Information */}

              {!loading && !error && stationInfo && (
                <>
                  {/* =========================
                      TRANSFER
                  ========================== */}

                  <section>
                    <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <TrainIcon className="h-6 w-6 text-[#F15A22]" />

                      <h2 className="text-xl font-black">환승 노선</h2>

                      <span className="text-sm text-zinc-500">
                        この駅で乗り換え
                      </span>
                    </div>

                    {stationInfo.connectingRailways.length > 0 ? (
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {stationInfo.connectingRailways.map((railway) => (
                          <div
                            key={railway.id}
                            className="
                              group
                              flex
                              min-w-0
                              items-center
                              gap-4
                              rounded-2xl
                              border
                              border-zinc-200
                              bg-white
                              px-4
                              py-3
                              shadow-[0_2px_8px_rgba(0,0,0,0.05)]
                              transition-all
                              hover:-translate-y-0.5
                              hover:shadow-md
                            "
                          >
                            <div
                              className="
                                flex
                                h-11
                                w-11
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                text-sm
                                font-black
                                text-white
                                shadow-sm
                              "
                              style={{
                                backgroundColor: railway.color,
                              }}
                            >
                              {railway.code ?? "•"}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-sm font-bold text-zinc-900">
                                {railway.name}
                              </p>

                              <p className="mt-0.5 truncate text-xs text-zinc-500">
                                {getOperatorName(railway.operator)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-sm text-zinc-500">
                        환승 가능한 다른 노선이 없습니다.
                      </div>
                    )}
                  </section>

                  {/* =========================
                      LINE INFORMATION
                  ========================== */}

                  <section
                    className="
                      rounded-3xl
                      border
                      border-orange-100
                      bg-orange-50/60
                      px-5
                      py-5
                      sm:px-6
                    "
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="
                          flex
                          h-12
                          w-12
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border-[4px]
                          bg-white
                          text-sm
                          font-black
                        "
                        style={{
                          borderColor: CHUO_ORANGE,
                        }}
                      >
                        JC
                      </div>

                      <div>
                        <p
                          lang="ja"
                          className="text-base font-black text-zinc-950"
                        >
                          中央線快速
                        </p>

                        <p className="mt-0.5 text-sm font-bold text-zinc-600">
                          주오선 쾌속
                        </p>

                        <p className="mt-0.5 text-xs text-zinc-400">
                          Chuo Line (Rapid)
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* =========================
                      NOTICE
                  ========================== */}

                  <section
                    className="
                      flex
                      gap-4
                      rounded-3xl
                      bg-zinc-100/70
                      px-5
                      py-5
                      text-sm
                      leading-6
                      text-zinc-600
                    "
                  >
                    <InfoIcon className="mt-0.5 h-6 w-6 shrink-0 text-[#F15A22]" />

                    <p>
                      현재 주오선 쾌속에서는 역 정보와 환승 노선을 제공합니다.
                      <br className="hidden sm:block" />
                      다음 열차 정보는 추후 추가할 예정입니다.
                    </p>
                  </section>
                </>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

/* ======================================================
   HELPERS
====================================================== */

function getStationNumber(code: string) {
  const number = code.replace(/[^0-9]/g, "");

  return number.padStart(2, "0");
}

function getOperatorName(operator: string) {
  const operators: Record<string, string> = {
    "JR-East": "JR東日本",
    TokyoMetro: "東京メトロ",
    Toei: "都営地下鉄",
    Keio: "京王電鉄",
    Odakyu: "小田急電鉄",
    Seibu: "西武鉄道",
    Tobu: "東武鉄道",
    Tokyu: "東急電鉄",
    Keikyu: "京急電鉄",
    TokyoMonorail: "東京モノレール",
    TokyoWaterfrontAreaRapidTransit: "東京臨海高速鉄道",
  };

  return operators[operator] ?? operator;
}

function getJapaneseReading(stationId: string) {
  const readings: Record<string, string> = {
    Tokyo: "とうきょう",
    Kanda: "かんだ",
    Ochanomizu: "おちゃのみず",
    Yotsuya: "よつや",
    Shinjuku: "しんじゅく",
    Nakano: "なかの",
    Koenji: "こうえんじ",
    Asagaya: "あさがや",
    Ogikubo: "おぎくぼ",
    NishiOgikubo: "にしおぎくぼ",
    Kichijoji: "きちじょうじ",
    Mitaka: "みたか",
    MusashiSakai: "むさしさかい",
    HigashiKoganei: "ひがしこがねい",
    MusashiKoganei: "むさしこがねい",
    Kokubunji: "こくぶんじ",
    NishiKokubunji: "にしこくぶんじ",
    Kunitachi: "くにたち",
    Tachikawa: "たちかわ",
    Hino: "ひの",
    Toyoda: "とよだ",
    Hachioji: "はちおうじ",
    NishiHachioji: "にしはちおうじ",
    Takao: "たかお",
  };

  return readings[stationId] ?? "";
}

/* ======================================================
   ICONS
====================================================== */

interface IconProps {
  className?: string;
}

function TrainIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="6" y="3" width="12" height="15" rx="3" />
      <path d="M8 3h8" />
      <path d="M8 8h8" />
      <path d="M8 13h.01" />
      <path d="M16 13h.01" />
      <path d="m8 21 2-3" />
      <path d="m16 21-2-3" />
    </svg>
  );
}

function InfoIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}
