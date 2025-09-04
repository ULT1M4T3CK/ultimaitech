import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Code, Palette, Zap } from 'lucide-react'
import { useAnalytics } from '../contexts/AnalyticsContext'
import SEOHead from '../components/SEOHead'
import { organizationSchema, websiteSchema, serviceSchema } from '../utils/structuredData'

const Home = () => {
  const { recordVisit } = useAnalytics()

  useEffect(() => {
    recordVisit('Home')
  }, [recordVisit])

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [organizationSchema, websiteSchema, serviceSchema]
  }

  return (
    <div className="min-h-screen">
      <SEOHead
        title="UltimAItech - AI-Powered Web Development & Digital Solutions"
        description="Transform your digital presence with UltimAItech. Expert web development, AI integration, and innovative digital solutions for modern businesses. Get cutting-edge websites and applications."
        keywords="web development, AI development, digital solutions, React development, Node.js, full-stack development, artificial intelligence, web applications, mobile apps, UltimAItech"
        canonical="https://ultimaitech.com"
        ogTitle="UltimAItech - AI-Powered Web Development & Digital Solutions"
        ogDescription="Transform your digital presence with expert web development, AI integration, and innovative digital solutions. Professional React, Node.js, and full-stack development services."
        ogImage="https://ultimaitech.com/images/ultimaitech-og-image.png"
        structuredData={combinedSchema}
      />
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/images/hero-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-dark/80"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
              Welcome to{' '}
              <span className="gradient-text">UltimAItech</span>
            </h1>
            <p className="text-xl md:text-2xl text-light/80 mb-8 max-w-2xl mx-auto animate-slide-up">
              Where innovation meets creativity. We craft exceptional digital experiences 
              that inspire and engage.
            </p>
            <div className="flex justify-center animate-slide-up">
              <Link to="/portfolio" className="btn-primary">
                View Our Work
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-dark-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              What We <span className="gradient-text">Do</span>
            </h2>
            <p className="text-xl text-light/70 max-w-2xl mx-auto">
              We specialize in creating cutting-edge digital solutions that drive results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center group">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 transition-colors duration-300">
                <Code className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Web Development</h3>
              <p className="text-light/70">
                Modern, responsive websites and web applications built with the latest technologies
              </p>
            </div>

            <div className="card text-center group">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 transition-colors duration-300">
                <Palette className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">UI/UX Design</h3>
              <p className="text-light/70">
                Beautiful, intuitive interfaces that provide exceptional user experiences
              </p>
            </div>

            <div className="card text-center group">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 transition-colors duration-300">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-light/70">
                Pushing boundaries with cutting-edge solutions and creative problem-solving
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your <span className="gradient-text">Project</span>?
          </h2>
          <p className="text-xl text-light/70 mb-8">
            Let's collaborate to bring your vision to life with our expertise and creativity
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services" className="btn-primary text-lg px-8 py-4">
              Explore Our Services
            </Link>
            <Link to="/portfolio" className="btn-outline text-lg px-8 py-4">
              View Our Work
            </Link>
            <Link to="/contact" className="btn-outline text-lg px-8 py-4">
              Contact Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
