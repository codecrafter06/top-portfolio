export const SITE_CONFIG = {
  name: 'Sagar Kumar Behera',
  title: 'Cloud DevOps Engineer',
  description: 'Obsessed with CI/CD & Infrastructure Automation',
  email: 'sagarkumarb980@gmail.com',
  github: 'https://github.com/codecrafter06',
  linkedin: 'https://linkedin.com/in/sagarkumarb980',
} as const

export const NAVIGATION_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
] as const

export const SKILLS = [
  { name: 'AWS', level: 95 },
  { name: 'Docker', level: 90 },
  { name: 'Kubernetes', level: 85 },
  { name: 'GitHub Actions', level: 90 },
  { name: 'Linux', level: 95 },
  { name: 'Terraform', level: 85 },
  { name: 'Jenkins', level: 80 },
] as const

export const PROJECTS = [
  {
    id: 1,
    title: 'AWS Infrastructure Automation',
    description: 'Complete CI/CD pipeline with Terraform, Docker, and AWS services for scalable microservices deployment',
    image: '/images/aws-infrastructure.jpg',
    tech: ['AWS', 'Terraform', 'Docker', 'GitHub Actions'],
    github: 'https://github.com/codecrafter06/aws-infrastructure-automation',
    demo: 'https://aws-infra-demo.com',
  },
  {
    id: 2,
    title: 'Kubernetes Monitoring Stack',
    description: 'Production-ready monitoring solution with Prometheus, Grafana, and AlertManager on Kubernetes',
    image: '/images/k8s-monitoring.jpg',
    tech: ['Kubernetes', 'Prometheus', 'Grafana', 'Helm'],
    github: 'https://github.com/codecrafter06/k8s-monitoring-stack',
    demo: 'https://k8s-monitoring-demo.com',
  },
] as const

export const API_ENDPOINTS = {
  contact: process.env.NODE_ENV === 'production' 
    ? process.env.NEXT_PUBLIC_API_URL + '/api/contact'
    : 'http://localhost:5000/api/contact',
} as const