"use client";
import { useState } from "react";
import { Theory, Momentum } from "../types";

const MOMENTUM_CONFIG: Record<Momentum, {
  icon: string;
  label: string;
  bg: string;
  border: string;
  badge: string;
  badgeShadow: string;
  tag: string;
  tagText: string;
  muted: string;
}> = {
  surging: {
    icon: "⚡",
    label: "surging",
    bg: "bg-[#F8D87B]",
    border: "border-[#E8C850]",
    badge: "bg-[#B85A14]",
    badgeShadow: "shadow-[2px_2px_0_#8B3E0E]",
    tag: "bg-[#E8C850]/30",
    tagText: "text-[#5C4800]",
    muted: "text-[#8B6800]",
  },
  emerging: {
    icon: "●",
    label: "emerging",
    bg: "bg-[#C3D7F6]",
    border: "border-[#A8C4F0]",
    badge: "bg-[#1A3B7A]",
    badgeShadow: "shadow-[2px_2px_0_#0A2048]",
    tag: "bg-[#A8C4F0]/30",
    tagText: "text-[#1A3B7A]",
    muted: "text-[#1A3B7A]",
  },
  holding: {
    icon: "●",
    label: "holding",
    bg: "bg-[#F7F1E8]",
    border: "border-[#E0D8C8]",
    badge: "bg-[#7A7570]",
    badgeShadow: "shadow-[2px_2px_0_#4A4540]",
    tag: "bg-[#E0D8C8]/60",
    tagText: "text-[#4A4030]",
    muted: "text-[#6B5E4A]",
  },
  fading: {
    icon: "●",
    label: "fading",
    bg: "bg-[#DCAE88]",
    border: "border-[#C89860]",
    badge: "bg-[#8FB7D8]",
    badgeShadow: "shadow-[2px_2px_0_#6A94B8]",
    tag: "bg-[#C89860]/30",
    tagText: "text-[#5C3800]",
    muted: "text-[#7A4A20]",
  },
  isolated: {
    icon: "●",
    label: "isolated",
    bg: "bg-[#7CCB93]",
    border: "border-[#5AB878]",
    badge: "bg-[#D87F8D]",
    badgeShadow: "shadow-[2px_2px_0_#B05868]",
    tag: "bg-[#5AB878]/20",
    tagText: "text-[#0A2E18]",
    muted: "text-[#1B5E35]",
  },
};

const BADGE_TEXT = "text-[#FAF8F4]";

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
    <div className={`rounded-2xl border ${m.bg} ${m.border} p-5`}>

      {/* Badge + rank row */}
      <div className="flex items-center gap-3">
        <span className="text-[#1C1A17]/50 text-sm font-mono w-5 shrink-0">{rank}</span>
        <span className={`inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md ${m.badge} ${BADGE_TEXT} ${m.badgeShadow}`}>
          {m.icon} {m.label}
        </span>
      </div>

      {/* Headline — centered serif */}
      <h2
        className="font-cormorant font-medium text-[#1C1A17] text-center mt-3 px-2"
        style={{
          fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
          lineHeight: 1.05,
          letterSpacing: "-0.025em",
          textWrap: "balance",
        } as React.CSSProperties}
      >
        {theory.title}
      </h2>

      {/* Signal reason */}
      <p className={`text-sm mt-3 ml-8 leading-snug ${m.muted}`}>
        ↳ {theory.why_signal}
      </p>

      {/* Summary */}
      <p className="text-sm mt-2 ml-8 leading-snug text-[#1C1A17]/80">
        {theory.summary}
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
      <div className="flex items-center gap-5 mt-2 ml-8">
        <div className="text-xs text-[#1C1A17]/50 flex items-center gap-1">
          <span>cross</span>
          {scoreBar(theory.cross_community_score)}
        </div>
        <div className="text-xs text-[#1C1A17]/50 flex items-center gap-1">
          <span>engage</span>
          {scoreBar(theory.engagement_score)}
        </div>
        <div className="text-xs font-mono text-[#1C1A17]/40 ml-auto">
          {theory.total_score}<span className="text-[#1C1A17]/25">/10</span>
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
