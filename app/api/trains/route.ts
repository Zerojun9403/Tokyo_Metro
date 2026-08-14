import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.ODPT_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "ODPT_API_KEY가 설정되지 않았습니다." },
      { status: 500 },
    );
  }

  const params = new URLSearchParams({
    "odpt:operator": "odpt.Operator:JR-East",
    "acl:consumerKey": apiKey,
  });

  const response = await fetch(
    `https://api-challenge.odpt.org/api/v4/odpt:Train?${params.toString()}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return NextResponse.json(
      {
        error: "ODPT API 호출 실패",
        status: response.status,
      },
      { status: response.status },
    );
  }

  const data = await response.json();

  const yamanoteTrains = data.filter(
    (train: { "odpt:railway"?: string }) =>
      train["odpt:railway"] === "odpt.Railway:JR-East.Yamanote",
  );

  return NextResponse.json({
    updatedAt: new Date().toISOString(),
    count: yamanoteTrains.length,
    trains: yamanoteTrains,
  });
}
