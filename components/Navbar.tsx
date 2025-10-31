import Link from 'next/link';
import { Button } from './ui/button';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-3 md:px-10 py-2 md:py-4 ">
      <nav
        className="backdrop-blur-2xl bg-accent rounded-md px-6 py-3 flex items-center justify-between shadow-5xl"
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
