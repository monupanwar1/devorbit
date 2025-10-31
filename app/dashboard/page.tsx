import { ChartBarInteractive } from '@/components/BarChart';
import { ChartRadarDots } from '@/components/RadarChart';
import Searchbar from '@/components/Searchbar';
import UserCard from '@/components/UserCard';

export default function Page() {
  return (
    <main className="py-20 space-y-4 max-w-7xl min-h-svh mx-auto flex flex-col px-4">
      <section className="container flex items-center justify-center flex-col mt-10 space-y-2">
        <h1 className="text-3xl md:text-5xl font-bold">Dashboard</h1>
        <p className="text-lg text-muted-foreground">
          Welcome to your dashboard! Here you can find an overview of your
          account and recent activity.
        </p>
      </section>

      <Searchbar />
      <UserCard />
      <ChartBarInteractive />
      <ChartRadarDots />
    </main>
  );
}
