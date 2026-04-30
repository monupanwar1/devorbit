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
import { Activity } from '@/types/type';

export const description = 'GitHub Activity Chart';

interface ChartLineDefaultProps {
  username: string;
  data: Activity[];
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
    a.date > b.date ? 1 : a.date < b.date ? -1 : 0,
  );

  const totalEvents = sortedData.reduce((sum, item) => sum + item.count, 0);

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
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(date) =>
                new Date(date).toLocaleDateString('en-US', {
                  month: 'short',
                })
              }
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  nameKey="count"
                  labelFormatter={(date) =>
                    new Date(date).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })
                  }
                />
              }
            />
            <Line
              dataKey="count"
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
