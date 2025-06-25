'use client'

import { motion } from 'framer-motion'
import { SKILLS } from '@/lib/constants'
import FadeIn from '@/components/animations/fade-in'
import SlideUp from '@/components/animations/slide-up'

export default function Skills() {
  return (
    <section className="section-padding bg-gray-50 dark:bg-dark-800" aria-label="Skills and technologies">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <h2 className="text-4xl font-bold text-center mb-16">
            DevOps <span className="gradient-text">Technologies</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list" aria-label="Technical skills">
          {SKILLS.map((skill, index) => (
            <SlideUp key={skill.name} delay={index * 0.1}>
              <div className="bg-white dark:bg-dark-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow" role="listitem">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">{skill.name}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {skill.level}%
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-dark-600 rounded-full h-2" role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100} aria-label={`${skill.name} proficiency: ${skill.level}%`}>
                  <motion.div
                    className="gradient-bg h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                  />
                </div>
              </div>
            </SlideUp>
          ))}
        </div>
      </div>
    </section>
  )
}