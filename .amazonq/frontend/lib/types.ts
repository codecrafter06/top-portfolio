export interface Project {
  id: number
  title: string
  description: string
  image: string
  tech: string[]
  github: string
  demo: string
}

export interface Skill {
  name: string
  level: number
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}