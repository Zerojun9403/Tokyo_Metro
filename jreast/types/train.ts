export interface OdptTrain {
  "@id": string;
  "@type": "odpt:Train";
  "dc:date": string;
  "dct:valid": string;

  "odpt:delay": number;

  "owl:sameAs": string;

  "odpt:railway": string;
  "odpt:operator": string;

  "odpt:toStation": string | null;
  "odpt:fromStation": string | null;

  "odpt:trainType": string;
  "odpt:trainNumber": string;
  "odpt:railDirection": string;

  "odpt:carComposition": number;

  "odpt:destinationStation": string[];
}

export interface TrainApiResponse {
  updatedAt: string;
  count: number;
  trains: OdptTrain[];
}
