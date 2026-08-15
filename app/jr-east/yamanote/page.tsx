import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { YamanoteMap } from "@/components/yamanote-map";

export default function YamanotePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* 상단 네비게이션 */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/jr-east"
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              px-3
              py-2
              text-sm
              font-bold
              text-zinc-600
              transition-colors
              hover:bg-zinc-100
              hover:text-zinc-950
            "
          >
            <ArrowLeft className="h-4 w-4" />

            <span>JR동일본 노선</span>
          </Link>
        </div>
      </header>

      {/* 야마노테선 */}
      <YamanoteMap />
    </main>
  );
}
