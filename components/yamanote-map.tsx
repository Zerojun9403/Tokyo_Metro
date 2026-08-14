"use client";

import { useState } from "react";

import { StationPanel } from "@/components/station-panel";
import { YAMANOTE_STATIONS } from "@/lib/yamanote";

import type { OdptTrain } from "@/types/train";

interface YamanoteMapProps {
  trains: OdptTrain[];
}

type Station = (typeof YAMANOTE_STATIONS)[number];

const MAP_SIZE = 1000;
const TRACK_RADIUS = 350;

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
    x: MAP_SIZE / 2 + Math.cos(angle) * TRACK_RADIUS,
    y: MAP_SIZE / 2 + Math.sin(angle) * TRACK_RADIUS,
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

export function YamanoteMap({ trains: _trains }: YamanoteMapProps) {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [stationPanelOpen, setStationPanelOpen] = useState(false);

  const handleStationClick = (station: Station) => {
    setSelectedStation(station);
    setStationPanelOpen(true);
  };

  return (
    <>
      <div className="w-full overflow-hidden px-2 sm:px-4">
        <div className="h-[360px] min-[400px]:h-[390px] min-[480px]:h-[460px] sm:h-[620px] md:h-[750px] lg:h-[900px] xl:h-[1000px]">
          <div
            className="relative mx-auto shrink-0 origin-top scale-[0.36] min-[400px]:scale-[0.39] min-[480px]:scale-[0.46] sm:scale-[0.62] md:scale-[0.75] lg:scale-[0.9] xl:scale-100"
            style={{
              width: MAP_SIZE,
              height: MAP_SIZE,
            }}
          >
            {/* Perfect circular Yamanote track */}
            <div
              className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border-[12px]
              border-[#8fc31f]
            "
              style={{
                width: TRACK_RADIUS * 2,
                height: TRACK_RADIUS * 2,
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
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-[#8fc31f]
                text-2xl
                font-black
                text-white
                shadow-sm
              "
              >
                JY
              </div>

              <h2
                className="
                mt-5
                text-3xl
                font-black
                tracking-tight
                [font-family:var(--font-noto-jp),var(--font-noto-kr),sans-serif]
              "
              >
                山手線
              </h2>

              <p className="mt-1 text-sm font-semibold text-muted-foreground">
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

              <p className="mt-5 text-xs font-medium text-muted-foreground">
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
                    left: position.x,
                    top: position.y,
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
                    h-[7px]
                    w-[7px]
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
                    w-[180px]
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
                      ${isMajor ? "text-[16px] font-black" : "text-[14px] font-bold"}
                    `}
                    >
                      {station.ja}
                    </span>

                    <span
                      lang="en"
                      className={`
                      mt-1
                      block
                      whitespace-nowrap
                      leading-[1.1]
                      text-zinc-500
                      [font-family:var(--font-noto-kr),var(--font-noto-jp),sans-serif]
                      ${isMajor ? "text-[11px] font-semibold" : "text-[10px] font-medium"}
                    `}
                    >
                      {station.en}
                    </span>

                    <span
                      lang="ko"
                      className={`
                      mt-1
                      block
                      whitespace-nowrap
                      leading-[1.15]
                      text-zinc-400
                      [font-family:var(--font-noto-kr),var(--font-noto-jp),sans-serif]
                      ${isMajor ? "text-[11px] font-semibold" : "text-[10px] font-medium"}
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
      </div>

      <StationPanel
        station={selectedStation}
        open={stationPanelOpen}
        onOpenChange={setStationPanelOpen}
      />
    </>
  );
}
