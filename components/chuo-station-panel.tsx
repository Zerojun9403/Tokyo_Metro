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

interface NextTrain {
  trainNumber: string;
  departureTime: string;
  minutesUntilDeparture: number;
}

interface ChuoTimetableApiResponse {
  station: string;
  railway: "ChuoRapid";
  calendar: "Weekday" | "SaturdayHoliday";
  updatedAt: string;
  directions: {
    inbound: NextTrain[];
    outbound: NextTrain[];
  };
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
  const [timetable, setTimetable] = useState<ChuoTimetableApiResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!station || !open) return;

    const fetchStationData = async () => {
      try {
        setLoading(true);
        setError(null);
        setStationInfo(null);
        setTimetable(null);

        const [stationResponse, timetableResponse] = await Promise.all([
          fetch(
            `/api/station?railway=ChuoRapid&station=${encodeURIComponent(
              station.id,
            )}`,
            { cache: "no-store" },
          ),
          fetch(
            `/api/timetable?railway=ChuoRapid&station=${encodeURIComponent(
              station.id,
            )}`,
            { cache: "no-store" },
          ),
        ]);

        if (!stationResponse.ok) {
          throw new Error("역 정보를 불러오지 못했습니다.");
        }

        if (!timetableResponse.ok) {
          throw new Error("시간표 정보를 불러오지 못했습니다.");
        }

        const stationData: StationApiResponse = await stationResponse.json();
        const timetableData: ChuoTimetableApiResponse =
          await timetableResponse.json();

        setStationInfo(stationData);
        setTimetable(timetableData);
      } catch (error) {
        console.error(error);
        setError(
          error instanceof Error
            ? error.message
            : "역 정보를 불러오지 못했습니다.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStationData();
  }, [station, open]);

  const currentTime = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className="
          w-screen max-w-none overflow-x-hidden overflow-y-auto
          border-l bg-[#fcfcfb] p-0
          sm:w-[92vw] sm:max-w-[720px]
          md:w-[760px] md:max-w-none
          lg:w-[820px] lg:max-w-none
          xl:w-[880px] xl:max-w-none
        "
      >
        {station && (
          <>
            <SheetHeader className="border-b bg-white px-4 py-5 pr-12 sm:px-8 sm:py-7">
              <div className="flex items-center gap-4 sm:gap-5">
                <div
                  className="
                    flex h-[66px] w-[66px] shrink-0 flex-col
                    items-center justify-center rounded-full border-[6px]
                    bg-white text-black shadow-sm
                    sm:h-[82px] sm:w-[82px]
                  "
                  style={{ borderColor: CHUO_ORANGE }}
                >
                  <span className="text-sm font-extrabold leading-none">
                    JC
                  </span>
                  <span className="mt-1 text-2xl font-black leading-none">
                    {getStationNumber(station.code)}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                    <SheetTitle
                      lang="ja"
                      className="break-keep text-2xl font-black tracking-tight sm:text-[34px]"
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

            <div className="space-y-5 px-4 py-5 sm:space-y-6 sm:px-8 sm:py-7">
              {loading && (
                <div className="flex min-h-[400px] flex-col items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F15A22]/10">
                    <TrainIcon className="h-8 w-8 text-[#F15A22]" />
                  </div>
                  <p className="mt-5 text-sm font-medium text-zinc-500">
                    역 정보와 시간표를 불러오는 중...
                  </p>
                </div>
              )}

              {!loading && error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
                  {error}
                </div>
              )}

              {!loading && !error && stationInfo && timetable && (
                <>
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
                              group flex min-w-0 items-center gap-4 rounded-2xl
                              border border-zinc-200 bg-white px-4 py-3
                              shadow-[0_2px_8px_rgba(0,0,0,0.05)]
                              transition-all hover:-translate-y-0.5 hover:shadow-md
                            "
                          >
                            <div
                              className="
                                flex h-11 w-11 shrink-0 items-center justify-center
                                rounded-xl text-sm font-black text-white shadow-sm
                              "
                              style={{ backgroundColor: railway.color }}
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

                  <section
                    className="
                      flex items-center justify-between gap-4 rounded-3xl
                      bg-zinc-100/80 px-5 py-5 sm:px-6
                    "
                  >
                    <div className="flex items-center gap-4">
                      <CalendarIcon className="h-8 w-8 text-[#F15A22]" />
                      <div>
                        <p className="text-sm text-zinc-500">
                          오늘의 운행 시간표
                        </p>
                        <p className="mt-1 text-lg font-black">
                          {timetable.calendar === "Weekday"
                            ? "평일"
                            : "토요일 · 휴일"}
                        </p>
                      </div>
                    </div>

                    <div
                      className="
                        hidden items-center gap-2 rounded-full bg-[#F15A22]/10
                        px-4 py-2 text-sm font-bold text-[#D94B18] sm:flex
                      "
                    >
                      <span className="h-3 w-3 rounded-full bg-[#F15A22]" />
                      기준 시간 {currentTime}
                    </div>
                  </section>

                  <DirectionSection
                    title="東京方面"
                    korean="도쿄 방면"
                    arrow="←"
                    trains={timetable.directions.inbound}
                  />

                  <DirectionSection
                    title="高尾方面"
                    korean="다카오 방면"
                    arrow="→"
                    trains={timetable.directions.outbound}
                  />

                  <section
                    className="
                      flex gap-4 rounded-3xl bg-zinc-100/70 px-5 py-5
                      text-sm leading-6 text-zinc-600
                    "
                  >
                    <InfoIcon className="mt-0.5 h-7 w-7 shrink-0 text-[#F15A22]" />
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

interface DirectionSectionProps {
  title: string;
  korean: string;
  arrow: "←" | "→";
  trains: NextTrain[];
}

function DirectionSection({
  title,
  korean,
  arrow,
  trains,
}: DirectionSectionProps) {
  return (
    <section className="rounded-3xl bg-[#fffaf7] p-4 sm:p-5">
      <div className="mb-5">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="h-5 w-5 rounded-full"
            style={{ backgroundColor: CHUO_ORANGE }}
          />
          <h2 className="text-xl font-black sm:text-2xl">{title}</h2>
          <span className="text-sm text-zinc-500">{korean}</span>
        </div>

        <div className="ml-7 mt-3 flex items-center gap-3">
          <span className="text-xl font-black text-[#F15A22]">{arrow}</span>
          <span className="text-sm font-bold text-zinc-700 sm:text-base">
            {title}
          </span>
        </div>
      </div>

      {trains.length === 0 ? (
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-sm text-zinc-500">
          현재 표시할 다음 열차가 없습니다.
        </div>
      ) : (
        <div
          className="
            overflow-hidden rounded-2xl border border-zinc-200 bg-white
            shadow-[0_3px_12px_rgba(0,0,0,0.04)]
          "
        >
          {trains.map((train, index) => {
            const isLeaving = train.minutesUntilDeparture <= 0;

            return (
              <div
                key={`${train.trainNumber}-${train.departureTime}`}
                className={`
                  flex items-center justify-between gap-4 px-4 py-4 sm:px-6
                  ${
                    index !== trains.length - 1
                      ? "border-b border-zinc-200"
                      : ""
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="
                      flex h-10 w-10 shrink-0 items-center justify-center
                      rounded-full text-white shadow-sm sm:h-12 sm:w-12
                    "
                    style={{ backgroundColor: CHUO_ORANGE }}
                  >
                    <TrainIcon className="h-6 w-6" />
                  </div>

                  <div>
                    <p className="text-xl font-black tabular-nums tracking-tight sm:text-2xl">
                      {train.departureTime}
                    </p>
                    <p className="mt-0.5 text-sm text-zinc-500">
                      {train.trainNumber}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  {isLeaving ? (
                    <>
                      <p className="text-xl font-black text-[#E4511E]">
                        곧 출발
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">출발 예정</p>
                    </>
                  ) : (
                    <>
                      <p className="text-lg font-black tabular-nums sm:text-2xl">
                        약 {train.minutesUntilDeparture}분
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">후 출발</p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

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
