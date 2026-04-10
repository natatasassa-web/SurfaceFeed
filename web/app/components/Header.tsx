"use client";
import { DigestData } from "../types";

const MOMENTUM_LEGEND = [
  { key: "surging",  icon: "⚡", label: "surging"  },
  { key: "emerging", icon: "🟢", label: "emerging" },
  { key: "holding",  icon: "🟡", label: "holding"  },
  { key: "fading",   icon: "🔴", label: "fading"   },
  { key: "isolated", icon: "⚪", label: "isolated" },
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
    <header className="border-b border-zinc-800 mb-8">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Surface<span className="text-zinc-400">Feed</span>
            </h1>
            <p className="text-zinc-500 text-sm mt-1">
              What Reddit is cooking — across communities
            </p>
          </div>
          <div className="text-right text-sm text-zinc-500">
            <div className="text-zinc-300 font-medium">{dateLabel}</div>
            {timeLabel && <div className="text-xs mt-0.5">{timeLabel}</div>}
            {data.total_posts_analyzed > 0 && (
              <div className="text-xs mt-1">
                {data.total_posts_analyzed} posts · {data.subreddits_active} subreddits
              </div>
            )}
          </div>
        </div>

        {/* Momentum legend */}
        <div className="flex gap-4 mt-5 flex-wrap">
          {MOMENTUM_LEGEND.map(({ key, icon, label }) => (
            <span key={key} className="text-xs text-zinc-500 flex items-center gap-1">
              <span>{icon}</span> {label}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
