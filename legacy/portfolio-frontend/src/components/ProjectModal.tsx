import { useState, useEffect } from 'react'
import { X, Upload, Trash2 } from 'lucide-react'
import axios from 'axios'
import { Project } from '../types'

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (project: Project) => void
  project?: Project | null
  mode: 'add' | 'edit'
}

const ProjectModal = ({ isOpen, onClose, onSave, project, mode }: ProjectModalProps) => {
  const [formData, setFormData] = useState<Project>({
    title: '',
    description: '',
    image_path: '',
    technologies: [],
    project_url: '',
    github_url: '',
    featured: false
  })
  const [techInput, setTechInput] = useState('')
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imageUploaded, setImageUploaded] = useState(false)

  useEffect(() => {
    if (project && mode === 'edit') {
      setFormData(project)
      setImageUploaded(!!project.image_path)
    } else {
      setFormData({
        title: '',
        description: '',
        image_path: '',
        technologies: [],
        project_url: '',
        github_url: '',
        featured: false
      })
      setImageUploaded(false)
    }
  }, [project, mode])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting form data:', formData)
    console.log('Image uploaded status:', imageUploaded)
    console.log('Selected file:', selectedFile)
    
    if (selectedFile && !imageUploaded) {
      alert('Please upload the selected image before saving the project!')
      return
    }
    
    onSave(formData)
    onClose()
  }

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()]
      })
      setTechInput('')
    }
  }

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(t => t !== tech)
    })
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleFileUpload = async () => {
    if (!selectedFile) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('image', selectedFile)

      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })

      console.log('Image upload response:', response.data)
      
      setFormData(prev => ({
        ...prev,
        image_path: response.data.imagePath
      }))
      console.log('Updated form data with image path:', response.data.imagePath)
      setImageUploaded(true)
      setSelectedFile(null)
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image_path: ''
    }))
    setImageUploaded(false)
    setSelectedFile(null)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-dark-secondary rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {mode === 'add' ? 'Add New Project' : 'Edit Project'}
          </h2>
          <button
            onClick={onClose}
            className="text-light/70 hover:text-light transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-light/80 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-dark border border-secondary/20 rounded-lg text-light focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-light/80 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 bg-dark border border-secondary/20 rounded-lg text-light focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-light/80 mb-2">
              Project Image
            </label>
            
            {/* Current image display */}
            {formData.image_path && (
              <div className="mb-4">
                <img
                  src={formData.image_path}
                  alt="Project preview"
                  className="w-full h-32 object-cover rounded-lg border border-secondary/20"
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-green-500 flex items-center gap-2">
                    ✓ Image uploaded successfully
                  </span>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove Image
                  </button>
                </div>
              </div>
            )}

            {/* File upload interface */}
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="w-full px-3 py-2 bg-dark border border-secondary/20 rounded-lg text-light focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
              />
              
              {selectedFile && (
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleFileUpload}
                      disabled={uploading}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      {uploading ? 'Uploading...' : 'Upload Image'}
                    </button>
                    <span className="text-sm text-light/70">{selectedFile.name}</span>
                  </div>
                  {!imageUploaded && (
                    <div className="text-amber-500 text-sm flex items-center gap-2">
                      ⚠️ Don't forget to click "Upload Image" before saving the project!
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-light/80 mb-2">
              Technologies
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                className="flex-1 px-3 py-2 bg-dark border border-secondary/20 rounded-lg text-light focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                placeholder="Add technology"
              />
              <button
                type="button"
                onClick={addTechnology}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm flex items-center gap-2"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTechnology(tech)}
                    className="text-red-400 hover:text-red-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-light/80 mb-2">
                Project URL
              </label>
              <input
                type="url"
                value={formData.project_url}
                onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                className="w-full px-3 py-2 bg-dark border border-secondary/20 rounded-lg text-light focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                placeholder="https://example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-light/80 mb-2">
                GitHub URL
              </label>
              <input
                type="url"
                value={formData.github_url}
                onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                className="w-full px-3 py-2 bg-dark border border-secondary/20 rounded-lg text-light focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                placeholder="https://github.com/user/repo"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 text-primary bg-dark border-secondary/20 rounded focus:ring-primary/50"
            />
            <label htmlFor="featured" className="ml-2 text-sm text-light/80">
              Featured Project
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-light/70 hover:text-light transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              {mode === 'add' ? 'Add Project' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProjectModal
