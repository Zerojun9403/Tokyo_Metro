export interface OdptStation {
  "@id": string;
  "@type": "odpt:Station";

  "dc:date": string;
  "dc:title": string;

  "geo:lat": number;
  "geo:long": number;

  "owl:sameAs": string;

  "odpt:railway": string;
  "odpt:operator": string;

  "odpt:stationCode"?: string;

  "odpt:stationTitle": {
    en: string;
    ja: string;
  };

  "odpt:connectingRailway"?: string[];
  "odpt:connectingStation"?: string[];
}

export interface ConnectingRailway {
  id: string;

  operator: string;

  railway: string;

  name: string;

  code?: string;

  color: string;
}

export interface StationApiResponse {
  station: {
    id: string;

    code?: string;

    ja: string;

    en: string;

    latitude: number;

    longitude: number;
  };

  connectingRailways: ConnectingRailway[];
}
