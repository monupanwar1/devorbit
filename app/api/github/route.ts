import { NextResponse } from 'next/server';

interface GithubUser {
  avatar_url: string;
  login: string;
  html_url: string;
  email: string | null;
  blog: string | null;
  location: string | null;
  name: string | null;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
}

interface GithubRepo {
  name: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  owner: { login: string };
}

interface GithubCommit {
  commit: {
    author: {
      date: string;
    };
  };
}

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
  if (!username)
    return NextResponse.json({ error: 'Username required' }, { status: 400 });

  const headers = {
    'User-Agent': 'DevOrbitApp',
    Accept: 'application/vnd.github+json',
  };

  try {
    // Fetch user info
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      cache: 'no-store',
      headers,
    });

    if (userRes.status === 403) {
      const body = await userRes.json();
      if (body.message?.includes('API rate limit exceeded')) {
        return NextResponse.json(
          { error: 'GitHub API rate limit exceeded. Please try again later.' },
          { status: 429 },
        );
      }
    }

    if (!userRes.ok)
      return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const user: GithubUser = await userRes.json();

    // Fetch repos
    const repoRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=10&sort=pushed&type=owner`,
      { cache: 'no-store', headers },
    );

    if (!repoRes.ok)
      return NextResponse.json(
        { error: 'Failed to fetch repositories' },
        { status: 500 },
      );

    const repos: GithubRepo[] = await repoRes.json();

    let stars = 0;
    let forks = 0;

    for (const repo of repos) {
      stars += repo.stargazers_count || 0;
      forks += repo.forks_count || 0;
    }

    // Create "since" date (12 months ago)
    const since = new Date();
    since.setFullYear(since.getFullYear() - 1);

    // Fetch commits for each repo (12 months only)
    const commitStats = await Promise.all(
      repos.map(async (repo) => {
        try {
          const res = await fetch(
            `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?since=${since.toISOString()}`,
            { headers },
          );

          if (!res.ok) return [];

          const commits: GithubCommit[] = await res.json();
          return commits.map((commit) => commit.commit.author.date);
        } catch {
          return [];
        }
      }),
    );

    // Flatten commit dates
    const allCommitDates = commitStats.flat();

    // Group by month
    const activityByMonth: Record<string, number> = {};

    allCommitDates.forEach((date) => {
      const month = date.slice(0, 7); // YYYY-MM
      activityByMonth[month] = (activityByMonth[month] || 0) + 1;
    });

    // Generate last 12 months
    const now = new Date();
    const last12Months = Array.from({ length: 12 }).map((_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      return `${year}-${month}`;
    });

    // Build final 12-month activity
    const activity: ActivityPoint[] = last12Months.map((month) => ({
      date: month,
      count: activityByMonth[month] ?? 0,
    }));

    // Total commits
    const commitCount = allCommitDates.length;

    const insights: Insight[] = [
      { metric: 'Repos', value: repos.length },
      { metric: 'Stars', value: stars },
      { metric: 'Forks', value: forks },
      { metric: 'Followers', value: user.followers ?? 0 },
      { metric: 'Following', value: user.following ?? 0 },
      { metric: 'Commits', value: commitCount },
    ];

    // Top repos by commit count
    const topRepos: TopRepo[] = repos
      .map((repo, i) => ({
        repo: repo.name,
        commits: commitStats[i]?.length || 0,
      }))
      .sort((a, b) => b.commits - a.commits)
      .slice(0, 5);

    return NextResponse.json({
      user,
      insights,
      topRepos,
      commitsTotal: commitCount,
      activity,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('❌ GitHub route error:', message);
    if (message.includes('rate limit')) {
      return NextResponse.json(
        { error: 'GitHub API rate limit exceeded. Please try again later.' },
        { status: 429 },
      );
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
