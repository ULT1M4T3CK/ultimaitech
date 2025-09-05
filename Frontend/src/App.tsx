import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import LazyImage from './components/LazyImage'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Admin from './pages/Admin'
import Contact from './pages/Contact'
import Services from './pages/Services'
import { AuthProvider } from './contexts/AuthContext'
import { AnalyticsProvider } from './contexts/AnalyticsContext'
import { optimizeLoading, initWebVitals } from './utils/webVitals'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initialize performance monitoring and optimizations
    optimizeLoading()
    initWebVitals()
    
    // Set loading to false immediately - no artificial delay needed
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <LazyImage
            src="/images/ultimaitech-logo.png"
            alt="UltimAItech Logo"
            className="mx-auto mb-4"
            width={100}
            height={100}
          />
          <h2 className="text-2xl font-bold text-primary mb-2">UltimAItech</h2>
          <p className="text-light/70">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  )
}

export default App
