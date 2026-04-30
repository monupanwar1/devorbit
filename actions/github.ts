'use server';

import { GithubAnalytics } from '@/types/type';

// interface GithubUser {
//   avatar_url: string;
//   login: string;
//   html_url: string;
//   email: string | null;
//   blog: string | null;
//   location: string | null;
//   name: string | null;
//   bio: string | null;
//   followers: number;
//   following: number;
//   public_repos: number;
// }

// interface Insight {
//   metric: string;
//   value: number;
// }

// interface TopRepo {
//   repo: string;
//   commits: number;
//   stars: number;
//   forks: number;
// }

// interface ActivityPoint {
//   month: string;
//   events: number;
// }

// interface GithubAnalytics {
//   user: GithubUser;
//   insights: Insight[];
//   topRepos: TopRepo[];
//   commitsTotal: number;
//   activity: ActivityPoint[];
// }

/**
 * Fetches merged GitHub analytics data via local API route.
 * Calls /api/github?username=<name>
 * Works automatically on localhost or production.
 */
export async function getGithubAnalytics(
  username: string,
): Promise<GithubAnalytics | null> {
  if (!username) return null;

  try {
    // ✅ Automatically resolve correct base (localhost in dev, origin in prod)
    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? 'https://your-production-domain.vercel.app' // optional, auto override when deployed
        : 'http://localhost:3000';

    // ⚡ Call the optimized 2-call API route
    const res = await fetch(`${baseUrl}/api/github?username=${username}`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(
        '❌ Failed to fetch analytics:',
        res.status,
        res.statusText,
      );
      return null;
    }

    const data: GithubAnalytics = await res.json();
    return data;
  } catch (err) {
    console.error('⚠️ Error fetching GitHub analytics:', err);
    return null;
  }
}
