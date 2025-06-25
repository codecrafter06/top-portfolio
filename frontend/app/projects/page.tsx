import { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import ProjectsGrid from '@/components/ui/projects-grid'
import FadeIn from '@/components/animations/fade-in'
import PageTransition from '@/components/animations/page-transition'

export const metadata: Metadata = {
  title: `Projects - ${SITE_CONFIG.name}`,
  description: `Explore DevOps projects by ${SITE_CONFIG.name}. AWS infrastructure automation, Kubernetes monitoring, and CI/CD pipeline implementations.`,
  keywords: ['devops projects', 'aws infrastructure', 'kubernetes monitoring', 'terraform', 'ci-cd'],
  openGraph: {
    title: `DevOps Projects by ${SITE_CONFIG.name}`,
    description: 'AWS Infrastructure Automation, Kubernetes Monitoring Stack, and CI/CD Pipeline Projects',
    type: 'website',
    url: 'https://sagar-portfolio.vercel.app/projects',
  },
  twitter: {
    card: 'summary_large_image',
    title: `DevOps Projects - ${SITE_CONFIG.name}`,
    description: 'AWS & Kubernetes Projects Portfolio',
  },
}

export default function ProjectsPage() {
  return (
    <PageTransition>
      <div className="pt-16">
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h1 className="text-5xl font-bold text-center mb-8">
              My <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-16 max-w-3xl mx-auto">
              Here are some of the projects I've worked on. Each project represents 
              a unique challenge and showcases different aspects of my development skills.
            </p>
          </FadeIn>
        </div>
      </section>
      
      <ProjectsGrid />
      </div>
    </PageTransition>
  )
}