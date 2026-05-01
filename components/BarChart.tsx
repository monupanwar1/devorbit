'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

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

interface RepoData {
  repo: string;
  commits: number;
  stars?: number;
  forks?: number;
}

interface RepoCommitChartProps {
  // username: string;
  data: RepoData[]; // ✅ data must be passed as props
}

export function RepoCommitChart({ data }: RepoCommitChartProps) {
  const totalCommits = data.reduce((sum, d) => sum + (d.commits || 0), 0);

  return (
    <Card className="rounded-xl border py-0 shadow-sm">
      <CardHeader className="flex flex-col justify-between border-b p-4 sm:flex-row sm:p-6">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold">
            Top Repositories by Commits
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            <p className="text-muted-foreground text-xs">Total commits</p>
            <p className="text-primary text-2xl font-bold">
              {totalCommits.toLocaleString()}
            </p>
          </CardDescription>
        </div>
        <div className="text-right"></div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        {data.length === 0 ? (
          <p className="text-muted-foreground py-8 text-center text-sm">
            No commit data available.
          </p>
        ) : (
          <ChartContainer
            config={{
              commits: { label: 'Commits', color: '#3B82F6' },
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
