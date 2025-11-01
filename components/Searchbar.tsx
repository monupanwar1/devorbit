'use client';

import { useEffect, useRef } from 'react';
import { Input } from './ui/input';

export default function Searchbar() {
  const inputRef = useRef<HTMLInputElement>(null);

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

  return (
    <section className="w-full max-w-sm mx-auto space-y-3">
      <div>
        <p className="text-sm text-muted-foreground mt-1">
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
          id="left-icon"
          ref={inputRef}
          className="pl-10"
          placeholder="Enter username"
        />
      </div>
    </section>
  );
}
