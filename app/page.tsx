import Hero from '@/components/ui/hero'
import Skills from '@/components/ui/skills'
import ProjectsGrid from '@/components/ui/projects-grid'
import PageTransition from '@/components/animations/page-transition'

export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <Skills />
      <ProjectsGrid />
    </PageTransition>
  )
}