import { Skeleton } from './ui/skeleton';

export default function SummarySkeleton() {
  return (
    <main className="mx-auto max-w-4xl space-y-8 p-6">
      {/* Header */}
      <section className="space-y-3">
        <Skeleton className="h-6 w-52" />
        <Skeleton className="h-4 w-72" />
      </section>

      {/* Sections */}
      {['Overview', 'Summary', 'Projects', 'Activity', 'Assessment'].map(
        (_, i) => (
          <section key={i} className="space-y-3">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-4/6" />
          </section>
        ),
      )}
    </main>
  );
}
