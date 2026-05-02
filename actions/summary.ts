'use server';

type Payload = {
  user: { name?: string; login: string };
  insights: { metric: string; value: number }[];
  topRepos: { repo: string; commits: number }[];
  activity: { date: string; count: number }[];
};

export async function generateSummary(data: Payload) {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const res = await fetch(`${base}/api/summary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to generate summary');
    }

    return await res.json(); // 👈 returns structured JSON
  } catch (err) {
    console.error('❌ Server Action error:', err);
    return null;
  }
}
