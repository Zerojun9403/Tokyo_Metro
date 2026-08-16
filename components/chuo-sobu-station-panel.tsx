"use client";

import Link from "next/link";
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

interface ChuoSobuStationPanelProps {
  station: Station | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface NextTrain {
  trainNumber: string;
  departureTime: string;
  minutesUntilDeparture: number;
  destination?: string;
}

interface ChuoSobuTimetableResponse {
  station: string;
  railway: "ChuoSobuLocal";
  calendar: "Weekday" | "SaturdayHoliday";
  updatedAt: string;
  directions: {
    eastbound: NextTrain[];
    westbound: NextTrain[];
  };
}

const CHUO_SOBU_COLOR = "#FFD400";

export function ChuoSobuStationPanel({
  station,
  open,
  onOpenChange,
}: ChuoSobuStationPanelProps) {
  const [stationInfo, setStationInfo] = useState<StationApiResponse | null>(
    null,
  );
  const [timetable, setTimetable] = useState<ChuoSobuTimetableResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!station || !open) return;

    const fetchStationInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        setStationInfo(null);
        setTimetable(null);

        const [stationResponse, timetableResponse] = await Promise.all([
          fetch(
            `/api/station?railway=ChuoSobuLocal&station=${encodeURIComponent(
              station.id,
            )}`,
            { cache: "no-store" },
          ),
          fetch(
            `/api/timetable?railway=ChuoSobuLocal&station=${encodeURIComponent(
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
        const timetableData: ChuoSobuTimetableResponse =
          await timetableResponse.json();

        setStationInfo(stationData);
        setTimetable(timetableData);
      } catch (error) {
        console.error(error);

        setError(
          error instanceof Error
            ? error.message
            : "역 정보와 시간표를 불러오지 못했습니다.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStationInfo();
  }, [station, open]);

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
                  style={{ borderColor: CHUO_SOBU_COLOR }}
                >
                  <span className="text-sm font-extrabold leading-none">
                    JB
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

            <div className="space-y-6 px-4 py-5 sm:px-8 sm:py-7">
              {loading && (
                <div className="flex min-h-[360px] flex-col items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
                    <TrainIcon className="h-8 w-8 text-yellow-600" />
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
                      <TrainIcon className="h-6 w-6 text-yellow-600" />

                      <h2 className="text-xl font-black">환승 노선</h2>

                      <span className="text-sm text-zinc-500">
                        この駅で乗り換え
                      </span>
                    </div>

                    {stationInfo.connectingRailways.length > 0 ? (
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {stationInfo.connectingRailways.map((railway) => {
                          const href = getRailwayHref(
                            railway.operator,
                            railway.railway,
                          );

                          const cardContent = (
                            <>
                              <div
                                className="
                                  flex h-11 w-11 shrink-0 items-center
                                  justify-center rounded-xl text-sm font-black
                                  text-white shadow-sm
                                "
                                style={{
                                  backgroundColor: railway.color,
                                  color:
                                    railway.color.toUpperCase() === "#FFD400"
                                      ? "#18181b"
                                      : "#ffffff",
                                }}
                              >
                                {railway.code ?? "•"}
                              </div>

                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-bold text-zinc-900">
                                  {railway.name}
                                </p>

                                <p className="mt-0.5 truncate text-xs text-zinc-500">
                                  {getOperatorName(railway.operator)}
                                </p>
                              </div>

                              {href && (
                                <span
                                  className="
                                    flex h-8 w-8 shrink-0 items-center
                                    justify-center rounded-full bg-zinc-100
                                    text-lg font-bold text-zinc-600
                                    transition-colors group-hover:bg-zinc-900
                                    group-hover:text-white
                                  "
                                  aria-hidden="true"
                                >
                                  →
                                </span>
                              )}
                            </>
                          );

                          if (href) {
                            return (
                              <Link
                                key={railway.id}
                                href={href}
                                onClick={() => onOpenChange(false)}
                                className="
                                  group flex min-w-0 items-center gap-4 rounded-2xl
                                  border border-zinc-200 bg-white px-4 py-3
                                  shadow-[0_2px_8px_rgba(0,0,0,0.05)]
                                  transition-all hover:-translate-y-0.5
                                  hover:border-zinc-300 hover:shadow-md
                                  focus-visible:outline-none focus-visible:ring-2
                                  focus-visible:ring-yellow-500
                                "
                              >
                                {cardContent}
                              </Link>
                            );
                          }

                          return (
                            <div
                              key={railway.id}
                              className="
                                flex min-w-0 items-center gap-4 rounded-2xl
                                border border-zinc-200 bg-white px-4 py-3
                                shadow-[0_2px_8px_rgba(0,0,0,0.05)]
                              "
                            >
                              {cardContent}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-sm text-zinc-500">
                        환승 가능한 다른 노선이 없습니다.
                      </div>
                    )}
                  </section>

                  <section className="rounded-3xl bg-[#fffdf2] p-5 sm:p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className="
                          flex h-12 w-12 shrink-0 items-center justify-center
                          rounded-full text-sm font-black text-zinc-950
                        "
                        style={{ backgroundColor: CHUO_SOBU_COLOR }}
                      >
                        JB
                      </div>

                      <div>
                        <p className="text-lg font-black">
                          中央・総武線 各駅停車
                        </p>

                        <p className="mt-1 text-sm font-bold text-zinc-700">
                          주오·소부선 각역정차
                        </p>

                        <p className="mt-2 text-xs leading-5 text-zinc-500">
                          미타카(JB01)에서 지바(JB39)까지 운행하는 주오·소부선
                          각역정차 노선입니다.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <TrainIcon className="h-6 w-6 text-yellow-600" />
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
                        title="三鷹方面"
                        koreanTitle="미타카 방면"
                        arrow="←"
                        trains={timetable.directions.westbound}
                      />

                      <TimetableCard
                        title="千葉方面"
                        koreanTitle="지바 방면"
                        arrow="→"
                        trains={timetable.directions.eastbound}
                      />
                    </div>
                  </section>

                  <section
                    className="
                      flex gap-4 rounded-3xl bg-zinc-100/70 px-5 py-5
                      text-sm leading-6 text-zinc-600
                    "
                  >
                    <InfoIcon className="mt-0.5 h-7 w-7 shrink-0 text-yellow-600" />

                    <div>
                      <p>실제 운행 정보와 다를 수 있습니다.</p>
                      <p className="mt-1">
                        JR 동일본의 운행 정보는 약간의 지연이 발생할 수
                        있습니다.
                      </p>
                    </div>
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

interface TimetableCardProps {
  title: string;
  koreanTitle: string;
  arrow: "→" | "←";
  trains: NextTrain[];
}

function TimetableCard({
  title,
  koreanTitle,
  arrow,
  trains,
}: TimetableCardProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-3 border-b border-zinc-200 bg-[#fffdf2] px-5 py-4">
        <span
          className="h-4 w-4 shrink-0 rounded-full"
          style={{ backgroundColor: CHUO_SOBU_COLOR }}
        />
        <span className="text-lg font-black text-zinc-700">{arrow}</span>
        <div>
          <p className="text-lg font-black text-zinc-950">{title}</p>
          <p className="text-xs font-medium text-zinc-500">{koreanTitle}</p>
        </div>
      </div>

      {trains.length === 0 ? (
        <div className="px-5 py-6 text-sm text-zinc-500">
          현재 표시할 다음 열차가 없습니다.
        </div>
      ) : (
        <div>
          {trains.map((train, index) => {
            const destination = getDestinationName(train.destination);

            return (
              <div
                key={`${train.trainNumber}-${train.departureTime}`}
                className={`flex items-center justify-between gap-4 px-5 py-4 ${
                  index !== trains.length - 1 ? "border-b border-zinc-100" : ""
                }`}
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-xl font-black tabular-nums text-zinc-950">
                      {train.departureTime}
                    </span>

                    {destination && (
                      <span className="truncate text-sm font-black text-zinc-800">
                        {destination.ja}行
                      </span>
                    )}
                  </div>

                  <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-500">
                    <span>{train.trainNumber}</span>
                    {destination && <span>{destination.ko}행</span>}
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-base font-black text-zinc-950">
                    {train.minutesUntilDeparture <= 0
                      ? "곧 출발"
                      : `${train.minutesUntilDeparture}분 후`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function getDestinationName(destination?: string) {
  if (!destination) return null;

  const destinations: Record<string, { ja: string; ko: string }> = {
    Chiba: { ja: "千葉", ko: "지바" },
    Tsudanuma: { ja: "津田沼", ko: "쓰다누마" },
    Mitaka: { ja: "三鷹", ko: "미타카" },
    Nakano: { ja: "中野", ko: "나카노" },
    NishiFunabashi: { ja: "西船橋", ko: "니시후나바시" },
  };

  return (
    destinations[destination] ?? {
      ja: destination,
      ko: destination,
    }
  );
}

function getStationNumber(code: string) {
  const number = code.replace(/[^0-9]/g, "");

  return number.padStart(2, "0");
}

function getRailwayHref(operator: string, railway: string): string | null {
  if (operator !== "JR-East") {
    return null;
  }

  const routes: Record<string, string> = {
    Yamanote: "/jr-east/yamanote",
    ChuoRapid: "/jr-east/chuo-rapid",
    ChuoSobuLocal: "/jr-east/chuo-sobu",
  };

  return routes[railway] ?? null;
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
    Mitaka: "みたか",
    Kichijoji: "きちじょうじ",
    NishiOgikubo: "にしおぎくぼ",
    Ogikubo: "おぎくぼ",
    Asagaya: "あさがや",
    Koenji: "こうえんじ",
    Nakano: "なかの",
    HigashiNakano: "ひがしなかの",
    Okubo: "おおくぼ",
    Shinjuku: "しんじゅく",
    Yoyogi: "よよぎ",
    Sendagaya: "せんだがや",
    Shinanomachi: "しなのまち",
    Yotsuya: "よつや",
    Ichigaya: "いちがや",
    Iidabashi: "いいだばし",
    Suidobashi: "すいどうばし",
    Ochanomizu: "おちゃのみず",
    Akihabara: "あきはばら",
    Asakusabashi: "あさくさばし",
    Ryogoku: "りょうごく",
    Kinshicho: "きんしちょう",
    Kameido: "かめいど",
    Hirai: "ひらい",
    ShinKoiwa: "しんこいわ",
    Koiwa: "こいわ",
    Ichikawa: "いちかわ",
    Motoyawata: "もとやわた",
    ShimosaNakayama: "しもうさなかやま",
    NishiFunabashi: "にしふなばし",
    Funabashi: "ふなばし",
    HigashiFunabashi: "ひがしふなばし",
    Tsudanuma: "つだぬま",
    MakuhariHongo: "まくはりほんごう",
    Makuhari: "まくはり",
    ShinKemigawa: "しんけみがわ",
    Inage: "いなげ",
    NishiChiba: "にしちば",
    Chiba: "ちば",
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
