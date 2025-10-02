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
        title="UltimAItech - Custom AI Training & Chatbot Development Specialists"
        description="Expert custom AI model training and intelligent chatbot development services. Transform your business with specialized AI solutions tailored to your unique needs and data."
        keywords="custom AI training, AI model training, chatbot development, conversational AI, machine learning specialists, AI chatbots, custom AI solutions, neural networks, LLM training, UltimAItech"
        canonical="https://ultimaitech.com"
        ogTitle="UltimAItech - Custom AI Training & Chatbot Development Specialists"
        ogDescription="Leading specialists in custom AI model training and intelligent chatbot development. Expert AI solutions for modern businesses."
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
              Custom AI Training & Chatbot Development by{' '}
              <span className="gradient-text">UltimAItech</span>
            </h1>
            <p className="text-xl md:text-2xl text-light/80 mb-8 max-w-2xl mx-auto animate-slide-up">
              We train AI models on your data and build chatbots that actually work. No generic solutions - just AI that understands your business and helps your customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link to="/services" className="btn-primary">
                AI Training & Chatbots
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
              What We <span className="gradient-text">Do Best</span>
            </h2>
            <p className="text-xl text-light/70 max-w-3xl mx-auto">
              We specialize in two core areas: training custom AI models on your data and building intelligent chatbots that actually understand your business. We also create web applications when you need them.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center group ring-2 ring-primary/50 relative">
              <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                PRIMARY
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Code className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Custom AI Model Training</h3>
              <p className="text-light/70">
                We train AI models specifically on your data so they understand your business better than generic solutions. Whether you need image recognition, text analysis, or predictive models - we make AI work for you.
              </p>
            </div>

            <div className="card text-center group ring-2 ring-primary/50 relative">
              <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                PRIMARY
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Intelligent Chatbot Development</h3>
              <p className="text-light/70">
                We build chatbots that actually understand your customers and remember conversations. No more frustrating bot interactions - we create AI assistants that feel natural and helpful.
              </p>
            </div>

            <div className="card text-center group opacity-80">
              <div className="absolute top-4 right-4 bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                ADDITIONAL
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Web & App Development</h3>
              <p className="text-light/70">
                Sometimes you need a website or app to showcase your AI work. We build modern, responsive applications that integrate seamlessly with your AI solutions.
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
              The <span className="gradient-text">Technology</span> We Use
            </h2>
            <p className="text-xl text-light/70 max-w-3xl mx-auto">
              We work with the latest AI tools and frameworks to build solutions that actually work in the real world, not just in demos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-dark-secondary/50 rounded-xl p-6 border border-primary/20 hover:border-primary/50 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-primary mb-2">Neural Networks</h3>
              <p className="text-light/70 text-sm">Custom AI models that learn patterns from your specific data</p>
            </div>
            <div className="bg-dark-secondary/50 rounded-xl p-6 border border-primary/20 hover:border-primary/50 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-primary mb-2">Large Language Models</h3>
              <p className="text-light/70 text-sm">AI that understands and generates text in your industry's language</p>
            </div>
            <div className="bg-dark-secondary/50 rounded-xl p-6 border border-primary/20 hover:border-primary/50 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-primary mb-2">Computer Vision</h3>
              <p className="text-light/70 text-sm">AI that can see and understand images, videos, and visual data</p>
            </div>
            <div className="bg-dark-secondary/50 rounded-xl p-6 border border-primary/20 hover:border-primary/50 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-primary mb-2">Predictive Analytics</h3>
              <p className="text-light/70 text-sm">AI that helps you make better decisions by predicting future trends</p>
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
            Ready to See What <span className="gradient-text">AI</span> Can Do for You?
          </h2>
          <p className="text-xl text-light/70 mb-8">
            Let's talk about your business challenges and see how custom AI training or intelligent chatbots can help solve them. No pressure, just a friendly conversation about what's possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services" className="btn-primary text-lg px-8 py-4">
              AI Training & Chatbots
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
