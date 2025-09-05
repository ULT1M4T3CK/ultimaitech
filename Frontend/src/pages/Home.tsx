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
        title="UltimAItech - Custom AI Model Training & Machine Learning Solutions"
        description="Transform your business with custom AI model training, intelligent automation, and cutting-edge machine learning solutions. Expert AI development services for modern enterprises."
        keywords="AI model training, custom AI development, machine learning solutions, AI automation, neural networks, deep learning, AI consulting, artificial intelligence services, UltimAItech"
        canonical="https://ultimaitech.com"
        ogTitle="UltimAItech - Custom AI Model Training & Machine Learning Solutions"
        ogDescription="Expert AI development services specializing in custom model training, intelligent automation, and transformative machine learning solutions for businesses."
        ogImage="https://ultimaitech.com/images/ultimaitech-og-image.png"
        structuredData={combinedSchema}
      />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Lazy Loading */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/hero-background.png)',
            willChange: 'transform'
          }}
        />
        {/* Preload critical background image */}
        <link rel="preload" as="image" href="/images/hero-background.png" />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-dark/80"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
              AI-Powered Solutions by{' '}
              <span className="gradient-text">UltimAItech</span>
            </h1>
            <p className="text-xl md:text-2xl text-light/80 mb-8 max-w-2xl mx-auto animate-slide-up">
              Transform your business with custom AI model training, intelligent automation, and cutting-edge machine learning solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link to="/services" className="btn-primary">
                Explore AI Services
              </Link>
              <Link to="/portfolio" className="btn-outline">
                View AI Projects
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
              AI <span className="gradient-text">Expertise</span>
            </h2>
            <p className="text-xl text-light/70 max-w-2xl mx-auto">
              We specialize in transforming businesses through intelligent AI solutions and custom machine learning models
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Code className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Custom AI Model Training</h3>
              <p className="text-light/70">
                Specialized AI models trained on your unique data for maximum accuracy and business impact
              </p>
            </div>

            <div className="card text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Integration & Automation</h3>
              <p className="text-light/70">
                Seamless integration of AI capabilities into your existing workflows and systems
              </p>
            </div>

            <div className="card text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Intelligent Chatbots</h3>
              <p className="text-light/70">
                Advanced conversational AI that understands context and provides human-like interactions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Capabilities Showcase */}
      <section className="py-20 bg-gradient-to-b from-dark to-dark-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Advanced <span className="gradient-text">AI Technologies</span>
            </h2>
            <p className="text-xl text-light/70 max-w-3xl mx-auto">
              We leverage cutting-edge AI frameworks and technologies to build intelligent solutions that drive real business value
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-dark-secondary/50 rounded-xl p-6 border border-primary/20 hover:border-primary/50 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-primary mb-2">Neural Networks</h3>
              <p className="text-light/70 text-sm">Custom architectures for complex pattern recognition and prediction tasks</p>
            </div>
            <div className="bg-dark-secondary/50 rounded-xl p-6 border border-primary/20 hover:border-primary/50 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-primary mb-2">Large Language Models</h3>
              <p className="text-light/70 text-sm">Fine-tuned LLMs for domain-specific text generation and understanding</p>
            </div>
            <div className="bg-dark-secondary/50 rounded-xl p-6 border border-primary/20 hover:border-primary/50 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-primary mb-2">Computer Vision</h3>
              <p className="text-light/70 text-sm">Image recognition, object detection, and visual analysis systems</p>
            </div>
            <div className="bg-dark-secondary/50 rounded-xl p-6 border border-primary/20 hover:border-primary/50 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-primary mb-2">Predictive Analytics</h3>
              <p className="text-light/70 text-sm">Data-driven insights and forecasting models for strategic decision making</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-8 text-light/60">
              <span className="text-sm font-medium">Powered by:</span>
              <div className="flex items-center space-x-6">
                <span className="text-sm">TensorFlow</span>
                <span className="text-sm">PyTorch</span>
                <span className="text-sm">Hugging Face</span>
                <span className="text-sm">OpenAI</span>
                <span className="text-sm">LangChain</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Business with <span className="gradient-text">AI</span>?
          </h2>
          <p className="text-xl text-light/70 mb-8">
            Let's discuss how custom AI solutions can revolutionize your operations, automate complex tasks, and unlock new opportunities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services" className="btn-primary text-lg px-8 py-4">
              Explore AI Services
            </Link>
            <Link to="/portfolio" className="btn-outline text-lg px-8 py-4">
              View AI Projects
            </Link>
            <Link to="/contact" className="btn-outline text-lg px-8 py-4">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
