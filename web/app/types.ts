export type Momentum = "emerging" | "surging" | "holding" | "fading" | "isolated";

export interface Post {
  title: string;
  url: string;
  subreddit: string;
  score: number;
}

export interface Theory {
  title: string;
  summary: string;
  subreddits: string[];
  cross_community_score: number;
  engagement_score: number;
  total_score: number;
  momentum: Momentum;
  why_signal: string;
  posts: Post[];
}

export interface DigestData {
  date: string;
  run_timestamp: string;
  total_posts_analyzed: number;
  subreddits_active: number;
  theories: Theory[];
}
