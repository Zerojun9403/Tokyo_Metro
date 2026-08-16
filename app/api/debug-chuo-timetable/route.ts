import { NextResponse } from "next/server";

const ODPT_URL = "https://api-challenge.odpt.org/api/v4/odpt:StationTimetable";

export async function GET() {
  try {
    const apiKey = process.env.ODPT_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "ODPT_API_KEY가 설정되지 않았습니다.",
        },
        {
          status: 500,
        },
      );
    }

    const params = new URLSearchParams({
      "odpt:operator": "odpt.Operator:JR-East",

      "odpt:railway": "odpt.Railway:JR-East.ChuoRapid",

      "odpt:station": "odpt.Station:JR-East.ChuoRapid.Shinjuku",

      "acl:consumerKey": apiKey,
    });

    const response = await fetch(`${ODPT_URL}?${params.toString()}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "ODPT API 호출 실패",
          status: response.status,
        },
        {
          status: response.status,
        },
      );
    }

    const data = await response.json();

    /*
     * 원본 전체 데이터를 그대로 보여주면 너무 길기 때문에
     * 시간표별 핵심 정보만 추출한다.
     */
    const result = Array.isArray(data)
      ? data.map((timetable) => ({
          id: timetable["owl:sameAs"],

          railway: timetable["odpt:railway"],

          station: timetable["odpt:station"],

          calendar: timetable["odpt:calendar"],

          railDirection: timetable["odpt:railDirection"],

          destinationStation: timetable["odpt:destinationStation"],

          timetableCount: timetable["odpt:stationTimetableObject"]?.length ?? 0,

          sample: timetable["odpt:stationTimetableObject"]
            ?.slice(0, 5)
            .map((item: Record<string, unknown>) => ({
              departureTime: item["odpt:departureTime"],

              trainNumber: item["odpt:trainNumber"],

              trainType: item["odpt:trainType"],

              destinationStation: item["odpt:destinationStation"],
            })),
        }))
      : data;

    return NextResponse.json({
      railway: "ChuoRapid",
      station: "Shinjuku",

      message: "주오선 쾌속 신주쿠역 StationTimetable 디버그 데이터",

      result,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "주오선 시간표 데이터를 확인하는 중 오류가 발생했습니다.",
      },
      {
        status: 500,
      },
    );
  }
}
