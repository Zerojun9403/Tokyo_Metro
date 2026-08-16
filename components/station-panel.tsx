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
import type { TimetableApiResponse } from "@/types/timetable";

interface Station {
  id: string;
  ja: string;
  ko: string;
  en: string;
}

interface StationPanelProps {
  station: Station | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface DirectionInfo {
  inner: string;
  outer: string;
}

const YAMANOTE_GREEN = "#84c318";

const DIRECTION_INFO: Record<string, DirectionInfo> = {
  Tokyo: {
    inner: "上野・池袋方面",
    outer: "品川・渋谷方面",
  },
  Kanda: {
    inner: "上野・池袋方面",
    outer: "東京・品川方面",
  },
  Akihabara: {
    inner: "上野・池袋方面",
    outer: "東京・品川方面",
  },
  Okachimachi: {
    inner: "上野・池袋方面",
    outer: "秋葉原・東京方面",
  },
  Ueno: {
    inner: "田端・池袋方面",
    outer: "秋葉原・東京方面",
  },
  Uguisudani: {
    inner: "日暮里・池袋方面",
    outer: "上野・東京方面",
  },
  Nippori: {
    inner: "田端・池袋方面",
    outer: "上野・東京方面",
  },
  NishiNippori: {
    inner: "田端・池袋方面",
    outer: "日暮里・上野方面",
  },
  Tabata: {
    inner: "池袋・新宿方面",
    outer: "上野・東京方面",
  },
  Komagome: {
    inner: "池袋・新宿方面",
    outer: "田端・上野方面",
  },
  Sugamo: {
    inner: "池袋・新宿方面",
    outer: "田端・上野方面",
  },
  Otsuka: {
    inner: "池袋・新宿方面",
    outer: "巣鴨・上野方面",
  },
  Ikebukuro: {
    inner: "新宿・渋谷方面",
    outer: "田端・上野方面",
  },
  Mejiro: {
    inner: "新宿・渋谷方面",
    outer: "池袋・上野方面",
  },
  Takadanobaba: {
    inner: "新宿・渋谷方面",
    outer: "池袋・上野方面",
  },
  ShinOkubo: {
    inner: "新宿・渋谷方面",
    outer: "池袋・上野方面",
  },
  Shinjuku: {
    inner: "渋谷・品川方面",
    outer: "池袋・上野方面",
  },
  Yoyogi: {
    inner: "渋谷・品川方面",
    outer: "新宿・池袋方面",
  },
  Harajuku: {
    inner: "渋谷・品川方面",
    outer: "新宿・池袋方面",
  },
  Shibuya: {
    inner: "品川・東京方面",
    outer: "新宿・池袋方面",
  },
  Ebisu: {
    inner: "品川・東京方面",
    outer: "渋谷・新宿方面",
  },
  Meguro: {
    inner: "品川・東京方面",
    outer: "渋谷・新宿方面",
  },
  Gotanda: {
    inner: "品川・東京方面",
    outer: "渋谷・新宿方面",
  },
  Osaki: {
    inner: "品川・東京方面",
    outer: "渋谷・新宿方面",
  },
  Shinagawa: {
    inner: "東京・上野方面",
    outer: "渋谷・新宿方面",
  },
  TakanawaGateway: {
    inner: "東京・上野方面",
    outer: "品川・渋谷方面",
  },
  Tamachi: {
    inner: "東京・上野方面",
    outer: "品川・渋谷方面",
  },
  Hamamatsucho: {
    inner: "東京・上野方面",
    outer: "品川・渋谷方面",
  },
  Shimbashi: {
    inner: "東京・上野方面",
    outer: "品川・渋谷方面",
  },
  Yurakucho: {
    inner: "東京・上野方面",
    outer: "新橋・品川方面",
  },
};

export function StationPanel({
  station,
  open,
  onOpenChange,
}: StationPanelProps) {
  const [timetable, setTimetable] = useState<TimetableApiResponse | null>(null);

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

        setTimetable(null);
        setStationInfo(null);

        const [timetableResponse, stationResponse] = await Promise.all([
          fetch(`/api/timetable?station=${encodeURIComponent(station.id)}`, {
            cache: "no-store",
          }),

          fetch(`/api/station?station=${encodeURIComponent(station.id)}`, {
            cache: "no-store",
          }),
        ]);

        if (!timetableResponse.ok) {
          throw new Error("시간표 정보를 불러오지 못했습니다.");
        }

        if (!stationResponse.ok) {
          throw new Error("역 정보를 불러오지 못했습니다.");
        }

        const timetableData: TimetableApiResponse =
          await timetableResponse.json();

        const stationData: StationApiResponse = await stationResponse.json();

        setTimetable(timetableData);
        setStationInfo(stationData);
      } catch (error) {
        console.error(error);

        setError("역 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchStationData();
  }, [station, open]);

  const direction = station ? DIRECTION_INFO[station.id] : undefined;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className="
    w-[95vw]
    max-w-none
    overflow-y-auto
    border-l
    bg-[#fcfcfb]
    p-0

    sm:w-[720px]
    sm:max-w-none

    md:w-[780px]
    md:max-w-none

    lg:w-[860px]
    lg:max-w-none

    xl:w-[920px]
    xl:max-w-none
  "
      >
        {station && (
          <>
            {/* ===========================
                STATION HEADER
            ============================ */}

            <SheetHeader
              className="
                border-b
                bg-white
                px-6
                py-6
                pr-14
                sm:px-8
                sm:py-7
              "
            >
              <div className="flex items-center gap-5">
                {/* Station code */}

                <div
                  className="
                    flex
                    h-[82px]
                    w-[82px]
                    shrink-0
                    flex-col
                    items-center
                    justify-center
                    rounded-full
                    border-[6px]
                    bg-white
                    text-black
                    shadow-sm
                  "
                  style={{
                    borderColor: YAMANOTE_GREEN,
                  }}
                >
                  <span className="text-sm font-extrabold leading-none">
                    JY
                  </span>

                  <span className="mt-1 text-2xl font-black leading-none">
                    {getStationNumber(stationInfo?.station.code)}
                  </span>
                </div>

                {/* Station name */}

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                    <SheetTitle className="text-3xl font-black tracking-tight sm:text-[34px]">
                      {station.ja}駅
                    </SheetTitle>

                    <span className="text-base font-medium text-zinc-500">
                      {getJapaneseReading(station.id)}
                    </span>
                  </div>

                  <SheetDescription className="mt-3 text-base text-zinc-700">
                    <span className="font-medium text-zinc-900">
                      {station.en}
                    </span>

                    <span className="mx-2 text-zinc-400">·</span>

                    <span>{station.ko}</span>
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>

            {/* ===========================
                BODY
            ============================ */}

            <div className="space-y-6 px-5 py-6 sm:px-8 sm:py-7">
              {/* Loading */}

              {loading && (
                <div className="flex min-h-[400px] flex-col items-center justify-center">
                  <div
                    className="
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-full
                      bg-[#84c318]/10
                    "
                  >
                    <TrainIcon className="h-8 w-8 text-[#74b500]" />
                  </div>

                  <p className="mt-5 text-sm font-medium text-zinc-500">
                    역 정보를 불러오는 중...
                  </p>
                </div>
              )}

              {/* Error */}

              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
                  {error}
                </div>
              )}

              {!loading && timetable && stationInfo && (
                <>
                  {/* ===========================
                        TRANSFER
                    ============================ */}

                  <section>
                    <div className="mb-5 flex items-center gap-4">
                      <TrainIcon className="h-6 w-6 text-[#74b500]" />

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
                      <div className="rounded-2xl border bg-white p-5 text-sm text-zinc-500">
                        환승 가능한 다른 노선이 없습니다.
                      </div>
                    )}
                  </section>

                  {/* ===========================
                        TODAY
                    ============================ */}

                  <section>
                    <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <TrainIcon className="h-6 w-6 text-[#74b500]" />
                      <h2 className="text-xl font-black">다음 열차</h2>
                      <span className="text-sm text-zinc-500">次の電車</span>
                      <span className="ml-auto text-xs font-medium text-zinc-400">
                        {timetable.calendar === "Weekday"
                          ? "평일 시간표"
                          : "토요일 · 휴일 시간표"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <TimetableCard
                        title="内回り"
                        koreanTitle="내선순환"
                        toward={direction?.inner ?? "渋谷・品川方面"}
                        arrow="←"
                        side="left"
                        trains={timetable.directions.innerLoop}
                      />
                      <TimetableCard
                        title="外回り"
                        koreanTitle="외선순환"
                        toward={direction?.outer ?? "池袋・上野方面"}
                        arrow="→"
                        side="right"
                        trains={timetable.directions.outerLoop}
                      />
                    </div>
                  </section>

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
                    <InfoIcon className="mt-0.5 h-7 w-7 shrink-0 text-[#74b500]" />

                    <p>
                      표시된 시간은 ODPT 역 시간표를 기준으로 계산한 예정 출발
                      시간입니다.
                      <br className="hidden sm:block" />
                      실제 열차의 도착·출발 시각은 운행 상황에 따라 달라질 수
                      있습니다.
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
   DIRECTION SECTION
====================================================== */

interface TimetableCardProps {
  title: string;
  koreanTitle: string;
  toward: string;
  arrow: "→" | "←";
  side: "left" | "right";
  trains: {
    trainNumber: string;
    departureTime: string;
    minutesUntilDeparture: number;
  }[];
}

function TimetableCard({
  title,
  koreanTitle,
  toward,
  arrow,
  side,
  trains,
}: TimetableCardProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div
        className={`flex items-center border-b border-zinc-200 bg-[#fbfcf8] px-5 py-4 ${
          side === "right" ? "justify-end" : "justify-start"
        }`}
      >
        {side === "left" ? (
          <div className="flex min-w-0 items-center gap-3">
            <span
              className="h-4 w-4 shrink-0 rounded-full"
              style={{ backgroundColor: YAMANOTE_GREEN }}
            />
            <span className="text-lg font-black text-zinc-700">{arrow}</span>
            <div
              className={`min-w-0 ${side === "right" ? "text-right" : "text-left"}`}
            >
              <div
                className={`flex flex-wrap items-baseline gap-x-2 ${
                  side === "right" ? "justify-end" : "justify-start"
                }`}
              >
                <p className="text-lg font-black text-zinc-950">{title}</p>
                <span className="text-xs font-medium text-zinc-500">
                  {koreanTitle}
                </span>
              </div>
              <p className="mt-0.5 truncate text-xs font-medium text-zinc-500">
                {toward}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={`min-w-0 ${side === "right" ? "text-right" : "text-left"}`}
            >
              <div
                className={`flex flex-wrap items-baseline gap-x-2 ${
                  side === "right" ? "justify-end" : "justify-start"
                }`}
              >
                <p className="text-lg font-black text-zinc-950">{title}</p>
                <span className="text-xs font-medium text-zinc-500">
                  {koreanTitle}
                </span>
              </div>
              <p className="mt-0.5 truncate text-xs font-medium text-zinc-500">
                {toward}
              </p>
            </div>
            <span className="text-lg font-black text-zinc-700">{arrow}</span>
            <span
              className="h-4 w-4 shrink-0 rounded-full"
              style={{ backgroundColor: YAMANOTE_GREEN }}
            />
          </div>
        )}
      </div>

      {trains.length === 0 ? (
        <div className="px-5 py-6 text-sm text-zinc-500">
          현재 표시할 다음 열차가 없습니다.
        </div>
      ) : (
        <div>
          {trains.map((train, index) => (
            <div
              key={`${train.trainNumber}-${train.departureTime}`}
              className={`flex items-center justify-between gap-4 px-5 py-4 ${
                index !== trains.length - 1 ? "border-b border-zinc-100" : ""
              }`}
            >
              <div className="min-w-0">
                <p className="text-xl font-black tabular-nums text-zinc-950">
                  {train.departureTime}
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  {train.trainNumber}
                </p>
              </div>
              <p className="shrink-0 text-base font-black text-zinc-950">
                {train.minutesUntilDeparture <= 0
                  ? "곧 출발"
                  : `${train.minutesUntilDeparture}분 후`}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function getStationNumber(code?: string) {
  if (!code) {
    return "--";
  }

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
    Akihabara: "あきはばら",
    Okachimachi: "おかちまち",
    Ueno: "うえの",
    Uguisudani: "うぐいすだに",
    Nippori: "にっぽり",
    NishiNippori: "にしにっぽり",
    Tabata: "たばた",
    Komagome: "こまごめ",
    Sugamo: "すがも",
    Otsuka: "おおつか",
    Ikebukuro: "いけぶくろ",
    Mejiro: "めじろ",
    Takadanobaba: "たかだのばば",
    ShinOkubo: "しんおおくぼ",
    Shinjuku: "しんじゅく",
    Yoyogi: "よよぎ",
    Harajuku: "はらじゅく",
    Shibuya: "しぶや",
    Ebisu: "えびす",
    Meguro: "めぐろ",
    Gotanda: "ごたんだ",
    Osaki: "おおさき",
    Shinagawa: "しながわ",
    TakanawaGateway: "たかなわゲートウェイ",
    Tamachi: "たまち",
    Hamamatsucho: "はままつちょう",
    Shimbashi: "しんばし",
    Yurakucho: "ゆうらくちょう",
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

function CalendarIcon({ className }: IconProps) {
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
      <rect width="18" height="18" x="3" y="4" rx="2" />

      <path d="M16 2v4" />

      <path d="M8 2v4" />

      <path d="M3 10h18" />
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
