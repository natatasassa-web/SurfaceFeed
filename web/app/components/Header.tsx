"use client";
import { DigestData } from "../types";

const MOMENTUM_LEGEND = [
  { key: "surging",  icon: "⚡", label: "surging"  },
  { key: "emerging", icon: "●", label: "emerging", color: "text-[#5C8A4A]" },
  { key: "holding",  icon: "●", label: "holding",  color: "text-[#7A8FA0]" },
  { key: "fading",   icon: "●", label: "fading",   color: "text-[#B87A82]" },
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
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#1C1A17]">
              Surface<span className="text-[#6B6358]">Feed</span>
            </h1>
            <p className="text-[#9E9589] text-sm mt-1">
              What Reddit is cooking — across communities
            </p>
          </div>
          <div className="text-right text-sm text-[#9E9589]">
            <div className="text-[#1C1A17] font-medium">{dateLabel}</div>
            {timeLabel && <div className="text-xs mt-0.5">{timeLabel}</div>}
            {data.total_posts_analyzed > 0 && (
              <div className="text-xs mt-1">
                {data.total_posts_analyzed} posts · {data.subreddits_active} subreddits
              </div>
            )}
          </div>
        </div>

        {/* Momentum legend */}
        <div className="flex gap-5 mt-5 flex-wrap">
          {MOMENTUM_LEGEND.map(({ key, icon, label, color }) => (
            <span key={key} className={`text-xs flex items-center gap-1.5 ${color || "text-[#C9A84C]"}`}>
              <span className="text-base leading-none">{icon}</span>
              <span className="text-[#6B6358]">{label}</span>
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
