'use client';

import { useCallback, useEffect, useState, useTransition } from 'react';

import { generateSummary } from '@/actions/summary';
import SummarySkeleton from '@/components/SummarySkeleton';

interface SummaryData {
  profile: {
    name: string;
    username: string;
  };
  overview: {
    summary: string;
  };
  professionalSummary: string;
  projectFocus: string;
  activityInsight: string;
  workPattern: string;
  finalAssessment: string;
}

export default function SummaryView({ username }: { username: string }) {
  const [data, setData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  const fetchSummary = useCallback(async () => {
    try {
      setError(null);

      const response = await fetch(`/api/github?username=${username}`);

      if (!response.ok) {
        throw new Error('Failed to fetch GitHub data');
      }

      const github = await response.json();

      const summary = await generateSummary(github);

      setData(summary);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    void fetchSummary();
  }, [fetchSummary]);

  const handleRegenerate = () => {
    startTransition(async () => {
      await fetchSummary();
    });
  };

  if (loading) {
    return <SummarySkeleton />;
  }

  if (error) {
    return <div className="p-6 text-sm text-red-400">{error}</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <main className="mx-auto max-w-4xl space-y-8 p-6 text-white">
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{data.profile.name}</h1>

          <p className="text-sm text-zinc-400">@{data.profile.username}</p>
        </div>

        <button
          onClick={handleRegenerate}
          disabled={isPending}
          className="rounded-md bg-white/10 px-3 py-1.5 text-sm transition hover:bg-white/20 disabled:opacity-50"
        >
          {isPending ? 'Regenerating...' : '🔄 Regenerate'}
        </button>
      </section>

      <Section title="Overview" text={data.overview.summary} />

      <Section title="Professional Summary" text={data.professionalSummary} />

      <Section title="Project Focus" text={data.projectFocus} />

      <Section title="Activity Insight" text={data.activityInsight} />

      <Section title="Work Pattern" text={data.workPattern} />

      <Section title="Final Assessment" text={data.finalAssessment} />
    </main>
  );
}

function Section({ title, text }: { title: string; text: string }) {
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-semibold">{title}</h2>

      <p className="text-sm leading-relaxed text-zinc-300">{text}</p>
    </section>
  );
}
