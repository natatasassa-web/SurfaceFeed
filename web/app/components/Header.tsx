"use client";
import { DigestData } from "../types";

const MOMENTUM_LEGEND = [
  { key: "surging",  icon: "⚡", label: "surging",  color: "text-[#C9A840]" },
  { key: "emerging", icon: "●", label: "emerging", color: "text-[#5C8A4A]" },
  { key: "holding",  icon: "●", label: "holding",  color: "text-[#7A8FA0]" },
  { key: "fading",   icon: "●", label: "fading",   color: "text-[#C8885A]" },
  { key: "isolated", icon: "●", label: "isolated", color: "text-[#9E9589]" },
];

export default function Header({ data }: { data: DigestData }) {
  const dateLabel = data.date && data.date !== "loading"
    ? new Date(data.date + "T12:00:00").toLocaleDateString("en-US", {
        weekday: "long", month: "long", day: "numeric", year: "numeric",
      })
    : "—";

  const timeLabel = data.run_timestamp
    ? new Date(data.run_timestamp).toLocaleTimeString("en-US", {
        hour: "numeric", minute: "2-digit", timeZoneName: "short",
      })
    : null;

  return (
    <header className="border-b border-[#D4CFC6] mb-8">
      <div className="max-w-3xl mx-auto px-4 pt-10 pb-6 text-center">

        {/* Editorial wordmark */}
        <h1
          className="font-cormorant font-medium tracking-[-0.025em] text-[#1C1A17] leading-[1.02]"
          style={{ fontSize: "clamp(2.4rem, 4vw, 4.4rem)", textWrap: "balance" } as React.CSSProperties}
        >
          Surface<span className="text-[#6B6358]">Feed</span>
        </h1>

        {/* Tagline */}
        <p className="text-[#9E9589] text-sm mt-2">
          What Reddit is cooking — across communities
        </p>

        {/* Date + meta */}
        <div className="mt-3 text-sm text-[#9E9589]">
          <span className="text-[#1C1A17] font-medium">{dateLabel}</span>
          {timeLabel && <span className="mx-1.5">·</span>}
          {timeLabel && <span className="text-xs">{timeLabel}</span>}
          {data.total_posts_analyzed > 0 && (
            <span className="text-xs ml-1.5">{data.total_posts_analyzed} posts · {data.subreddits_active} subreddits</span>
          )}
        </div>

        {/* Momentum legend */}
        <div className="flex justify-center gap-5 mt-5 flex-wrap">
          {MOMENTUM_LEGEND.map(({ key, icon, label, color }) => (
            <span key={key} className={`text-xs flex items-center gap-1.5 ${color}`}>
              <span className="text-base leading-none">{icon}</span>
              <span className="text-[#6B6358]">{label}</span>
            </span>
          ))}
        </div>

      </div>
    </header>
  );
}
