export type ChuoRapidStation = {
  id: string;
  code: string;
  ja: string;
  ko: string;
  en: string;
};

export const CHUO_RAPID_COLOR = "#F15A22";

export const CHUO_RAPID_STATIONS: ChuoRapidStation[] = [
  {
    id: "Tokyo",
    code: "JC01",
    ja: "東京",
    ko: "도쿄",
    en: "Tokyo",
  },
  {
    id: "Kanda",
    code: "JC02",
    ja: "神田",
    ko: "간다",
    en: "Kanda",
  },
  {
    id: "Ochanomizu",
    code: "JC03",
    ja: "御茶ノ水",
    ko: "오차노미즈",
    en: "Ochanomizu",
  },
  {
    id: "Yotsuya",
    code: "JC04",
    ja: "四ツ谷",
    ko: "요쓰야",
    en: "Yotsuya",
  },
  {
    id: "Shinjuku",
    code: "JC05",
    ja: "新宿",
    ko: "신주쿠",
    en: "Shinjuku",
  },
  {
    id: "Nakano",
    code: "JC06",
    ja: "中野",
    ko: "나카노",
    en: "Nakano",
  },
  {
    id: "Koenji",
    code: "JC07",
    ja: "高円寺",
    ko: "고엔지",
    en: "Koenji",
  },
  {
    id: "Asagaya",
    code: "JC08",
    ja: "阿佐ケ谷",
    ko: "아사가야",
    en: "Asagaya",
  },
  {
    id: "Ogikubo",
    code: "JC09",
    ja: "荻窪",
    ko: "오기쿠보",
    en: "Ogikubo",
  },
  {
    id: "NishiOgikubo",
    code: "JC10",
    ja: "西荻窪",
    ko: "니시오기쿠보",
    en: "Nishi-Ogikubo",
  },
  {
    id: "Kichijoji",
    code: "JC11",
    ja: "吉祥寺",
    ko: "기치조지",
    en: "Kichijoji",
  },
  {
    id: "Mitaka",
    code: "JC12",
    ja: "三鷹",
    ko: "미타카",
    en: "Mitaka",
  },
  {
    id: "MusashiSakai",
    code: "JC13",
    ja: "武蔵境",
    ko: "무사시사카이",
    en: "Musashi-Sakai",
  },
  {
    id: "HigashiKoganei",
    code: "JC14",
    ja: "東小金井",
    ko: "히가시코가네이",
    en: "Higashi-Koganei",
  },
  {
    id: "MusashiKoganei",
    code: "JC15",
    ja: "武蔵小金井",
    ko: "무사시코가네이",
    en: "Musashi-Koganei",
  },
  {
    id: "Kokubunji",
    code: "JC16",
    ja: "国分寺",
    ko: "고쿠분지",
    en: "Kokubunji",
  },
  {
    id: "NishiKokubunji",
    code: "JC17",
    ja: "西国分寺",
    ko: "니시코쿠분지",
    en: "Nishi-Kokubunji",
  },
  {
    id: "Kunitachi",
    code: "JC18",
    ja: "国立",
    ko: "구니타치",
    en: "Kunitachi",
  },
  {
    id: "Tachikawa",
    code: "JC19",
    ja: "立川",
    ko: "다치카와",
    en: "Tachikawa",
  },
  {
    id: "Hino",
    code: "JC20",
    ja: "日野",
    ko: "히노",
    en: "Hino",
  },
  {
    id: "Toyoda",
    code: "JC21",
    ja: "豊田",
    ko: "도요다",
    en: "Toyoda",
  },
  {
    id: "Hachioji",
    code: "JC22",
    ja: "八王子",
    ko: "하치오지",
    en: "Hachioji",
  },
  {
    id: "NishiHachioji",
    code: "JC23",
    ja: "西八王子",
    ko: "니시하치오지",
    en: "Nishi-Hachioji",
  },
  {
    id: "Takao",
    code: "JC24",
    ja: "高尾",
    ko: "다카오",
    en: "Takao",
  },
];

export function getChuoRapidStation(id: string) {
  return CHUO_RAPID_STATIONS.find((station) => station.id === id);
}
