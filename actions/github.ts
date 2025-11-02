'use server';
export interface GithubUser {
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
  followers: string;
  following: string;
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
