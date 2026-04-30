'use client';

import { TrendingUp } from 'lucide-react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { InsightData } from '@/types/type';

export const description = 'A radar chart with GitHub user insights';

interface ChartRadarDotsProps {
  username: string;
  data: InsightData[];
}

// Static config for chart
const chartConfig = {
  metric: {
    label: 'Metrics',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

// ✅ Props-only chart component (no fetching)
export function ChartRadarDots({ username, data }: ChartRadarDotsProps) {
  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>GitHub Profile Insights</CardTitle>
        <CardDescription>Showing user metrics for @{username}</CardDescription>
      </CardHeader>

      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] w-full"
        >
          <RadarChart data={data}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="metric" />
            <PolarGrid />
            <Radar
              dataKey="value"
              fill="var(--color-metric)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground flex items-center gap-2 leading-none">
          Data fetched from GitHub API
        </div>
      </CardFooter>
    </Card>
  );
}
