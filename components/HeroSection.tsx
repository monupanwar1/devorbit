'use client';

import { ArrowRightIcon } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

import BaseButton from './common/base-button';
import { Badge } from './ui/badge';
import { TypingAnimation } from './ui/typing-animation';

export default function HeroSection() {
  return (
    <section className="font-geist flex min-h-screen w-full flex-col items-center justify-center space-y-4 px-6 text-center">
      <Badge className="primary-text font-geist outline">
        <Sparkles className="text-amber-300" /> Beta Now Live! Get Early Access
      </Badge>
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="primary-text mb-4 max-w-5xl text-3xl leading-6 font-bold tracking-tight md:text-5xl"
      >
        Build Your Developer{' '}
        <span>
          {' '}
          <TypingAnimation
            className="button-text"
            words={['Identity', 'Profile', ' Analytics', 'Insight']}
            loop
          />
        </span>
        <br />
        With AI-Powered Reports
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="secondary-text-muted mt-4 max-w-xl text-center tracking-tight"
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
        <BaseButton className="rounded-lg px-4" href="#">
          Get started{' '}
          <span>
            <ArrowRightIcon size={16} />
          </span>
        </BaseButton>
      </motion.div>
    </section>
  );
}
