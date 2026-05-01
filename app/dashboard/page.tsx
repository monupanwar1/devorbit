import Searchbar from '@/components/Searchbar';

export default function Page() {
  return (
    <main className="mx-auto flex min-h-svh max-w-7xl flex-col space-y-4 px-4">
      <section className="container mt-10 flex flex-col items-center justify-center space-y-2">
        <h1 className="text-3xl font-bold md:text-5xl">Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          Welcome to your dashboard! Here you can find an overview of your
          account and recent activity.
        </p>
      </section>

      <Searchbar />
    </main>
  );
}
