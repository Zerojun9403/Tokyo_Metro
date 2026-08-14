"use client";

import { useCallback, useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { YamanoteMap } from "@/components/yamanote-map";

import type { OdptTrain, TrainApiResponse } from "@/types/train";

export default function Home() {
  const [trains, setTrains] = useState<OdptTrain[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  const fetchTrains = useCallback(async () => {
    try {
      setRefreshing(true);

      const response = await fetch("/api/trains", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("열차 정보를 불러오지 못했습니다.");
      }

      const data: TrainApiResponse = await response.json();

      setTrains(data.trains);
      setUpdatedAt(new Date());
      setError(null);
    } catch (error) {
      console.error(error);

      setError("야마노테선 열차 정보를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchTrains();

    const interval = window.setInterval(() => {
      fetchTrains();
    }, 30_000);

    return () => {
      window.clearInterval(interval);
    };
  }, [fetchTrains]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="text-4xl">🚃</div>

          <p className="mt-4 text-muted-foreground">
            야마노테선 운행 정보를 불러오는 중...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Header */}
        <header className="mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#9acd32]
                  font-bold
                  text-white
                "
              >
                JY
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold">山手線</h1>

                  <Badge variant="secondary">LIVE</Badge>
                </div>

                <p className="text-sm text-muted-foreground">
                  JR Yamanote Line
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="text-right">
              <div className="flex items-center justify-end gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span
                    className="
                      absolute
                      inline-flex
                      h-full
                      w-full
                      animate-ping
                      rounded-full
                      bg-[#9acd32]
                      opacity-75
                    "
                  />

                  <span
                    className="
                      relative
                      inline-flex
                      h-2.5
                      w-2.5
                      rounded-full
                      bg-[#9acd32]
                    "
                  />
                </span>

                <span className="text-sm font-medium">
                  {refreshing
                    ? "업데이트 중..."
                    : `현재 ${trains.length}대 운행`}
                </span>
              </div>

              {updatedAt && (
                <p className="mt-1 text-xs text-muted-foreground">
                  마지막 업데이트 {updatedAt.toLocaleTimeString("ko-KR")}
                </p>
              )}
            </div>
          </div>
        </header>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Map */}
        <section className="rounded-3xl border bg-background p-4 shadow-sm md:p-8">
          <YamanoteMap trains={trains} />
        </section>

        {/* Description */}
        <footer className="mt-4 text-center text-xs text-muted-foreground">
          ODPT 열차 운행 데이터를 기반으로 현재 운행 구간을 표시합니다. 열차
          아이콘은 실제 GPS 좌표가 아닌 역간 구간 위치를 나타냅니다.
        </footer>
      </div>
    </main>
  );
}
