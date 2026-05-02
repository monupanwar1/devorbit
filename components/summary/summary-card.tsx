'use client';

import { Button } from '@base-ui/react';
import { Dialog } from '@base-ui/react/dialog';

import Image from 'next/image';

import { InsightData } from '@/types/type';

type User = {
  name: string;
  login: string;
  avatar_url: string;
};

type Props = {
  user: User;
  insights?: InsightData[];
  summary: string;
};

export default function SummaryCard({ user, summary }: Props) {
  return (
    <article className="relative rounded-2xl border p-6">
      {/* 👤 Header */}
      <header className="mb-4 flex items-center gap-3">
        <Image
          src={user.avatar_url}
          alt={`${user.login} avatar`}
          className="h-10 w-10 rounded-full"
        />
        <div>
          <h2 className="text-lg font-semibold">{user.name || user.login}</h2>
          {user.name && <p className="text-xs text-zinc-400">@{user.login}</p>}
        </div>
      </header>

      {/* ⚡ Insights */}
      <section className="mb-4 flex flex-wrap gap-2">
        {/* {insights.map((item, i) => (
          <span
            key={i}
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs"
          >
            {item.metric}: {item.value}
          </span>
        ))} */}
      </section>

      {/* 🧠 Summary Preview */}
      <section>
        <p className="line-clamp-3 text-sm text-zinc-300">{summary}</p>
      </section>

      {/* 🔥 CTA + Dialog */}
      <Dialog.Root>
        <Dialog.Trigger className="absolute top-4 right-4 rounded-xl px-3 py-1.5 text-xs hover:bg-white/20">
          <Button className="font-inherit m-0 flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base leading-6 font-normal text-gray-900 outline-0 transition ease-in select-none hover:bg-gray-300">
            ✨ View Summary
          </Button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 bg-black/60" />

          <Dialog.Popup className="fixed top-1/2 left-1/2 w-[90%] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="mb-2 text-lg font-semibold">Professional Summary</h3>

            <p className="text-sm leading-relaxed whitespace-pre-wrap text-zinc-300">
              {summary}
            </p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => navigator.clipboard.writeText(summary)}
                className="rounded-lg bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20"
              >
                📋 Copy
              </button>

              <Dialog.Close className="rounded-lg bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20">
                Close
              </Dialog.Close>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </article>
  );
}
