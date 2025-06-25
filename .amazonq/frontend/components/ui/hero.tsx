'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'
import FadeIn from '@/components/animations/fade-in'
import SlideUp from '@/components/animations/slide-up'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden" role="banner" aria-label="Hero section">
      <div className="absolute inset-0 gradient-bg opacity-10"></div>
      
      <div className="max-w-4xl mx-auto text-center section-padding relative z-10">
        <FadeIn delay={0.2}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Hi, I'm{' '}
            <span className="gradient-text">{SITE_CONFIG.name}</span>
          </h1>
        </FadeIn>

        <SlideUp delay={0.4}>
          <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-8">
            {SITE_CONFIG.title}
          </h2>
        </SlideUp>

        <FadeIn delay={0.6}>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            {SITE_CONFIG.description} | Building scalable cloud infrastructure and automating deployment pipelines
          </p>
        </FadeIn>

        <SlideUp delay={0.8}>
          <div className="flex justify-center space-x-6 mb-12" role="list" aria-label="Social media links">
            <Link
              href={SITE_CONFIG.github}
              className="p-3 rounded-full glass-effect hover:scale-110 transition-transform"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub profile"
            >
              <Github size={24} />
            </Link>
            <Link
              href={SITE_CONFIG.linkedin}
              className="p-3 rounded-full glass-effect hover:scale-110 transition-transform"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn profile"
            >
              <Linkedin size={24} />
            </Link>
            <Link
              href={`mailto:${SITE_CONFIG.email}`}
              className="p-3 rounded-full glass-effect hover:scale-110 transition-transform"
              aria-label="Send email"
            >
              <Mail size={24} />
            </Link>
          </div>
        </SlideUp>

        <FadeIn delay={1.0}>
          <Link
            href="/projects"
            className="inline-flex items-center px-8 py-4 gradient-bg text-white rounded-full font-semibold hover:scale-105 transition-transform"
          >
            View My Work
          </Link>
        </FadeIn>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ArrowDown className="text-gray-400" size={24} />
      </motion.div>
    </section>
  )
}