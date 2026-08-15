"use client";

import { useState } from "react";

import { ChuoStationPanel } from "@/components/chuo-station-panel";
import {
  CHUO_RAPID_COLOR,
  CHUO_RAPID_STATIONS,
  type ChuoRapidStation,
} from "@/lib/chuo-rapid";

const ChuoRapidMap = () => {
  const [selectedStation, setSelectedStation] =
    useState<ChuoRapidStation | null>(null);

  const [panelOpen, setPanelOpen] = useState(false);

  const handleStationClick = (station: ChuoRapidStation) => {
    setSelectedStation(station);
    setPanelOpen(true);
  };

  return (
    <>
      <section className="w-full">
        {/* =========================
            PC / Tablet
        ========================== */}

        <div className="hidden md:block">
          <div className="overflow-x-auto pb-6">
            <div className="min-w-[2100px] px-10 py-10">
              <div className="flex items-end">
                {CHUO_RAPID_STATIONS.map((station, index) => {
                  const isFirst = index === 0;
                  const isLast = index === CHUO_RAPID_STATIONS.length - 1;

                  return (
                    <div
                      key={station.id}
                      className="
                        flex
                        w-[84px]
                        shrink-0
                        flex-col
                        items-center
                      "
                    >
                      {/* Station names */}

                      <button
                        type="button"
                        onClick={() => handleStationClick(station)}
                        className="
                          mb-4
                          flex
                          min-h-[88px]
                          w-full
                          flex-col
                          items-center
                          justify-end
                          rounded-xl
                          px-1
                          text-center
                          transition-colors
                          hover:bg-zinc-100
                        "
                      >
                        <span
                          lang="ja"
                          className="
                            whitespace-nowrap
                            text-sm
                            font-black
                            text-zinc-950
                          "
                        >
                          {station.ja}
                        </span>

                        <span
                          lang="ko"
                          className="
                            mt-1
                            whitespace-nowrap
                            text-[11px]
                            font-semibold
                            text-zinc-500
                          "
                        >
                          {station.ko}
                        </span>

                        <span
                          lang="en"
                          className="
                            mt-0.5
                            whitespace-nowrap
                            text-[9px]
                            text-zinc-400
                          "
                        >
                          {station.en}
                        </span>
                      </button>

                      {/* =========================
                          RAILWAY
                      ========================== */}

                      <div className="relative flex w-full items-center justify-center">
                        {/* Left line */}

                        {!isFirst && (
                          <div
                            className="
                              absolute
                              left-0
                              top-1/2
                              h-[6px]
                              w-1/2
                              -translate-y-1/2
                            "
                            style={{
                              backgroundColor: CHUO_RAPID_COLOR,
                            }}
                          />
                        )}

                        {/* Right line */}

                        {!isLast && (
                          <div
                            className="
                              absolute
                              right-0
                              top-1/2
                              h-[6px]
                              w-1/2
                              -translate-y-1/2
                            "
                            style={{
                              backgroundColor: CHUO_RAPID_COLOR,
                            }}
                          />
                        )}

                        {/* Station dot */}

                        <button
                          type="button"
                          onClick={() => handleStationClick(station)}
                          aria-label={`${station.ko}역 정보 보기`}
                          className="
                            relative
                            z-10
                            h-5
                            w-5
                            cursor-pointer
                            rounded-full
                            border-[4px]
                            bg-white
                            shadow-sm
                            transition-all
                            duration-150

                            hover:scale-125
                            hover:shadow-md

                            focus:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-orange-400
                            focus-visible:ring-offset-2
                          "
                          style={{
                            borderColor: CHUO_RAPID_COLOR,
                          }}
                        />
                      </div>

                      {/* Station code */}

                      <button
                        type="button"
                        onClick={() => handleStationClick(station)}
                        className="
                          mt-4
                          flex
                          h-10
                          min-w-10
                          items-center
                          justify-center
                          rounded-full
                          border-[3px]
                          bg-white
                          px-2
                          text-[10px]
                          font-black
                          text-zinc-900
                          transition-all

                          hover:-translate-y-0.5
                          hover:shadow-md
                        "
                        style={{
                          borderColor: CHUO_RAPID_COLOR,
                        }}
                        aria-label={`${station.code} ${station.ko}역 정보 보기`}
                      >
                        {station.code}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <p className="mt-2 text-center text-xs font-medium text-zinc-400">
            좌우로 스크롤하여 전체 노선을 확인할 수 있습니다. 역을 선택하면 상세
            정보를 확인할 수 있습니다.
          </p>
        </div>

        {/* =========================
            MOBILE
        ========================== */}

        <div className="md:hidden">
          <div className="mx-auto max-w-md px-3 py-4">
            {CHUO_RAPID_STATIONS.map((station, index) => {
              const isLast = index === CHUO_RAPID_STATIONS.length - 1;

              return (
                <div key={station.id} className="relative flex min-h-[92px]">
                  {/* =========================
                      RAILWAY
                  ========================== */}

                  <div className="relative flex w-14 shrink-0 justify-center">
                    {!isLast && (
                      <div
                        className="
                          absolute
                          left-1/2
                          top-7
                          h-full
                          w-[5px]
                          -translate-x-1/2
                        "
                        style={{
                          backgroundColor: CHUO_RAPID_COLOR,
                        }}
                      />
                    )}

                    {/* Station dot */}

                    <button
                      type="button"
                      onClick={() => handleStationClick(station)}
                      aria-label={`${station.ko}역 정보 보기`}
                      className="
                        relative
                        z-10
                        mt-3
                        h-6
                        w-6
                        cursor-pointer
                        rounded-full
                        border-[5px]
                        bg-white
                        shadow-sm
                        transition-transform

                        active:scale-90

                        focus:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-orange-400
                        focus-visible:ring-offset-2
                      "
                      style={{
                        borderColor: CHUO_RAPID_COLOR,
                      }}
                    />
                  </div>

                  {/* =========================
                      STATION INFORMATION
                  ========================== */}

                  <div className="flex flex-1 items-start gap-3 pb-7 pt-1">
                    {/* Code */}

                    <button
                      type="button"
                      onClick={() => handleStationClick(station)}
                      className="
                        mt-1
                        flex
                        h-11
                        min-w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border-[3px]
                        bg-white
                        px-2
                        text-[10px]
                        font-black
                        text-zinc-950
                        transition-transform

                        active:scale-95
                      "
                      style={{
                        borderColor: CHUO_RAPID_COLOR,
                      }}
                      aria-label={`${station.code} ${station.ko}역 정보 보기`}
                    >
                      {station.code}
                    </button>

                    {/* Names */}

                    <button
                      type="button"
                      onClick={() => handleStationClick(station)}
                      className="
                        flex
                        min-w-0
                        flex-1
                        flex-col
                        items-start
                        rounded-xl
                        px-2
                        py-1
                        text-left
                        transition-colors

                        active:bg-zinc-100
                      "
                    >
                      <span
                        lang="ja"
                        className="
                          text-lg
                          font-black
                          tracking-tight
                          text-zinc-950
                        "
                      >
                        {station.ja}
                      </span>

                      <span
                        lang="ko"
                        className="
                          mt-0.5
                          text-sm
                          font-bold
                          text-zinc-600
                        "
                      >
                        {station.ko}
                      </span>

                      <span
                        lang="en"
                        className="
                          mt-0.5
                          text-xs
                          font-medium
                          text-zinc-400
                        "
                      >
                        {station.en}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================
          STATION PANEL
      ========================== */}

      <ChuoStationPanel
        station={selectedStation}
        open={panelOpen}
        onOpenChange={setPanelOpen}
      />
    </>
  );
};

export { ChuoRapidMap };
