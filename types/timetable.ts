export interface StationTimetableItem {
  "odpt:train": string;
  "odpt:trainType": string;
  "odpt:trainNumber": string;
  "odpt:departureTime": string;
  "odpt:destinationStation"?: string[];
}

export interface StationTimetable {
  "@id": string;
  "@type": "odpt:StationTimetable";

  "dc:date": string;
  "dct:issued": string;

  "owl:sameAs": string;

  "odpt:railway": string;
  "odpt:station": string;
  "odpt:calendar": string;
  "odpt:operator": string;
  "odpt:railDirection": string;

  "odpt:stationTimetableObject": StationTimetableItem[];
}

export interface NextTrain {
  trainNumber: string;
  departureTime: string;
  minutesUntilDeparture: number;
}

export interface DirectionTimetable {
  direction: "InnerLoop" | "OuterLoop";
  trains: NextTrain[];
}

export interface TimetableApiResponse {
  station: string;
  calendar: "Weekday" | "SaturdayHoliday";
  updatedAt: string;

  directions: {
    innerLoop: NextTrain[];
    outerLoop: NextTrain[];
  };
}
