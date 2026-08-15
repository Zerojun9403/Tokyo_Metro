"use client";

import { useState } from "react";

import { StationPanel } from "@/components/station-panel";
import { YAMANOTE_STATIONS } from "@/lib/yamanote";

type Station = (typeof YAMANOTE_STATIONS)[number];

const TRACK_RADIUS_PERCENT = 35;

const MAJOR_STATIONS = new Set([
  "Tokyo",
  "Ueno",
  "Ikebukuro",
  "Shinjuku",
  "Shibuya",
  "Shinagawa",
]);

function getAngle(index: number) {
  return (index / YAMANOTE_STATIONS.length) * Math.PI * 2 - Math.PI / 2;
}

function getPosition(index: number) {
  const angle = getAngle(index);

  return {
    x: 50 + Math.cos(angle) * TRACK_RADIUS_PERCENT,
    y: 50 + Math.sin(angle) * TRACK_RADIUS_PERCENT,
    angle,
  };
}

function getLabelClass(angle: number) {
  const degrees = ((angle * 180) / Math.PI + 360) % 360;

  // Top
  if (degrees >= 250 && degrees <= 290) {
    return "bottom-7 left-1/2 -translate-x-1/2 text-center";
  }

  // Bottom
  if (degrees >= 70 && degrees <= 110) {
    return "left-1/2 top-7 -translate-x-1/2 text-center";
  }

  // Left
  if (degrees > 110 && degrees < 250) {
    return "right-7 top-1/2 -translate-y-1/2 text-right";
  }

  // Right
  return "left-7 top-1/2 -translate-y-1/2 text-left";
}

export function YamanoteMap() {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [stationPanelOpen, setStationPanelOpen] = useState(false);

  const handleStationClick = (station: Station) => {
    setSelectedStation(station);
    setStationPanelOpen(true);
  };

  return (
    <>
      <div className="w-full overflow-hidden px-1 py-2 sm:px-4 sm:py-4">
        <div className="relative mx-auto aspect-square w-full max-w-[1000px]">
          {/* Perfect circular Yamanote track */}
          <div
            className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border-[5px] sm:border-[8px] lg:border-[12px]
              border-[#8fc31f]
            "
            style={{
              width: "70%",
              height: "70%",
            }}
          />

          {/* Center */}
          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              flex
              -translate-x-1/2
              -translate-y-1/2
              flex-col
              items-center
              text-center
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                sm:h-14
                sm:w-14
                lg:h-20
                lg:w-20
                items-center
                justify-center
                rounded-full
                bg-[#8fc31f]
                text-sm
                font-black
                sm:text-lg
                lg:text-2xl
                text-white
                shadow-sm
              "
            >
              JY
            </div>

            <h2
              className="
                mt-2
                text-base
                sm:mt-3
                sm:text-xl
                lg:mt-5
                lg:text-3xl
                font-black
                tracking-tight
                [font-family:var(--font-noto-jp),var(--font-noto-kr),sans-serif]
              "
            >
              山手線
            </h2>

            <p className="mt-0.5 whitespace-nowrap text-[9px] font-semibold text-muted-foreground sm:text-xs lg:text-sm">
              Yamanote Line
            </p>

            <div
              className="
                mt-5
                rounded-full
                border
                bg-background
                px-4
                py-2
                text-sm
                font-bold
                shadow-sm
              "
            >
              30 Stations
            </div>

            <p className="mt-2 hidden text-xs font-medium text-muted-foreground md:block lg:mt-5">
              역을 클릭하면 다음 열차와 환승 정보를 확인할 수 있습니다.
            </p>
          </div>

          {/* Stations */}
          {YAMANOTE_STATIONS.map((station, index) => {
            const position = getPosition(index);
            const labelClass = getLabelClass(position.angle);
            const isMajor = MAJOR_STATIONS.has(station.id);

            return (
              <button
                key={station.id}
                type="button"
                aria-label={`${station.ja}역 정보 보기`}
                onClick={() => handleStationClick(station)}
                className="
                  group
                  absolute
                  z-30
                  -translate-x-1/2
                  -translate-y-1/2
                  cursor-pointer
                  rounded-full
                  outline-none
                  focus-visible:ring-4
                  focus-visible:ring-[#8fc31f]/25
                "
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                }}
              >
                <span
                  aria-hidden="true"
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    h-11
                    w-11
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                  "
                />

                {/* Station dot */}
                <span
                  className="
                    relative
                    block
                    h-[5px]
                    w-[5px]
                    sm:h-[6px]
                    sm:w-[6px]
                    md:h-[7px]
                    md:w-[7px]
                    rounded-full
                    bg-white
                    ring-[2px]
                    ring-[#8fc31f]
                    transition-transform
                    duration-150
                    group-hover:scale-150
                  "
                />

                {/* Japanese / English / Korean */}
                <span
                  className={`
                    absolute
                    w-[76px] sm:w-[110px] md:w-[140px] lg:w-[180px]
                    select-none
                    ${labelClass}
                  `}
                >
                  <span
                    lang="ja"
                    className={`
                      block
                      whitespace-nowrap
                      leading-[1.15]
                      text-zinc-950
                      [font-family:var(--font-noto-jp),var(--font-noto-kr),sans-serif]
                      ${isMajor ? "text-[7px] font-black sm:text-[10px] md:text-[13px] lg:text-[16px]" : "text-[6px] font-bold sm:text-[9px] md:text-[11px] lg:text-[14px]"}
                    `}
                  >
                    {station.ja}
                  </span>

                  <span
                    lang="en"
                    className={`
                      mt-0.5
                      hidden
                      whitespace-nowrap
                      sm:block
                      leading-[1.1]
                      text-zinc-500
                      [font-family:var(--font-noto-kr),var(--font-noto-jp),sans-serif]
                      ${isMajor ? "sm:text-[7px] sm:font-semibold md:text-[9px] lg:text-[11px]" : "sm:text-[6px] sm:font-medium md:text-[8px] lg:text-[10px]"}
                    `}
                  >
                    {station.en}
                  </span>

                  <span
                    lang="ko"
                    className={`
                      mt-0.5
                      hidden
                      whitespace-nowrap
                      md:block
                      leading-[1.15]
                      text-zinc-400
                      [font-family:var(--font-noto-kr),var(--font-noto-jp),sans-serif]
                      ${isMajor ? "md:text-[8px] md:font-semibold lg:text-[11px]" : "md:text-[7px] md:font-medium lg:text-[10px]"}
                    `}
                  >
                    {station.ko}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <StationPanel
        station={selectedStation}
        open={stationPanelOpen}
        onOpenChange={setStationPanelOpen}
      />
    </>
  );
}
