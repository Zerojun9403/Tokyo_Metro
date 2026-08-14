export const YAMANOTE_STATIONS = [
  { id: "Tokyo", ja: "東京", ko: "도쿄", en: "Tokyo" },
  { id: "Kanda", ja: "神田", ko: "간다", en: "Kanda" },
  { id: "Akihabara", ja: "秋葉原", ko: "아키하바라", en: "Akihabara" },
  { id: "Okachimachi", ja: "御徒町", ko: "오카치마치", en: "Okachimachi" },
  { id: "Ueno", ja: "上野", ko: "우에노", en: "Ueno" },
  { id: "Uguisudani", ja: "鶯谷", ko: "우구이스다니", en: "Uguisudani" },
  { id: "Nippori", ja: "日暮里", ko: "닛포리", en: "Nippori" },
  { id: "NishiNippori", ja: "西日暮里", ko: "니시닛포리", en: "Nishi-Nippori" },
  { id: "Tabata", ja: "田端", ko: "다바타", en: "Tabata" },
  { id: "Komagome", ja: "駒込", ko: "고마고메", en: "Komagome" },
  { id: "Sugamo", ja: "巣鴨", ko: "스가모", en: "Sugamo" },
  { id: "Otsuka", ja: "大塚", ko: "오쓰카", en: "Otsuka" },
  { id: "Ikebukuro", ja: "池袋", ko: "이케부쿠로", en: "Ikebukuro" },
  { id: "Mejiro", ja: "目白", ko: "메지로", en: "Mejiro" },
  {
    id: "Takadanobaba",
    ja: "高田馬場",
    ko: "다카다노바바",
    en: "Takadanobaba",
  },
  { id: "ShinOkubo", ja: "新大久保", ko: "신오쿠보", en: "Shin-Okubo" },
  { id: "Shinjuku", ja: "新宿", ko: "신주쿠", en: "Shinjuku" },
  { id: "Yoyogi", ja: "代々木", ko: "요요기", en: "Yoyogi" },
  { id: "Harajuku", ja: "原宿", ko: "하라주쿠", en: "Harajuku" },
  { id: "Shibuya", ja: "渋谷", ko: "시부야", en: "Shibuya" },
  { id: "Ebisu", ja: "恵比寿", ko: "에비스", en: "Ebisu" },
  { id: "Meguro", ja: "目黒", ko: "메구로", en: "Meguro" },
  { id: "Gotanda", ja: "五反田", ko: "고탄다", en: "Gotanda" },
  { id: "Osaki", ja: "大崎", ko: "오사키", en: "Osaki" },
  { id: "Shinagawa", ja: "品川", ko: "시나가와", en: "Shinagawa" },
  {
    id: "TakanawaGateway",
    ja: "高輪ゲートウェイ",
    ko: "다카나와 게이트웨이",
    en: "Takanawa Gateway",
  },
  { id: "Tamachi", ja: "田町", ko: "다마치", en: "Tamachi" },
  { id: "Hamamatsucho", ja: "浜松町", ko: "하마마쓰초", en: "Hamamatsucho" },
  { id: "Shimbashi", ja: "新橋", ko: "신바시", en: "Shimbashi" },
  { id: "Yurakucho", ja: "有楽町", ko: "유라쿠초", en: "Yurakucho" },
] as const;

export type YamanoteStationId = (typeof YAMANOTE_STATIONS)[number]["id"];

export function getStationId(station: string | null): string | null {
  if (!station) {
    return null;
  }

  return station.split(".").at(-1) ?? null;
}

export function getStation(station: string | null) {
  const stationId = getStationId(station);

  if (!stationId) {
    return null;
  }

  return YAMANOTE_STATIONS.find((item) => item.id === stationId) ?? null;
}
