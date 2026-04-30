/* ================= TYPES ================= */

export type GithubUser = {
  login: string;
  avatar_url: string;

  name?: string;
  bio?: string;

  followers?: number;
  following?: number;
  public_repos?: number;

  html_url?: string;
  email?: string;
  blog?: string;
  location?: string;
};

export type Repo = {
  repo: string;
  commits: number;
  stars?: number;
  forks?: number;
};

export type Insight = {
  metric: string;
  value: number;
};
export type InsightData = Insight;

export type Activity = {
  date: string;
  count: number;
};

export type GithubAnalytics = {
  user: GithubUser;
  topRepos: Repo[];
  insights: Insight[];
  activity: Activity[];
};
