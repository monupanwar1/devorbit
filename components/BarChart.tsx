'use client';

import { getRepoCommitStats } from '@/actions/github';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

export function RepoCommitChart({ username }: { username: string }) {
  const [data, setData] = useState<{ repo: string; commits: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!username) return;
      setLoading(true);
      const result = await getRepoCommitStats(username);
      setData(result);
      console.log(data);
      setLoading(false);
    };
    load();
  }, [username, data]);

  const totalCommits = useMemo(
    () => data.reduce((sum, d) => sum + d.commits, 0),
    [data],
  );

  return (
    <Card className="py-0 border rounded-xl shadow-sm">
      <CardHeader className="flex flex-col sm:flex-row justify-between border-b p-4 sm:p-6">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold">
            Top Repositories by Commits
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Showing recent commit activity for <strong>{username}</strong>
          </CardDescription>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Total commits</p>
          <p className="text-2xl font-bold text-primary">
            {loading ? '—' : totalCommits.toLocaleString()}
          </p>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        {loading ? (
          <Skeleton className="h-[260px] w-full rounded-lg" />
        ) : data.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No commit data available.
          </p>
        ) : (
          <ChartContainer
            config={{
              commits: { label: 'Commits', color: '#3B82F6' }, // blue tone
            }}
            className="aspect-auto h-[260px] w-full"
          >
            <BarChart
              data={data}
              margin={{ left: 20, right: 20, top: 10, bottom: 10 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="repo"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                style={{ fontSize: '12px' }}
                interval={0}
              />
              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                width={40}
                style={{ fontSize: '12px' }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-40"
                    nameKey="repo"
                    labelFormatter={(value) => `${value} commits`}
                  />
                }
              />
              <Bar
                dataKey="commits"
                fill="#3B82F6"
                radius={[6, 6, 0, 0]}
                isAnimationActive
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
