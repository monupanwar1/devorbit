'use client';

import { getUserData, GithubUser } from '@/actions/github';
import { Loader2, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { RepoCommitChart } from './BarChart';
import { Button } from './ui/button';
import { Input } from './ui/input';
import UserCard from './UserCard';

export default function Searchbar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState<GithubUser | null>(null);
  const [loading, setLoading] = useState(false);

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

  const handleSearch = async () => {
    if (!username.trim) return;
    setLoading(true);
    const data = await getUserData(username.trim());
    setUser(data);
    setLoading(false);
  };

  return (
    <section className=" w-full flex flex-col max-w-7xl mx-auto space-y-3">
      <div>
        <p className="text-sm text-center text-muted-foreground mt-1">
          Search GitHub users or repositories — press{' '}
          <kbd className="px-1 py-0.5 bg-muted rounded">Ctrl</kbd> +{' '}
          <kbd className="px-1 py-0.5 bg-muted rounded">K</kbd>
        </p>
      </div>
      <div className="relative cursor-text">
        <span className="absolute inset-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
          @
        </span>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target?.value)}
          id="left-icon"
          ref={inputRef}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="pl-10 w-full"
          placeholder="Enter username"
        />
        <Button
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
      <div className="w-full gap-4">
        <UserCard user={user} />
        if(user){<RepoCommitChart username={username} />}
      </div>
    </section>
  );
}
