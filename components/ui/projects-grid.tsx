'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Github } from 'lucide-react'
import { PROJECTS } from '@/lib/constants'
import type { Project } from '@/lib/types'
import FadeIn from '@/components/animations/fade-in'
import SlideUp from '@/components/animations/slide-up'
import { Suspense } from 'react'

interface ProjectCardProps {
  project: Project
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <SlideUp delay={index * 0.2}>
      <motion.div
        whileHover={{ y: -10 }}
        className="bg-white dark:bg-dark-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
        role="listitem"
        aria-label={`Project: ${project.title}`}
      >
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 flex items-center justify-center">
          <div className="text-white text-center p-4">
            <div className="text-2xl font-bold mb-2">{project.title}</div>
            <div className="text-sm opacity-80">DevOps Project</div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex space-x-4" role="list" aria-label="Project links">
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label={`View ${project.title} source code on GitHub`}
            >
              <Github size={18} />
              <span>Code</span>
            </Link>
            <Link
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label={`View ${project.title} live demo`}
            >
              <ExternalLink size={18} />
              <span>Demo</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </SlideUp>
  )
}

export default function ProjectsGrid() {
  return (
    <section className="section-padding" aria-label="Featured projects">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <h2 className="text-4xl font-bold text-center mb-16">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </FadeIn>

        <Suspense fallback={<div className="text-center">Loading projects...</div>}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" role="list">
            {PROJECTS.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </Suspense>
      </div>
    </section>
  )
}