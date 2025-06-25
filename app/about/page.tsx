import { Metadata } from 'next'
import Image from 'next/image'
import { Calendar, MapPin, Code, Coffee } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'
import FadeIn from '@/components/animations/fade-in'
import SlideUp from '@/components/animations/slide-up'
import PageTransition from '@/components/animations/page-transition'

export const metadata: Metadata = {
  title: `About - ${SITE_CONFIG.name}`,
  description: `Learn more about ${SITE_CONFIG.name}, ${SITE_CONFIG.title}. Cloud DevOps Engineer with 4+ years experience in AWS, Kubernetes, and Infrastructure Automation.`,
  keywords: ['about', 'devops engineer', 'cloud architect', 'aws expert', 'kubernetes'],
  openGraph: {
    title: `About ${SITE_CONFIG.name} - ${SITE_CONFIG.title}`,
    description: `Cloud DevOps Engineer specializing in AWS, Kubernetes, and CI/CD automation. 4+ years of experience building scalable infrastructure.`,
    type: 'profile',
    url: 'https://sagar-portfolio.vercel.app/about',
  },
  twitter: {
    card: 'summary',
    title: `About ${SITE_CONFIG.name}`,
    description: 'Cloud DevOps Engineer | AWS & Kubernetes Expert',
  },
}

const EXPERIENCE = [
  {
    title: 'Cloud DevOps Engineer',
    company: 'Tech Solutions Inc',
    period: '2022 - Present',
    description: 'Architecting and managing AWS cloud infrastructure, implementing CI/CD pipelines, and automating deployment processes using Terraform and Kubernetes.',
  },
  {
    title: 'DevOps Engineer',
    company: 'Digital Innovations',
    period: '2020 - 2022',
    description: 'Designed containerized applications with Docker, managed Kubernetes clusters, and implemented monitoring solutions with Prometheus and Grafana.',
  },
]

const STATS = [
  { label: 'Years Experience', value: '4+' },
  { label: 'Projects Completed', value: '50+' },
  { label: 'Happy Clients', value: '30+' },
  { label: 'Cups of Coffee', value: '1000+' },
]

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="pt-16">
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h1 className="text-5xl font-bold text-center mb-16">
              About <span className="gradient-text">Me</span>
            </h1>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <SlideUp>
              <div className="relative">
                <div className="w-80 h-80 mx-auto rounded-full overflow-hidden">
                  <Image
                    src="/images/profile.jpg"
                    alt={SITE_CONFIG.name}
                    width={320}
                    height={320}
                    className="object-cover"
                  />
                </div>
              </div>
            </SlideUp>

            <SlideUp delay={0.2}>
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Passionate Developer & Problem Solver
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  I'm a Cloud DevOps Engineer with a passion for building scalable, 
                  reliable infrastructure and automating complex deployment processes. 
                  With over 4 years of experience in cloud technologies, I specialize 
                  in AWS, Kubernetes, and Infrastructure as Code.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  When I'm not optimizing CI/CD pipelines, you can find me exploring 
                  new cloud services, contributing to DevOps communities, or 
                  experimenting with the latest container orchestration technologies.
                </p>
                <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <MapPin size={18} />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={18} />
                    <span>Available for work</span>
                  </div>
                </div>
              </div>
            </SlideUp>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {STATS.map((stat, index) => (
              <SlideUp key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              </SlideUp>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <h2 className="text-3xl font-bold text-center mb-12">
              Work <span className="gradient-text">Experience</span>
            </h2>
          </FadeIn>

          <div className="space-y-8">
            {EXPERIENCE.map((exp, index) => (
              <SlideUp key={exp.title} delay={index * 0.2}>
                <div className="bg-white dark:bg-dark-700 p-6 rounded-xl shadow-lg">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{exp.title}</h3>
                      <p className="text-primary-600 dark:text-primary-400">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {exp.period}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {exp.description}
                  </p>
                </div>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>
      </div>
    </PageTransition>
  )
}