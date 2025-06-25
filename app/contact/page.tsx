import { Metadata } from 'next'
import { Mail, MapPin, Phone } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'
import ContactForm from '@/components/ui/contact-form'
import FadeIn from '@/components/animations/fade-in'
import SlideUp from '@/components/animations/slide-up'
import PageTransition from '@/components/animations/page-transition'

export const metadata: Metadata = {
  title: `Contact - ${SITE_CONFIG.name}`,
  description: `Get in touch with ${SITE_CONFIG.name}. Available for DevOps consulting, cloud architecture, and full-time opportunities.`,
  keywords: ['contact', 'devops consultant', 'hire devops engineer', 'cloud architect'],
  openGraph: {
    title: `Contact ${SITE_CONFIG.name} - DevOps Engineer`,
    description: 'Available for DevOps consulting, cloud architecture projects, and full-time opportunities.',
    type: 'website',
    url: 'https://sagar-portfolio.vercel.app/contact',
  },
  twitter: {
    card: 'summary',
    title: `Contact ${SITE_CONFIG.name}`,
    description: 'DevOps Engineer available for consulting',
  },
}

const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'Email',
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'San Francisco, CA',
    href: '#',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
]

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="pt-16">
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h1 className="text-5xl font-bold text-center mb-8">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-16 max-w-3xl mx-auto">
              I'm always interested in hearing about new opportunities and projects. 
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <SlideUp>
              <div>
                <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
                <div className="space-y-6">
                  {CONTACT_INFO.map((info) => {
                    const Icon = info.icon
                    return (
                      <div key={info.label} className="flex items-center space-x-4">
                        <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                          <Icon className="text-primary-600 dark:text-primary-400" size={24} />
                        </div>
                        <div>
                          <p className="font-semibold">{info.label}</p>
                          <a
                            href={info.href}
                            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          >
                            {info.value}
                          </a>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-12">
                  <h3 className="text-xl font-bold mb-4">Let's Connect</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    I'm currently available for freelance work and full-time opportunities. 
                    If you have a project in mind or just want to chat about technology, 
                    don't hesitate to reach out.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    I typically respond within 24 hours.
                  </p>
                </div>
              </div>
            </SlideUp>

            <SlideUp delay={0.2}>
              <div>
                <h2 className="text-2xl font-bold mb-8">Send a Message</h2>
                <ContactForm />
              </div>
            </SlideUp>
          </div>
        </div>
      </section>
      </div>
    </PageTransition>
  )
}