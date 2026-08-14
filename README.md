
````markdown
# 🚃 JR Yamanote Line Guide

ODPT(Open Data for Public Transportation) 데이터를 활용하여  
JR East 야마노테선의 역 정보, 환승 노선, 열차 출발 정보를 확인할 수 있도록 만든 웹 애플리케이션입니다.

한국인 사용자가 일본 철도를 보다 쉽게 이용할 수 있도록  
일본어뿐만 아니라 영어와 한국어 정보를 함께 제공하는 것을 목표로 개발하고 있습니다.

---

## 📌 Project Overview

야마노테선은 도쿄의 주요 지역을 순환하는 JR East의 대표적인 노선입니다.

이 프로젝트는 단순한 노선도 표시를 넘어 사용자가 원하는 역을 선택하면

- 역 정보
- 역 번호
- 환승 가능한 노선
- 내선순환 / 외선순환
- 다음 열차 출발 시간
- 출발까지 남은 시간

등을 한 화면에서 확인할 수 있도록 구현했습니다.

---

## 🖥️ Main Features

### 🟢 Yamanote Line Map

야마노테선 30개 역을 원형 노선도로 직접 구현했습니다.

별도의 지도 라이브러리를 이용하지 않고 CSS와 좌표 계산을 이용하여
야마노테선 형태의 UI를 구성했습니다.

각 역에는 다음과 같이 다국어 역명을 표시합니다.

```text
新宿
Shinjuku
신주쿠
````

주요 역은 역명을 조금 더 강조하여 쉽게 찾을 수 있도록 구성했습니다.

---

### 🚉 Station Information

노선도에서 역을 클릭하면 오른쪽 Station Panel이 열립니다.

예:

```text
JY17

新宿駅
しんじゅく

Shinjuku · 신주쿠
```

역 번호와 일본어 / 영어 / 한국어 역명을 함께 확인할 수 있습니다.

---

### 🔄 Transfer Lines

ODPT Station API에서 제공하는 `odpt:connectingRailway` 데이터를 이용하여
해당 역에서 환승 가능한 노선을 표시합니다.

예를 들어 신주쿠역에서는 다음과 같은 노선을 확인할 수 있습니다.

```text
JC  中央線快速
JB  中央・総武線
JA  埼京線
JS  湘南新宿ライン
KO  京王線
OH  小田急線
E   都営大江戸線
S   都営新宿線
M   東京メトロ丸ノ内線
```

각 노선에는 실제 노선을 구분하기 쉽도록 노선별 색상을 적용했습니다.

---

### ⏰ Next Train Information

ODPT StationTimetable 데이터를 이용하여 선택한 역의 다음 열차 정보를 표시합니다.

```text
● 内回り  내선순환

→ 上野・池袋方面
  우에노 · 이케부쿠로 방면

19:00
약 3분 후 출발

19:05
약 8분 후 출발
```

내선순환과 외선순환을 구분하고 현재 시간을 기준으로
다음 출발 열차와 출발까지 남은 시간을 계산하여 보여줍니다.

---

### 🌏 Multilingual UI

한국인 여행자가 일본 철도를 쉽게 이해할 수 있도록
다국어 표시를 적용하고 있습니다.

* 🇯🇵 Japanese
* 🇺🇸 English
* 🇰🇷 Korean

일본어 역명을 기본 정보로 유지하면서 영어와 한국어를 함께 제공합니다.

---

## 🛠 Tech Stack

### Frontend

* Next.js 16
* React
* TypeScript
* Tailwind CSS v4
* shadcn/ui
* Base UI
* Lucide React

### API

* ODPT API
* JR East Train Data
* JR East Station Data
* JR East Station Timetable Data

---

## 📡 Data Source

본 프로젝트에서는 ODPT(Open Data for Public Transportation)의
공공교통 오픈데이터를 사용합니다.

주요 활용 데이터:

```text
odpt:Train
odpt:Station
odpt:StationTimetable
```

### Train

야마노테선 열차 관련 데이터를 가져오는 데 사용합니다.

```text
odpt:railway
odpt:trainNumber
odpt:railDirection
odpt:fromStation
odpt:toStation
odpt:delay
odpt:carComposition
```

### Station

역 정보와 환승 노선을 가져오는 데 사용합니다.

```text
odpt:stationCode
odpt:stationTitle
odpt:connectingRailway
odpt:connectingStation
geo:lat
geo:long
```

### StationTimetable

역별 열차 출발 시간을 가져오는 데 사용합니다.

```text
odpt:railDirection
odpt:departureTime
odpt:trainNumber
odpt:destinationStation
```

---

## 🎨 UI / UX

야마노테선의 실제 노선 색상에서 착안하여
메인 컬러를 구성했습니다.

```text
Yamanote Green
#8FC31F
```

노선도는 복잡한 지도 대신 30개 역을 한눈에 확인할 수 있는
원형 인터페이스로 디자인했습니다.

역 마커는 노선도 가독성을 위해 작은 점 형태로 구성했으며
역명을 클릭하면 상세 정보를 확인할 수 있습니다.

---

## 📂 Project Structure

```text
jreast/
│
├── app/
│   ├── api/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── sheet.tsx
│   │
│   ├── station-panel.tsx
│   └── yamanote-map.tsx
│
├── lib/
│   ├── utils.ts
│   └── yamanote.ts
│
├── types/
│   └── train.ts
│
├── public/
│
├── components.json
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 🔐 Environment Variables

ODPT API Key는 소스 코드에 직접 작성하지 않고 환경변수로 관리합니다.

`.env.local`

```env
ODPT_CONSUMER_KEY=YOUR_ODPT_API_KEY
```

> API Key가 포함된 `.env.local` 파일은 GitHub에 업로드하지 않습니다.

---

## 🚀 Getting Started

### 1. Clone

```bash
git clone YOUR_REPOSITORY_URL
cd jreast
```

### 2. Install

```bash
npm install
```

### 3. Environment Variables

프로젝트 루트에 `.env.local` 파일을 생성합니다.

```env
ODPT_CONSUMER_KEY=YOUR_ODPT_API_KEY
```

### 4. Run

```bash
npm run dev
```

브라우저에서 다음 주소로 접속합니다.

```text
http://localhost:3000
```

---

## 🗺️ Roadmap

현재 기능을 기반으로 다음 기능들을 순차적으로 개선할 예정입니다.

* [x] 야마노테선 30개 역 노선도
* [x] 역 클릭 인터랙션
* [x] 일본어 / 영어 / 한국어 역명
* [x] Station Panel
* [x] 역 번호 표시
* [x] 환승 노선 표시
* [x] 환승 노선별 색상
* [x] 내선순환 / 외선순환 구분
* [x] 다음 열차 출발 시간
* [x] 출발까지 남은 시간 계산
* [ ] 방향 안내 한국어 지원
* [ ] 모바일 UI 최적화
* [ ] 역 검색 기능
* [ ] 즐겨찾는 역
* [ ] 운행 장애 / 지연 정보
* [ ] 다국어 전환 기능
* [ ] 접근성 개선
* [ ] 추가 JR East 노선 지원

---

## 💡 Project Goal

이 프로젝트의 목표는 단순히 API 데이터를 화면에 출력하는 것이 아니라

> **한국인 여행자가 도쿄의 철도를 직관적으로 이해할 수 있는 서비스**

를 만드는 것입니다.

복잡한 일본 철도 정보를 사용자에게 필요한 정보 중심으로 재구성하고,
실제 여행 중에도 빠르게 사용할 수 있는 UI/UX를 만드는 것을 목표로 합니다.

---

## 👨‍💻 Developer

**주영준**

Frontend Developer

### Interested In

* Frontend Development
* React / Next.js
* Public Transportation Data
* Open API
* Japan Travel Services

---

## 📄 License

This project is for portfolio and educational purposes.

Transportation data is provided through ODPT
(Open Data for Public Transportation).

```

특히 이 README에서 마음에 드는 부분은 **“실시간 열차 위치를 구현했다가 뺐다”를 굳이 기능 실패처럼 적지 않고**, 현재 서비스의 핵심을 `역 선택 → 다음 열차 → 환승정보`로 명확하게 정의했다는 점이야.

그리고 **ODPT consumerKey는 README나 GitHub 코드에 절대 올리지 말고 `.env.local`로만 관리**하자. 앞에서 사용했던 키가 실제 키라면 공개 저장소에 커밋된 적이 없는지도 한 번 확인하는 게 좋아. 
```
