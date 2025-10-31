'use client';

import { Input } from './ui/input';

export default function Searchbar() {
  return (
    <section className="w-full max-w-sm mx-auto">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          @
        </span>
        <Input id="left-icon" className="pl-10 " placeholder="enter username" />
      </div>
    </section>
  );
}
