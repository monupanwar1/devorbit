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
