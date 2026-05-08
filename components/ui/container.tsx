import React from 'react';

import Footer from '../Footer';
import Navbar from '../Navbar';

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto min-h-screen max-w-7xl">
      {/* left vertical */}
      <div className="absolute top-0 bottom-0 left-0 w-px bg-white/10" />

      {/* right vertical */}
      <div className="absolute top-0 right-0 bottom-0 w-px bg-white/10" />

      {/* top horizontal overflow */}
      <div className="absolute top-24 left-1/2 h-px w-screen -translate-x-1/2 bg-white/10" />

      {/* bottom horizontal overflow */}
      <div className="absolute bottom-24 left-1/2 h-px w-screen -translate-x-1/2 bg-white/10" />

      <div className="relative z-10">
        <header className="flex h-24 items-center px-8">
          <Navbar />
        </header>

        {/* content */}
        <main className="flex-1 px-8">{children}</main>

        {/* footer */}

        <footer className="flex h-24 items-center px-8">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
