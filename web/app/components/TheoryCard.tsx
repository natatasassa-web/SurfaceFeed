"use client";
import { useState } from "react";
import { Theory, Momentum } from "../types";

// Mapped to Huddle's dusty card palette
const MOMENTUM_CONFIG: Record<Momentum, {
  icon: string;
  label: string;
  bg: string;         // card background
  border: string;     // card border
  badge: string;      // momentum badge bg
  badgeText: string;  // momentum badge text
  tag: string;        // subreddit tag bg
  tagText: string;    // subreddit tag text
  muted: string;      // secondary text
}> = {
  surging: {
    icon: "⚡",
    label: "surging",
    bg: "bg-[#E8C96B]",
    border: "border-[#D4B455]",
    badge: "bg-[#C9A840]",
    badgeText: "text-[#1C1A17]",
    tag: "bg-[#D4B455]/40",
    tagText: "text-[#5C4A10]",
    muted: "text-[#7A6420]",
  },
  emerging: {
    icon: "●",
    label: "emerging",
    bg: "bg-[#B8D4A8]",
    border: "border-[#9BBF88]",
    badge: "bg-[#7AA860]",
    badgeText: "text-white",
    tag: "bg-[#9BBF88]/40",
    tagText: "text-[#2D5C1A]",
    muted: "text-[#3D6B28]",
  },
  holding: {
    icon: "●",
    label: "holding",
    bg: "bg-[#A8BEC8]",
    border: "border-[#8AAAB8]",
    badge: "bg-[#6A94A8]",
    badgeText: "text-white",
    tag: "bg-[#8AAAB8]/40",
    tagText: "text-[#1A3D50]",
    muted: "text-[#2D5468]",
  },
  fading: {
    icon: "●",
    label: "fading",
    bg: "bg-[#C4909A]",
    border: "border-[#B07880]",
    badge: "bg-[#A05860]",
    badgeText: "text-white",
    tag: "bg-[#B07880]/40",
    tagText: "text-[#5C1A22]",
    muted: "text-[#7A2830]",
  },
  isolated: {
    icon: "●",
    label: "isolated",
    bg: "bg-[#D8D2C8]",
    border: "border-[#C4BEB4]",
    badge: "bg-[#9E9589]",
    badgeText: "text-white",
    tag: "bg-[#C4BEB4]/60",
    tagText: "text-[#4A4540]",
    muted: "text-[#6B6358]",
  },
};

export default function TheoryCard({ theory, rank }: { theory: Theory; rank: number }) {
  const [expanded, setExpanded] = useState(false);
  const m = MOMENTUM_CONFIG[theory.momentum] ?? MOMENTUM_CONFIG.isolated;

  const scoreBar = (n: number, max: number = 5) => {
    const filled = Math.round(n);
    return Array.from({ length: max }, (_, i) => (
      <span key={i} className={i < filled ? "text-[#1C1A17]" : "text-[#1C1A17]/20"}>▪</span>
    ));
  };

  return (
    <div className={`rounded-2xl border ${m.bg} ${m.border} p-5 transition-all`}>
      {/* Top row */}
      <div className="flex items-start gap-3">
        <span className="text-[#1C1A17]/30 text-sm font-mono pt-0.5 w-5 shrink-0">{rank}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full ${m.badge} ${m.badgeText} flex items-center gap-1`}>
              {m.icon} {m.label}
            </span>
            <span className="text-xs text-[#1C1A17]/40">score {theory.total_score}/10</span>
          </div>
          <h2 className="text-[#1C1A17] font-bold text-base mt-2 leading-snug">
            {theory.title}
          </h2>
        </div>
      </div>

      {/* Summary */}
      <p className={`text-base mt-3 ml-8 leading-relaxed text-[#1C1A17]/80`}>
        {theory.summary}
      </p>

      {/* Signal reason */}
      <p className={`text-xs mt-2 ml-8 italic ${m.muted}`}>
        ↳ {theory.why_signal}
      </p>

      {/* Subreddit tags */}
      <div className="flex flex-wrap gap-1.5 mt-3 ml-8">
        {theory.subreddits.map((sub) => (
          <span key={sub} className={`text-xs px-2 py-0.5 rounded-full border border-[#1C1A17]/10 ${m.tag} ${m.tagText}`}>
            r/{sub}
          </span>
        ))}
      </div>

      {/* Score breakdown */}
      <div className="flex gap-6 mt-3 ml-8">
        <div className="text-xs text-[#1C1A17]/50">
          <span className="mr-1">cross-community</span>
          {scoreBar(theory.cross_community_score)}
        </div>
        <div className="text-xs text-[#1C1A17]/50">
          <span className="mr-1">engagement</span>
          {scoreBar(theory.engagement_score)}
        </div>
      </div>

      {/* Expand / collapse posts */}
      {theory.posts?.length > 0 && (
        <div className="ml-8 mt-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-[#1C1A17]/40 hover:text-[#1C1A17]/70 transition-colors"
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
                  className="block text-xs text-[#1C1A17]/60 hover:text-[#1C1A17] transition-colors border border-[#1C1A17]/10 hover:border-[#1C1A17]/20 rounded-xl p-2.5 bg-white/30 hover:bg-white/50"
                >
                  <span className="text-[#1C1A17]/40 mr-1.5">r/{post.subreddit}</span>
                  <span className="text-[#1C1A17]/40 mr-1.5">↑{post.score}</span>
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
