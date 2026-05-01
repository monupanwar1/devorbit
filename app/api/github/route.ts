import { NextResponse } from 'next/server';

interface GithubUser {
  avatar_url: string;
  login: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
}

type GitHubEvent = {
  type: string;
  created_at: string;
  repo?: {
    name?: string;
  };
  payload?: {
    commits?: { message: string }[];
    distinct_size?: number;
  };
};

interface Insight {
  metric: string;
  value: number;
}

interface TopRepo {
  repo: string;
  commits: number;
}

interface ActivityPoint {
  date: string;
  count: number;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username required' }, { status: 400 });
  }

  // 🔐 Safe headers (token optional)
  const token = process.env.GITHUB_TOKEN;

  const headers: HeadersInit = {
    'User-Agent': 'DevOrbitApp',
    Accept: 'application/vnd.github+json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    // =========================
    // 🚀 1. USER DATA
    // =========================
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      cache: 'no-store',
    });

    if (!userRes.ok) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user: GithubUser = await userRes.json();

    // =========================
    // 🚀 2. EVENTS DATA
    // =========================
    const eventsRes = await fetch(
      `https://api.github.com/users/${username}/events?per_page=100`,
      { headers, cache: 'no-store' },
    );

    if (!eventsRes.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch events' },
        { status: 500 },
      );
    }

    const events: GitHubEvent[] = await eventsRes.json(); //

    // Debug (optional)
    // const pushEvents = events.filter((e) => e.type === 'PushEvent');
    // console.log('📊 DEBUG:', {
    //   totalEvents: events.length,
    //   pushEvents: pushEvents.length,
    // });

    // =========================
    // 🔥 PROCESS DATA
    // =========================
    let commitCount = 0;
    const activityByMonth: Record<string, number> = {};
    const repoMap: Record<string, number> = {};

    events.forEach((event: GitHubEvent) => {
      if (event.type === 'PushEvent') {
        const commits =
          event.payload?.distinct_size || event.payload?.commits?.length || 1; // fallback

        const month = event.created_at?.slice(0, 7);

        const repoFull = event.repo?.name;
        const repo = repoFull?.split('/')[1]; // clean repo name

        commitCount += commits;

        if (month) {
          activityByMonth[month] = (activityByMonth[month] || 0) + commits;
        }

        if (repo) {
          repoMap[repo] = (repoMap[repo] || 0) + commits;
        }
      }
    });

    // =========================
    // 📅 LAST 3 MONTHS ACTIVITY
    // =========================
    const now = new Date();

    const lastMonths = Array.from({ length: 3 }).map((_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (2 - i), 1);

      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');

      return `${year}-${month}`;
    });

    const activity: ActivityPoint[] = lastMonths.map((month) => ({
      date: month,
      count: activityByMonth[month] ?? 0,
    }));

    // =========================
    // 🏆 TOP REPOS
    // =========================
    let topRepos: TopRepo[] = Object.entries(repoMap)
      .map(([repo, commits]) => ({ repo, commits }))
      .sort((a, b) => b.commits - a.commits)
      .slice(0, 5);

    if (topRepos.length === 0) {
      topRepos = [{ repo: 'No recent activity', commits: 0 }];
    }

    // =========================
    // 📊 INSIGHTS
    // =========================
    const insights: Insight[] = [
      { metric: 'Followers', value: user.followers ?? 0 },
      { metric: 'Following', value: user.following ?? 0 },
      { metric: 'Repos', value: user.public_repos ?? 0 },
      { metric: 'Commits', value: commitCount },
    ];

    // =========================
    // ✅ FINAL RESPONSE
    // =========================
    return NextResponse.json({
      user,
      insights,
      topRepos,
      commitsTotal: commitCount,
      activity,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);

    console.error('❌ GitHub API error:', message);

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
