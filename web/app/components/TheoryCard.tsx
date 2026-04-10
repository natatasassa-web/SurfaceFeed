"use client";
import { useState } from "react";
import { Theory, Momentum } from "../types";

const MOMENTUM_CONFIG: Record<Momentum, { icon: string; color: string; bg: string }> = {
  surging:  { icon: "⚡", color: "text-yellow-400",  bg: "bg-yellow-400/10 border-yellow-400/20" },
  emerging: { icon: "🟢", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
  holding:  { icon: "🟡", color: "text-amber-400",   bg: "bg-amber-400/10 border-amber-400/20"   },
  fading:   { icon: "🔴", color: "text-red-400",     bg: "bg-red-400/10 border-red-400/20"       },
  isolated: { icon: "⚪", color: "text-zinc-400",    bg: "bg-zinc-800 border-zinc-700"           },
};

export default function TheoryCard({ theory, rank }: { theory: Theory; rank: number }) {
  const [expanded, setExpanded] = useState(false);
  const m = MOMENTUM_CONFIG[theory.momentum] ?? MOMENTUM_CONFIG.isolated;

  const scoreBar = (n: number, max: number = 5) => {
    const filled = Math.round(n);
    return Array.from({ length: max }, (_, i) => (
      <span key={i} className={i < filled ? "text-white" : "text-zinc-700"}>▪</span>
    ));
  };

  return (
    <div className={`rounded-xl border ${m.bg} p-5 transition-all`}>
      {/* Top row */}
      <div className="flex items-start gap-3">
        <span className="text-zinc-600 text-sm font-mono pt-0.5 w-5 shrink-0">{rank}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-semibold uppercase tracking-widest ${m.color} flex items-center gap-1`}>
              {m.icon} {theory.momentum}
            </span>
            <span className="text-xs text-zinc-600">·</span>
            <span className="text-xs text-zinc-500">score {theory.total_score}/10</span>
          </div>
          <h2 className="text-white font-semibold text-base mt-1 leading-snug">
            {theory.title}
          </h2>
        </div>
      </div>

      {/* Summary */}
      <p className="text-zinc-400 text-sm mt-3 ml-8 leading-relaxed">
        {theory.summary}
      </p>

      {/* Signal reason */}
      <p className="text-zinc-500 text-xs mt-2 ml-8 italic">
        ↳ {theory.why_signal}
      </p>

      {/* Subreddit tags */}
      <div className="flex flex-wrap gap-1.5 mt-3 ml-8">
        {theory.subreddits.map((sub) => (
          <span key={sub} className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full border border-zinc-700">
            r/{sub}
          </span>
        ))}
      </div>

      {/* Score breakdown */}
      <div className="flex gap-6 mt-3 ml-8">
        <div className="text-xs text-zinc-600">
          <span className="text-zinc-500 mr-1">cross-community</span>
          {scoreBar(theory.cross_community_score)}
        </div>
        <div className="text-xs text-zinc-600">
          <span className="text-zinc-500 mr-1">engagement</span>
          {scoreBar(theory.engagement_score)}
        </div>
      </div>

      {/* Expand / collapse posts */}
      {theory.posts?.length > 0 && (
        <div className="ml-8 mt-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            {expanded ? "▲ hide threads" : `▼ show ${theory.posts.length} threads`}
          </button>

          {expanded && (
            <div className="mt-2 space-y-2">
              {theory.posts.map((post, i) => (
                <a
                  key={i}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs text-zinc-400 hover:text-white transition-colors border border-zinc-800 hover:border-zinc-700 rounded-lg p-2.5 bg-zinc-900"
                >
                  <span className="text-zinc-600 mr-1.5">r/{post.subreddit}</span>
                  <span className="text-zinc-500 mr-1.5">↑{post.score}</span>
                  {post.title}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
