import { NextResponse } from 'next/server';

type Insight = { metric: string; value: number };
type Repo = { repo: string; commits: number };
type Activity = { date: string; count: number };

type RequestBody = {
  user: { name?: string; login: string };
  insights: Insight[];
  topRepos?: Repo[];
  activity?: Activity[];
};

type AIResponse = {
  profile: { name: string; username: string };
  overview: { repositories: number; commits: number; summary: string };
  professionalSummary: string;
  projectFocus: string;
  topRepositories: string[];
  activityInsight: string;
  workPattern: string;
  finalAssessment: string;
};

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Missing GROQ_API_KEY' },
        { status: 500 },
      );
    }

    // ✅ Safe JSON parse
    let body: RequestBody;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    // ✅ Validate minimal shape
    if (!body?.user?.login || !Array.isArray(body.insights)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const { user, insights, topRepos = [], activity = [] } = body;

    // ✅ Helpers
    const getMetric = (name: string) =>
      insights.find((i) => i.metric === name)?.value ?? 0;

    const commits = getMetric('Commits');
    const repos = getMetric('Repos');

    const repoNames = topRepos
      .slice(0, 3)
      .map((r) => r.repo)
      .filter(Boolean);

    const totalActivity = activity.reduce((sum, m) => sum + (m.count || 0), 0);

    // 🧠 Strong prompt (tight + analytical)
    const prompt = `
Return ONLY valid JSON.

Schema:
{
  "profile": { "name": string, "username": string },
  "overview": { "repositories": number, "commits": number, "summary": string },
  "professionalSummary": string,
  "projectFocus": string,
  "topRepositories": string[],
  "activityInsight": string,
  "workPattern": string,
  "finalAssessment": string
}

Rules:
- Use ONLY provided data
- Do NOT invent technologies, skills, or descriptions
- Do NOT assume experience level or domain
- Do NOT repeat the same idea across fields
- Third-person only
- Analytical tone (not resume-style)
- Each text field must contain 2 sentences max
- Output must be valid JSON (no markdown)

Data:
Name: ${user.name || user.login}
Username: ${user.login}
Repositories: ${repos}
Commits: ${commits}
Top Repositories: ${repoNames.join(', ')}
Recent Activity: ${totalActivity}
`;

    // 🚀 Groq call
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        temperature: 0.3,
        messages: [
          { role: 'system', content: 'You output strict JSON only.' },
          { role: 'user', content: prompt },
        ],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('❌ Groq error:', err);
      return NextResponse.json(
        { error: 'LLM request failed' },
        { status: 500 },
      );
    }

    const data = await res.json();
    const raw = data?.choices?.[0]?.message?.content ?? '';

    // ✅ Sanitize model output
    const cleaned = raw.replace(/```json|```/g, '').trim();

    let parsed: AIResponse;

    try {
      parsed = JSON.parse(cleaned);
    } catch {
      console.error('❌ JSON parse failed:', cleaned);

      // ✅ Robust fallback (no UI break)
      parsed = {
        profile: {
          name: user.name || user.login,
          username: user.login,
        },
        overview: {
          repositories: repos,
          commits,
          summary:
            'The profile contains a limited number of repositories with ongoing commit activity, indicating steady development engagement.',
        },
        professionalSummary:
          'The developer shows consistent contributions across a focused set of repositories. Activity is steady and concentrated rather than widely distributed.',
        projectFocus:
          'Work is centered around repositories such as ' +
          repoNames.join(', ') +
          ', indicating continued development within a defined project set.',
        topRepositories: repoNames,
        activityInsight:
          'Recent commit activity indicates steady engagement without significant spikes or inactivity gaps.',
        workPattern:
          'The contribution pattern suggests incremental updates and continuous refinement of existing repositories.',
        finalAssessment:
          'Overall, the profile reflects a developer maintaining consistent progress across a focused set of projects.',
      };
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error('❌ Route error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
