import { useState, useEffect } from 'react'
import { ExternalLink, Github, Star, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAnalytics } from '../contexts/AnalyticsContext'
import axios from 'axios'
import { staticProjects } from '../data/staticProjects'
import SEOHead from '../components/SEOHead'
import { portfolioSchema, breadcrumbSchema } from '../utils/structuredData'

interface Project {
  id: string
  title: string
  description: string
  image_path?: string
  technologies: string[]
  project_url?: string
  github_url?: string
  featured: boolean
  created_at: string
}

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'featured'>('all')
  const { recordVisit } = useAnalytics()

  useEffect(() => {
    recordVisit('Portfolio')
    fetchProjects()
  }, [recordVisit])

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects')
      setProjects(response.data)
      setError(null)
    } catch (error: any) {
      console.error('Failed to fetch projects:', error)
      console.log('Using static project data as fallback')
      // Use static data as fallback when API is not available
      setProjects(staticProjects)
      setError(null) // Don't show error when using fallback data
    } finally {
      setLoading(false)
    }
  }

  const filteredProjects = filter === 'featured' 
    ? projects.filter(p => p.featured)
    : projects

  const breadcrumbs = [
    { name: 'Home', url: 'https://ultimaitech.com' },
    { name: 'Portfolio', url: 'https://ultimaitech.com/portfolio' }
  ]

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [portfolioSchema(projects), breadcrumbSchema(breadcrumbs)]
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-light/70">Loading projects...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-4">Unable to Load Projects</h2>
          <p className="text-light/70 mb-6">{error}</p>
          <button 
            onClick={() => {
              setError(null)
              setLoading(true)
              fetchProjects()
            }}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Portfolio - UltimAItech | Web Development Projects & AI Solutions"
        description="Explore UltimAItech's portfolio of innovative web development projects, AI integrations, and digital solutions. See our React, Node.js, and full-stack development work."
        keywords="portfolio, web development projects, React projects, Node.js applications, AI solutions, full-stack development, UltimAItech projects"
        canonical="https://ultimaitech.com/portfolio"
        ogTitle="UltimAItech Portfolio - Innovative Web Development Projects"
        ogDescription="Discover our latest projects and creative solutions showcasing expertise in web development, AI integration, and modern digital solutions."
        ogImage="https://ultimaitech.com/images/portfolio-og-image.png"
        structuredData={combinedSchema}
      />
      {/* Hero Section */}
      <section className="relative py-12 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="text-xl md:text-2xl text-light/70 max-w-3xl mx-auto">
              Discover our latest projects and creative solutions that showcase our expertise 
              in web development and design.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-2 bg-dark-secondary rounded-lg p-1 max-w-md mx-auto">
            <button
              onClick={() => setFilter('featured')}
              className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                filter === 'featured'
                  ? 'bg-primary text-white'
                  : 'text-light/70 hover:text-primary'
              }`}
            >
              Featured ({projects.filter(p => p.featured).length})
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                filter === 'all'
                  ? 'bg-primary text-white'
                  : 'text-light/70 hover:text-primary'
              }`}
            >
              All Projects ({projects.length})
            </button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-dark-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-light/70 text-lg">No projects found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div key={project.id} className="card group">
                  {/* Project Image */}
                  <div className="relative mb-6 overflow-hidden rounded-lg">
                    {project.image_path ? (
                      <img
                        src={project.image_path}
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Star className="h-8 w-8 text-primary" />
                          </div>
                          <p className="text-primary font-medium">{project.title}</p>
                        </div>
                      </div>
                    )}
                    
                    {project.featured && (
                      <div className="absolute top-3 right-3 bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-light/70 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-secondary/20 text-secondary text-sm rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project Links */}
                    <div className="flex space-x-3">
                      {project.project_url && project.project_url.trim() !== '' && (
                        <a
                          href={project.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-200"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span className="text-sm">Live Demo</span>
                        </a>
                      )}
                      {project.github_url && project.github_url.trim() !== '' && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-light/70 hover:text-primary transition-colors duration-200"
                        >
                          <Github className="h-4 w-4" />
                          <span className="text-sm">Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Portfolio
