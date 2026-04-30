'use client';

import { Loader2, Search } from 'lucide-react';

import { useEffect, useRef, useState } from 'react';

import { getGithubAnalytics } from '@/actions/github';
import { GithubAnalytics, GithubUser } from '@/types/type';

import { RepoCommitChart } from './BarChart';
import { ChartLineDefault } from './LineChart';
import { ChartRadarDots } from './RadarChart';
import UserCard from './UserCard';
import { Button } from './ui/button';
import { Input } from './ui/input';

/* ================= COMPONENT ================= */

export default function Searchbar() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState('');
  const [user, setUser] = useState<GithubUser | null>(null);
  const [analytics, setAnalytics] = useState<GithubAnalytics | null>(null);
  const [loading, setLoading] = useState(false);

  /* ---------- Ctrl + K focus ---------- */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  /* ---------- Search ---------- */
  const handleSearch = async () => {
    const trimmed = username.trim();
    if (!trimmed) return;

    try {
      setLoading(true);

      const data = (await getGithubAnalytics(
        trimmed,
      )) as GithubAnalytics | null;

      if (data) {
        setUser(data.user);
        setAnalytics(data);
      } else {
        setUser(null);
        setAnalytics(null);
      }
    } catch (error) {
      console.error('❌ Error fetching analytics:', error);
      setUser(null);
      setAnalytics(null);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col space-y-3">
      {/* 🔍 Info */}
      <div>
        <p className="text-muted-foreground mt-1 text-center text-sm">
          Search GitHub users or repositories — press{' '}
          <kbd className="bg-muted rounded px-1 py-0.5">Ctrl</kbd> +{' '}
          <kbd className="bg-muted rounded px-1 py-0.5">K</kbd>
        </p>
      </div>

      {/* 🔎 Input */}
      <div className="relative cursor-text">
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          @
        </span>

        <Input
          ref={inputRef}
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="w-full pl-10"
          placeholder="Enter username"
        />

        <Button
          type="button"
          variant="ghost"
          onClick={handleSearch}
          disabled={loading}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* 📊 Results */}
      <div className="w-full gap-4">
        <UserCard user={user} />

        {analytics && (
          <>
            <RepoCommitChart username={username} data={analytics.topRepos} />

            <ChartRadarDots username={username} data={analytics.insights} />

            <ChartLineDefault username={username} data={analytics.activity} />
          </>
        )}
      </div>
    </section>
  );
}
