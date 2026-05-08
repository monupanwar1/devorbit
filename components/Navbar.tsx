'use client';
import { Button } from '@base-ui/react';
import { GithubLogoIcon } from '@phosphor-icons/react';

import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="top-0 left-0 z-50 w-full px-3 py-2 md:px-10 md:py-4">
      <nav
        className="shadow-5xl flex items-center justify-between rounded-md px-6 py-3 backdrop-blur-2xl"
        aria-label="Main navigation"
      >
        <Link href="/" className="font-geist primary-text text-2xl font-bold">
          DevOrbit
        </Link>
        <div className="font-geist flex items-center space-x-6 font-normal">
          <Button>
            <Link
              href="#"
              className="button-color flex items-center gap-2 rounded-md px-8 py-1 text-black"
            >
              <span>
                <GithubLogoIcon size={17} />
              </span>
              Star on Github
            </Link>
          </Button>
          <Button>
            <Link
              href="#"
              className="button-color flex items-center gap-2 rounded-md px-8 py-1 text-black"
            >
              Signup
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
