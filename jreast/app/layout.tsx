"use client";

import type { ReactNode } from "react";
import { Noto_Sans_JP, Noto_Sans_KR } from "next/font/google";

import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-jp",
  display: "swap",
});

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-kr",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansJP.variable} ${notoSansKR.variable}`}>
      <body
        className="
          min-h-screen
          antialiased
          [font-family:var(--font-noto-kr),var(--font-noto-jp),sans-serif]
        "
      >
        {children}
      </body>
    </html>
  );
}
