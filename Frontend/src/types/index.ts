export interface Project {
  id?: string
  title: string
  description: string
  image_path?: string
  technologies: string[]
  project_url?: string
  github_url?: string
  featured: boolean
  created_at?: string
}

export interface AnalyticsData {
  current_visitors: number
  total_visitors_30_days: number
  daily_breakdown: Array<{ date: string; visits: number }>
  top_pages: Array<{ page_visited: string; visits: number }>
}
