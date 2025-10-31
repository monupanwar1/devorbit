'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Badge } from './ui/badge';

export default function HeroSection() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center text-center px-6 space-y-4">
      <Badge variant="secondary">
        <Sparkles className="text-amber-300" /> Beta Now Live! Get Early Access
      </Badge>
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-7xl  text-[#082546] font-bold tracking-tight mb-4 "
      >
        DevOrbit
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-lg md:text-xl text-[#7E8696] max-w-2xl "
      >
        Turn your GitHub activity into a live dashboard — powered by AI
        insights, trends, and reports. Built for developers, by developers.
      </motion.p>

      {/* <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="w-full max-w-4xl rounded-2xl p-6 "
      >
        <Badge className='text-wrap' variant="secondary">
          <Sparkle className="h-6 w-6 text-blue-500 mr-3" />
          "DevOrbit transformed how I track my coding progress. The AI-driven
          insights are a game-changer!"
        </Badge>
      </motion.div> */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="flex gap-4"
      >
        <Link href="/dashboard">
          <Button className="px-6 py-3 text-lg font-semibold rounded-xl #0A2B57 transition-all">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
