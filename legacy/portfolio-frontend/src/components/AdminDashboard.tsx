import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Plus, Edit, Trash2, Users, TrendingUp, Eye, Star } from 'lucide-react'
import axios from 'axios'
import ProjectModal from './ProjectModal'
import { Project, AnalyticsData } from '../types'

const AdminDashboard = () => {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'analytics'>('overview')
  const [projects, setProjects] = useState<Project[]>([])
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (activeTab === 'overview' || activeTab === 'projects') {
      fetchProjects()
    }
    if (activeTab === 'overview' || activeTab === 'analytics') {
      fetchAnalytics()
    }
  }, [activeTab])

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects')
      setProjects(response.data)
      setError(null) // Clear any previous errors
    } catch (error: any) {
      console.error('Failed to fetch projects:', error)
      setError('Failed to load projects. Please check your connection and try again.')
    }
  }

  const fetchAnalytics = async () => {
    try {
      const [realtimeResponse, statsResponse] = await Promise.all([
        axios.get('/api/analytics/realtime'),
        axios.get('/api/analytics/stats')
      ])
      
      setAnalytics({
        current_visitors: realtimeResponse.data.current_visitors,
        total_visitors_30_days: statsResponse.data.total_visitors_30_days,
        daily_breakdown: statsResponse.data.daily_breakdown,
        top_pages: statsResponse.data.top_pages
      })
    } catch (error: any) {
      console.error('Failed to fetch analytics:', error)
      if (error.response?.status === 401 || error.response?.status === 403) {
        setError('Session expired. Please log in again.')
        logout()
      } else {
        setError('Failed to load analytics data. Please try again.')
      }
    }
  }

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    
    try {
      await axios.delete(`/api/projects/${id}`)
      fetchProjects()
      setError(null)
    } catch (error: any) {
      console.error('Failed to delete project:', error)
      if (error.response?.status === 401 || error.response?.status === 403) {
        setError('Session expired. Please log in again.')
        logout()
      } else {
        setError('Failed to delete project. Please try again.')
      }
    }
  }

  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      const project = projects.find(p => p.id === id)
      if (!project) return
      
      await axios.put(`/api/projects/${id}`, {
        ...project,
        featured: !featured
      })
      fetchProjects()
      setError(null)
    } catch (error: any) {
      console.error('Failed to update project:', error)
      if (error.response?.status === 401 || error.response?.status === 403) {
        setError('Session expired. Please log in again.')
        logout()
      } else {
        setError('Failed to update project. Please try again.')
      }
    }
  }

  const openAddModal = () => {
    setModalMode('add')
    setEditingProject(null)
    setIsModalOpen(true)
  }

  const openEditModal = (project: Project) => {
    setModalMode('edit')
    setEditingProject(project)
    setIsModalOpen(true)
  }

  const handleSaveProject = async (projectData: Project) => {
    try {
      setError(null) // Clear any previous errors
      
      // Ensure token is available
      const token = localStorage.getItem('authToken')
      if (!token) {
        setError('No authentication token found. Please log in again.')
        return
      }
      
      // Set auth header explicitly for this request
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
      
      console.log('Saving project:', projectData)
      console.log('Using token:', token.substring(0, 20) + '...')
      
      if (modalMode === 'add') {
        const response = await axios.post('/api/projects', projectData, config)
        console.log('Project created:', response.data)
      } else {
        if (!editingProject?.id) {
          setError('Project ID not found for editing')
          return
        }
        const response = await axios.put(`/api/projects/${editingProject.id}`, projectData, config)
        console.log('Project updated:', response.data)
      }
      fetchProjects()
      setIsModalOpen(false)
      setEditingProject(null)
    } catch (error: any) {
      console.error('Failed to save project:', error)
      if (error.response) {
        console.error('Error response:', error.response.data)
        console.error('Error status:', error.response.status)
        
        // Handle validation errors
        if (error.response.status === 400 && error.response.data.errors) {
          const validationErrors = error.response.data.errors.map((err: any) => err.msg).join(', ')
          setError(`Validation errors: ${validationErrors}`)
        } else if (error.response.data.message) {
          setError(error.response.data.message)
        } else {
          setError(`Failed to save project: ${error.response.status}`)
        }
      } else {
        setError('Failed to save project. Please check your connection and try again.')
      }
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Admin <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-light/70">Welcome back, {user?.username}</p>
        </div>
        <button
          onClick={logout}
          className="btn-outline"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-dark-secondary rounded-lg p-1 mb-8">
        {[
          { id: 'overview', label: 'Overview', icon: TrendingUp },
          { id: 'projects', label: 'Projects', icon: Star },
          { id: 'analytics', label: 'Analytics', icon: Users }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-md font-medium transition-colors duration-200 ${
              activeTab === tab.id
                ? 'bg-primary text-white'
                : 'text-light/70 hover:text-primary'
            }`}
          >
            <tab.icon className="h-5 w-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {analytics?.current_visitors || 0}
              </h3>
              <p className="text-light/70">Current Visitors</p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {analytics?.total_visitors_30_days || 0}
              </h3>
              <p className="text-light/70">Total Visitors (30 days)</p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {projects.filter(p => p.featured).length}
              </h3>
              <p className="text-light/70">Featured Projects</p>
            </div>
          </div>

          {/* Recent Projects */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Recent Projects</h3>
            <div className="space-y-3">
              {projects.slice(0, 5).map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 bg-dark rounded-lg">
                  <div>
                    <h4 className="font-medium">{project.title}</h4>
                    <p className="text-sm text-light/70">{project.description.substring(0, 60)}...</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => project.id && toggleFeatured(project.id, project.featured)}
                      className={`px-2 py-1 rounded text-xs ${
                        project.featured 
                          ? 'bg-primary text-white' 
                          : 'bg-secondary/20 text-secondary'
                      }`}
                    >
                      {project.featured ? 'Featured' : 'Feature'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Project Management</h2>
            <button onClick={openAddModal} className="btn-primary">
              <Plus className="h-5 w-5 mr-2" />
              Add Project
            </button>
          </div>

          <div className="grid gap-4">
            {projects.map((project) => (
              <div key={project.id} className="card">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-light/70 mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-secondary/20 text-secondary text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => project.id && toggleFeatured(project.id, project.featured)}
                      className={`px-3 py-1 rounded text-sm ${
                        project.featured 
                          ? 'bg-primary text-white' 
                          : 'bg-secondary/20 text-secondary'
                      }`}
                    >
                      {project.featured ? 'Featured' : 'Feature'}
                    </button>
                    <button 
                      onClick={() => openEditModal(project)}
                      className="p-2 text-light/70 hover:text-primary transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => project.id && deleteProject(project.id)}
                      className="p-2 text-light/70 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && analytics && (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold">Visitor Analytics</h2>
          
          {/* Daily Visits Chart */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Daily Visits (Last 30 Days)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.daily_breakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#665C76" />
                <XAxis dataKey="date" stroke="#EFEAF3" />
                <YAxis stroke="#EFEAF3" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1A1A1A', 
                    border: '1px solid #665C76',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="visits" stroke="#7066AD" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Pages */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Top Visited Pages</h3>
            <div className="space-y-3">
              {analytics.top_pages.map((page, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-dark rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-primary">#{index + 1}</span>
                    <span className="font-medium">{page.page_visited}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-light/50" />
                    <span className="font-semibold">{page.visits} visits</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 max-w-md">
          <div className="flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-4 text-white hover:text-red-100"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingProject(null)
          setError(null) // Clear errors when closing modal
        }}
        onSave={handleSaveProject}
        project={editingProject}
        mode={modalMode}
      />
    </div>
  )
}

export default AdminDashboard
