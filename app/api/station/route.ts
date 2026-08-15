import { NextRequest, NextResponse } from "next/server";

import type {
  ConnectingRailway,
  OdptStation,
  StationApiResponse,
} from "@/types/station";

const ODPT_STATION_URL = "https://api-challenge.odpt.org/api/v4/odpt:Station";

/*
 * 환승 여부 자체는 ODPT의
 * odpt:connectingRailway 데이터를 사용한다.
 *
 * 여기서는 ODPT Railway ID를
 * 사용자가 읽기 쉬운 노선명 / 노선기호 / 색상으로
 * 변환한다.
 */
const RAILWAY_INFO: Record<
  string,
  {
    name: string;
    code?: string;
    color: string;
  }
> = {
  // ==========================================
  // JR East
  // ==========================================

  "JR-East.Yamanote": {
    name: "山手線",
    code: "JY",
    color: "#9ACD32",
  },

  "JR-East.KeihinTohokuNegishi": {
    name: "京浜東北・根岸線",
    code: "JK",
    color: "#00B2E5",
  },

  "JR-East.ChuoRapid": {
    name: "中央線快速",
    code: "JC",
    color: "#F15A22",
  },

  "JR-East.ChuoSobuLocal": {
    name: "中央・総武線",
    code: "JB",
    color: "#FFD400",
  },

  "JR-East.SaikyoKawagoe": {
    name: "埼京線",
    code: "JA",
    color: "#00AC9A",
  },

  "JR-East.ShonanShinjuku": {
    name: "湘南新宿ライン",
    code: "JS",
    color: "#E21F26",
  },

  "JR-East.Tokaido": {
    name: "東海道線",
    code: "JT",
    color: "#F68B1E",
  },

  "JR-East.Yokosuka": {
    name: "横須賀線",
    code: "JO",
    color: "#0067C0",
  },

  "JR-East.Utsunomiya": {
    name: "宇都宮線",
    code: "JU",
    color: "#F68B1E",
  },

  "JR-East.Takasaki": {
    name: "高崎線",
    code: "JU",
    color: "#F68B1E",
  },

  "JR-East.Joban": {
    name: "常磐線",
    code: "JJ",
    color: "#00A7A0",
  },

  "JR-East.Keiyo": {
    name: "京葉線",
    code: "JE",
    color: "#C9242F",
  },

  // ==========================================
  // Tokyo Metro
  // ==========================================

  "TokyoMetro.Ginza": {
    name: "東京メトロ銀座線",
    code: "G",
    color: "#FF9500",
  },

  "TokyoMetro.Marunouchi": {
    name: "東京メトロ丸ノ内線",
    code: "M",
    color: "#F62E36",
  },

  "TokyoMetro.Hibiya": {
    name: "東京メトロ日比谷線",
    code: "H",
    color: "#B5B5AC",
  },

  "TokyoMetro.Tozai": {
    name: "東京メトロ東西線",
    code: "T",
    color: "#009BBF",
  },

  "TokyoMetro.Chiyoda": {
    name: "東京メトロ千代田線",
    code: "C",
    color: "#00BB85",
  },

  "TokyoMetro.Yurakucho": {
    name: "東京メトロ有楽町線",
    code: "Y",
    color: "#C1A470",
  },

  "TokyoMetro.Hanzomon": {
    name: "東京メトロ半蔵門線",
    code: "Z",
    color: "#8F76D6",
  },

  "TokyoMetro.Namboku": {
    name: "東京メトロ南北線",
    code: "N",
    color: "#00AC9B",
  },

  "TokyoMetro.Fukutoshin": {
    name: "東京メトロ副都心線",
    code: "F",
    color: "#9C5E31",
  },

  // ==========================================
  // Toei Subway
  // ==========================================

  "Toei.Asakusa": {
    name: "都営浅草線",
    code: "A",
    color: "#E85298",
  },

  "Toei.Mita": {
    name: "都営三田線",
    code: "I",
    color: "#0079C2",
  },

  "Toei.Shinjuku": {
    name: "都営新宿線",
    code: "S",
    color: "#6CBB5A",
  },

  "Toei.Oedo": {
    name: "都営大江戸線",
    code: "E",
    color: "#B6007A",
  },

  // ==========================================
  // Keio
  // ==========================================

  "Keio.Keio": {
    name: "京王線",
    code: "KO",
    color: "#DD0077",
  },

  "Keio.KeioNew": {
    name: "京王新線",
    code: "KO",
    color: "#DD0077",
  },

  "Keio.Inokashira": {
    name: "京王井の頭線",
    code: "IN",
    color: "#000088",
  },

  // ==========================================
  // Odakyu
  // ==========================================

  "Odakyu.Odawara": {
    name: "小田急小田原線",
    code: "OH",
    color: "#2288CC",
  },

  // ==========================================
  // Seibu
  // ==========================================

  "Seibu.Shinjuku": {
    name: "西武新宿線",
    code: "SS",
    color: "#00A6BF",
  },

  "Seibu.Ikebukuro": {
    name: "西武池袋線",
    code: "SI",
    color: "#F58220",
  },

  // ==========================================
  // Tobu
  // ==========================================

  "Tobu.Tojo": {
    name: "東武東上線",
    code: "TJ",
    color: "#004098",
  },

  // ==========================================
  // Tokyu
  // ==========================================

  "Tokyu.Toyoko": {
    name: "東急東横線",
    code: "TY",
    color: "#DA0442",
  },

  "Tokyu.DenEnToshi": {
    name: "東急田園都市線",
    code: "DT",
    color: "#20A288",
  },

  "Tokyu.Meguro": {
    name: "東急目黒線",
    code: "MG",
    color: "#009CD2",
  },

  "Tokyu.Ikegami": {
    name: "東急池上線",
    code: "IK",
    color: "#EE86A7",
  },

  // ==========================================
  // Keikyu
  // ==========================================

  "Keikyu.Main": {
    name: "京急本線",
    code: "KK",
    color: "#00A7E3",
  },

  // ==========================================
  // Tokyo Monorail
  // ==========================================

  "TokyoMonorail.HanedaAirport": {
    name: "東京モノレール",
    code: "MO",
    color: "#1479CC",
  },

  // ==========================================
  // Rinkai Line
  // ==========================================

  "TokyoWaterfrontAreaRapidTransit.Rinkai": {
    name: "りんかい線",
    code: "R",
    color: "#00A7DB",
  },
};

/*
 * odpt.Railway:JR-East.ChuoRapid
 *
 * ↓
 *
 * JR-East.ChuoRapid
 */
function parseRailwayId(value: string) {
  return value.replace("odpt.Railway:", "");
}

/*
 * JR-East.ChuoRapid
 *
 * ↓
 *
 * JR-East
 */
function getOperator(value: string) {
  const parsed = parseRailwayId(value);

  return parsed.split(".")[0] ?? "";
}

/*
 * ODPT ID를 표시용 정보로 변환
 */
function getRailwayInfo(value: string) {
  const parsed = parseRailwayId(value);

  const info = RAILWAY_INFO[parsed];

  if (info) {
    return info;
  }

  /*
   * 아직 매핑하지 않은 노선이 있더라도
   * 화면 자체가 깨지지 않게 fallback 처리
   */
  const railway = parsed.split(".").at(-1) ?? parsed;

  return {
    name: railway,
    color: "#737373",
  };
}

export async function GET(request: NextRequest) {
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

    const station = request.nextUrl.searchParams.get("station");
    const railway = request.nextUrl.searchParams.get("railway") ?? "Yamanote";

    if (!station) {
      return NextResponse.json(
        {
          error: "station 값이 필요합니다.",
        },
        {
          status: 400,
        },
      );
    }

    const supportedRailways: Record<string, string> = {
      Yamanote: "JR-East.Yamanote",
      ChuoRapid: "JR-East.ChuoRapid",
    };

    const railwayId = supportedRailways[railway];

    if (!railwayId) {
      return NextResponse.json(
        {
          error: "지원하지 않는 노선입니다.",
        },
        {
          status: 400,
        },
      );
    }

    const params = new URLSearchParams({
      "odpt:operator": "odpt.Operator:JR-East",
      "owl:sameAs": `odpt.Station:${railwayId}.${station}`,
      "acl:consumerKey": apiKey,
    });

    const response = await fetch(`${ODPT_STATION_URL}?${params.toString()}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "ODPT 역 정보를 불러오지 못했습니다.",
        },
        {
          status: response.status,
        },
      );
    }

    const data = (await response.json()) as OdptStation[];
    const odptStation = data[0];

    if (!odptStation) {
      return NextResponse.json(
        {
          error: "역을 찾을 수 없습니다.",
        },
        {
          status: 404,
        },
      );
    }

    const connectingRailways: ConnectingRailway[] = (
      odptStation["odpt:connectingRailway"] ?? []
    )
      .filter(
        (connectingRailway) =>
          connectingRailway !== `odpt.Railway:${railwayId}`,
      )
      .map((connectingRailway) => {
        const parsed = parseRailwayId(connectingRailway);
        const info = getRailwayInfo(connectingRailway);

        return {
          id: connectingRailway,
          operator: getOperator(connectingRailway),
          railway: parsed.split(".").at(-1) ?? parsed,
          name: info.name,
          code: info.code,
          color: info.color,
        };
      });

    const result: StationApiResponse = {
      station: {
        id: station,
        code: odptStation["odpt:stationCode"],
        ja: odptStation["odpt:stationTitle"].ja,
        en: odptStation["odpt:stationTitle"].en,
        latitude: odptStation["geo:lat"],
        longitude: odptStation["geo:long"],
      },
      connectingRailways,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "역 정보를 처리하는 중 오류가 발생했습니다.",
      },
      {
        status: 500,
      },
    );
  }
}
