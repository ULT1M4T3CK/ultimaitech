import { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useAnalytics } from '../contexts/AnalyticsContext'
import AdminLogin from '../components/AdminLogin'
import AdminDashboard from '../components/AdminDashboard'

const Admin = () => {
  const { user } = useAuth()
  const { recordVisit } = useAnalytics()

  useEffect(() => {
    recordVisit('Admin')
  }, [recordVisit])

  return (
    <div className="min-h-screen bg-dark py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!user ? (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">
                Admin <span className="gradient-text">Access</span>
              </h1>
              <p className="text-light/70">
                Sign in to manage your portfolio and view analytics
              </p>
            </div>
            <AdminLogin />
          </div>
        ) : (
          <AdminDashboard />
        )}
      </div>
    </div>
  )
}

export default Admin
