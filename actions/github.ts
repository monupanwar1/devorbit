'use server';

export interface GithubUser {
  avatar_url: string;
  login: string;
  html_url: string;
  email: string;
  blog: string;
  location: string;
  name: string;
  bio: string;
  followers: string;
  following: string;
  public_repos: string;
}

export async function getUserData(
  username: string,
): Promise<GithubUser | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;

    return res.json();
  } catch {
    return null;
  }
}

export interface RepoCommitStat {
  repo: string;
  commits: number;
}

export async function getRepoCommitStats(
  username: string,
): Promise<RepoCommitStat[]> {
  if (!username) return [];

  // GitHub requires a User-Agent header even for public API calls
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'DevOrbit-App',
  };

  // 🧩 Step 1: Fetch public repositories (first 100)
  const reposRes = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&type=owner&sort=updated`,
    { headers, next: { revalidate: 600 } }, // Cache for 10 mins
  );

  if (!reposRes.ok) {
    console.error(
      `❌ Failed to fetch repositories for ${username}: ${reposRes.status}`,
    );
    return [];
  }

  const repos = await reposRes.json();
  if (!Array.isArray(repos) || repos.length === 0) return [];

  // 🧩 Step 2: Limit to top 10 most recently updated repos
  const targetRepos = repos.slice(0, 10);

  // 🧩 Step 3: Fetch commit counts concurrently
  const commitStats = await Promise.all(
    targetRepos.map(
      async (repo: { owner: { login: string }; name: string }) => {
        const owner = repo.owner.login;
        const name = repo.name;

        try {
          const res = await fetch(
            `https://api.github.com/repos/${owner}/${name}/commits?author=${username}&per_page=1`,
            { headers },
          );
          scroll;

          if (!res.ok) return { repo: name, commits: 0 };

          const link = res.headers.get('link');
          let count = 0;

          if (link) {
            const match = link.match(/&page=(\d+)>; rel="last"/);
            if (match) count = parseInt(match[1]);
          } else {
            const commits = await res.json();
            count = Array.isArray(commits) ? commits.length : 0;
          }

          return { repo: name, commits: count };
        } catch (err) {
          console.error(`⚠️ Error fetching commits for ${name}:`, err);
          return { repo: name, commits: 0 };
        }
      },
    ),
  );

  // 🧩 Step 4: Sort repos by commit count (descending)
  return commitStats
    .filter((r) => r.commits >= 0)
    .sort((a, b) => b.commits - a.commits);
}
