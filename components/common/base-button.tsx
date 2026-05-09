import { ReactNode } from 'react';

import Link from 'next/link';

import { cn } from '@/lib/utils';

type BaseButtonProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

export default function BaseButton({
  href,
  className,
  children,
}: BaseButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'button-color font-geist flex items-center gap-2 rounded-md px-8 py-1',
        className,
      )}
    >
      {children}
    </Link>
  );
}
