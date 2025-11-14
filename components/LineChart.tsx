'use client';

import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

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

export const description = 'GitHub Activity Chart';

interface ActivityData {
  month: string; // e.g. "2025-10"
  events: number;
}

interface ChartLineDefaultProps {
  username: string;
  data: ActivityData[];
}

// Chart color config
const chartConfig = {
  activity: {
    label: 'Activity',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export function ChartLineDefault({ username, data }: ChartLineDefaultProps) {
  const sortedData = [...data].sort((a, b) =>
    a.month > b.month ? 1 : a.month < b.month ? -1 : 0,
  );

  const totalEvents = sortedData.reduce((sum, item) => sum + item.events, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>GitHub Activity</CardTitle>
        <CardDescription>
          Showing monthly GitHub activity for @{username}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={sortedData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(month) => {
                const [year, m] = month.split('-');
                return new Date(`${year}-${m}-01`).toLocaleDateString('en-US', {
                  month: 'short',
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  nameKey="events"
                  labelFormatter={(month) => {
                    const [year, m] = month.split('-');
                    return new Date(`${year}-${m}-01`).toLocaleDateString(
                      'en-US',
                      { month: 'long', year: 'numeric' },
                    );
                  }}
                />
              }
            />
            <Line
              dataKey="events"
              type="natural"
              stroke="var(--color-activity)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 12.5% this quarter
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Total activity events: {totalEvents.toLocaleString()}
        </div>
      </CardFooter>
    </Card>
  );
}
