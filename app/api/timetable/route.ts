import { NextRequest, NextResponse } from "next/server";

import type { NextTrain, StationTimetable } from "@/types/timetable";

const ODPT_URL = "https://api-challenge.odpt.org/api/v4/odpt:StationTimetable";

type RailwayKey = "Yamanote" | "ChuoRapid" | "ChuoSobuLocal";

type NextTrainWithDestination = NextTrain & {
  destination?: string;
};

function getJapanNow() {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    weekday: "short",
  });

  const parts = formatter.formatToParts(new Date());

  const getPart = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return {
    year: Number(getPart("year")),
    month: Number(getPart("month")),
    day: Number(getPart("day")),
    hour: Number(getPart("hour")),
    minute: Number(getPart("minute")),
    weekday: getPart("weekday"),
  };
}

function getCalendar(weekday: string): "Weekday" | "SaturdayHoliday" {
  return weekday === "Sat" || weekday === "Sun" ? "SaturdayHoliday" : "Weekday";
}

function getMinutesUntilDeparture(
  departureTime: string,
  currentHour: number,
  currentMinute: number,
) {
  const [hourString, minuteString] = departureTime.split(":");

  const departureHour = Number(hourString);
  const departureMinute = Number(minuteString);

  const nowMinutes = currentHour * 60 + currentMinute;
  const departureMinutes = departureHour * 60 + departureMinute;

  return departureMinutes - nowMinutes;
}

function parseDestination(value: unknown): string | undefined {
  if (!Array.isArray(value) || typeof value[0] !== "string") {
    return undefined;
  }

  return value[0].split(".").at(-1);
}

function getNextTrains(
  timetable: StationTimetable | undefined,
  currentHour: number,
  currentMinute: number,
  includeDestination = false,
): NextTrainWithDestination[] {
  if (!timetable) {
    return [];
  }

  return timetable["odpt:stationTimetableObject"]
    .map((item) => {
      const minutesUntilDeparture = getMinutesUntilDeparture(
        item["odpt:departureTime"],
        currentHour,
        currentMinute,
      );

      const train: NextTrainWithDestination = {
        trainNumber: item["odpt:trainNumber"],
        departureTime: item["odpt:departureTime"],
        minutesUntilDeparture,
      };

      if (includeDestination) {
        const destination = parseDestination(
          (
            item as typeof item & {
              "odpt:destinationStation"?: unknown;
            }
          )["odpt:destinationStation"],
        );

        if (destination) {
          train.destination = destination;
        }
      }

      return train;
    })
    .filter((train) => train.minutesUntilDeparture >= 0)
    .sort((a, b) => a.minutesUntilDeparture - b.minutesUntilDeparture)
    .slice(0, 3);
}

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.ODPT_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "ODPT_API_KEY가 설정되지 않았습니다." },
        { status: 500 },
      );
    }

    const station = request.nextUrl.searchParams.get("station");
    const railway = request.nextUrl.searchParams.get("railway") ?? "Yamanote";

    if (!station) {
      return NextResponse.json(
        { error: "station 값이 필요합니다." },
        { status: 400 },
      );
    }

    const supportedRailways = {
      Yamanote: {
        railwayId: "JR-East.Yamanote",
        firstDirection: "odpt.RailDirection:InnerLoop",
        secondDirection: "odpt.RailDirection:OuterLoop",
      },
      ChuoRapid: {
        railwayId: "JR-East.ChuoRapid",
        firstDirection: "odpt.RailDirection:Inbound",
        secondDirection: "odpt.RailDirection:Outbound",
      },
      ChuoSobuLocal: {
        railwayId: "JR-East.ChuoSobuLocal",
        firstDirection: "odpt.RailDirection:Eastbound",
        secondDirection: "odpt.RailDirection:Westbound",
      },
    } as const;

    const config = supportedRailways[railway as RailwayKey];

    if (!config) {
      return NextResponse.json(
        {
          error: "지원하지 않는 노선입니다.",
          supportedRailways: Object.keys(supportedRailways),
        },
        { status: 400 },
      );
    }

    const now = getJapanNow();
    const calendar = getCalendar(now.weekday);

    const params = new URLSearchParams({
      "odpt:operator": "odpt.Operator:JR-East",
      "odpt:railway": `odpt.Railway:${config.railwayId}`,
      "odpt:station": `odpt.Station:${config.railwayId}.${station}`,
      "acl:consumerKey": apiKey,
    });

    const response = await fetch(`${ODPT_URL}?${params.toString()}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "ODPT 시간표 호출에 실패했습니다.",
          status: response.status,
        },
        { status: response.status },
      );
    }

    const data = (await response.json()) as StationTimetable[];

    const todayData = data.filter(
      (timetable) => timetable["odpt:calendar"] === `odpt.Calendar:${calendar}`,
    );

    const first = todayData.find(
      (timetable) => timetable["odpt:railDirection"] === config.firstDirection,
    );

    const second = todayData.find(
      (timetable) => timetable["odpt:railDirection"] === config.secondDirection,
    );

    if (railway === "ChuoRapid") {
      return NextResponse.json({
        station,
        railway,
        calendar,
        updatedAt: new Date().toISOString(),
        directions: {
          inbound: getNextTrains(first, now.hour, now.minute),
          outbound: getNextTrains(second, now.hour, now.minute),
        },
      });
    }

    if (railway === "ChuoSobuLocal") {
      return NextResponse.json({
        station,
        railway,
        calendar,
        updatedAt: new Date().toISOString(),
        directions: {
          eastbound: getNextTrains(first, now.hour, now.minute, true),
          westbound: getNextTrains(second, now.hour, now.minute, true),
        },
      });
    }

    return NextResponse.json({
      station,
      railway,
      calendar,
      updatedAt: new Date().toISOString(),
      directions: {
        innerLoop: getNextTrains(first, now.hour, now.minute),
        outerLoop: getNextTrains(second, now.hour, now.minute),
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "시간표 데이터를 처리하는 중 오류가 발생했습니다.",
      },
      { status: 500 },
    );
  }
}
