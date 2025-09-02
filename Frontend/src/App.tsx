import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Admin from './pages/Admin'
import Contact from './pages/Contact'
import Services from './pages/Services'
import { AuthProvider } from './contexts/AuthContext'
import { AnalyticsProvider } from './contexts/AnalyticsContext'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="flex items-center space-x-2">
            <img
              src="/images/ultimaitech-logo.png"
              alt="UltimAItech Logo"
              className="w-8 h-8"
            />
            <h2 className="text-2xl font-bold text-primary">UltimAItech</h2>
          </div>
          <p className="text-light/70">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <AuthProvider>
      <AnalyticsProvider>
        <Router>
          <div className="min-h-screen bg-dark text-light">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/services" element={<Services />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AnalyticsProvider>
    </AuthProvider>
  )
}

export default App
