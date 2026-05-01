import Link from 'next/link';

import { Button } from './ui/button';

export default function Navbar() {
  return (
    <header className="font-fixed top-0 left-0 z-50 w-full px-3 py-2 md:px-10 md:py-4">
      <nav
        className="bg-accent shadow-5xl flex items-center justify-between rounded-md px-6 py-3 backdrop-blur-2xl"
        aria-label="Main navigation"
      >
        <Link href="/" className="text-xl font-semibold">
          DevOrbit
        </Link>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="lg">
            <Link href="#" className="text-neutral-900">
              Signup
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
