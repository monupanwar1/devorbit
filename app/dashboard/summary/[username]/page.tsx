import SummaryView from '@/components/summary-view';

export default function SummaryPage({
  params,
}: {
  params: { username: string };
}) {
  return <SummaryView username={params.username} />;
}
