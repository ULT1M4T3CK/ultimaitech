import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Code, Palette, Zap, MousePointer, Eye, Sparkles } from 'lucide-react'
import { useAnalytics } from '../contexts/AnalyticsContext'
import { useInView } from 'react-intersection-observer'
import SEOHead from '../components/SEOHead'
import { organizationSchema, websiteSchema, serviceSchema } from '../utils/structuredData'
import ParticleField from '../components/ParticleField'
import ThreeScene from '../components/ThreeScene'

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
        {/* Particle Field Background */}
        <ParticleField />

        {/* Cyberpunk Grid Background */}
        <div className="absolute inset-0 cyber-grid opacity-20"></div>

        {/* Background Image with Lazy Loading */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax-bg"
          style={{
            backgroundImage: 'url(/images/hero-background.png)',
            willChange: 'transform'
          }}
        />
        {/* Preload critical background image */}
        <link rel="preload" as="image" href="/images/hero-background.png" />

        {/* Holographic Overlay */}
        <div className="absolute inset-0 holographic opacity-10"></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark/90 via-dark/70 to-primary/20"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-8">
            {/* Animated Logo/Icon */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center pulse-glow mx-auto mb-4">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
                <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full animate-ping opacity-20 mx-auto"></div>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
              <span className="neon-text">Neural Networks</span> &{' '}
              <span className="gradient-text">AI Evolution</span>
            </h1>
            <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-light/90 animate-slide-up">
              Custom AI Training & Intelligent Chatbot Development
            </h2>
            <p className="text-xl md:text-2xl text-light/80 mb-8 max-w-3xl mx-auto animate-slide-up leading-relaxed">
              We forge <span className="text-primary font-semibold">custom AI models</span> from your unique data and engineer{' '}
              <span className="text-secondary font-semibold">intelligent chatbots</span> that truly comprehend your domain.
              <br />
              <span className="text-lg text-light/60 mt-2 block">
                No generic solutions—just AI that evolves with your business.
              </span>
            </p>

            {/* Interactive Stats */}
            <div className="flex justify-center gap-8 mb-8 animate-slide-up">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary cyber-pulse">150%</div>
                <div className="text-sm text-light/60 uppercase tracking-wide">ROI Increase</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary cyber-pulse">24/7</div>
                <div className="text-sm text-light/60 uppercase tracking-wide">AI Availability</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary cyber-pulse">∞</div>
                <div className="text-sm text-light/60 uppercase tracking-wide">Learning Capacity</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link to="/services" className="btn-3d bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105">
                <MousePointer className="inline h-5 w-5 mr-2" />
                Explore AI Services
              </Link>
              <Link to="/portfolio" className="btn-3d border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-4 px-8 rounded-lg transition-all duration-300">
                <Eye className="inline h-5 w-5 mr-2" />
                View Neural Projects
              </Link>
            </div>

            {/* Tech Stack Indicators */}
            <div className="mt-8 flex justify-center gap-4 animate-slide-up">
              <div className="glass-morphism px-4 py-2 rounded-full">
                <span className="text-primary text-sm font-medium">TensorFlow</span>
              </div>
              <div className="glass-morphism px-4 py-2 rounded-full">
                <span className="text-secondary text-sm font-medium">PyTorch</span>
              </div>
              <div className="glass-morphism px-4 py-2 rounded-full">
                <span className="text-primary text-sm font-medium">Hugging Face</span>
              </div>
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
            <div className="card-3d text-center group relative perspective-1000">
              <div className="gradient-border rounded-xl p-[2px]">
                <div className="bg-dark-secondary rounded-xl p-6 h-full">
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 rounded-full text-xs font-medium animate-pulse-glow">
                    NEURAL CORE
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:rotate-180 transition-transform duration-700 float">
                    <Code className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
                    Custom AI Model Training
                  </h3>
                  <p className="text-light/70 leading-relaxed">
                    We forge neural networks from your proprietary data, creating AI that comprehends your domain with unparalleled accuracy. From computer vision to predictive analytics—we transform your data into intelligent solutions.
                  </p>
                  <div className="mt-4 flex justify-center">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-3d text-center group relative perspective-1000">
              <div className="gradient-border rounded-xl p-[2px]">
                <div className="bg-dark-secondary rounded-xl p-6 h-full">
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-secondary to-primary text-white px-3 py-1 rounded-full text-xs font-medium animate-pulse-glow">
                    CONVERSATIONAL AI
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:rotate-180 transition-transform duration-700 float">
                    <Palette className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-secondary transition-colors duration-300">
                    Intelligent Chatbot Development
                  </h3>
                  <p className="text-light/70 leading-relaxed">
                    We engineer conversational AI that maintains context, understands intent, and delivers human-like interactions. No more scripted responses—experience chatbots that genuinely assist your customers.
                  </p>
                  <div className="mt-4 flex justify-center">
                    <div className="flex space-x-1">
                      <div className="w-1 h-4 bg-secondary rounded animate-data-stream"></div>
                      <div className="w-1 h-4 bg-primary rounded animate-data-stream" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1 h-4 bg-secondary rounded animate-data-stream" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-1 h-4 bg-primary rounded animate-data-stream" style={{ animationDelay: '0.3s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-3d text-center group relative perspective-1000">
              <div className="gradient-border rounded-xl p-[2px]">
                <div className="bg-dark-secondary rounded-xl p-6 h-full">
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-gray-600 to-gray-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    FULL-STACK AI
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:rotate-180 transition-transform duration-700 float">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
                    Web & App Development
                  </h3>
                  <p className="text-light/70 leading-relaxed">
                    We craft responsive web applications and mobile solutions that seamlessly integrate with your AI implementations, providing complete digital experiences that showcase your intelligent systems.
                  </p>
                  <div className="mt-4 flex justify-center">
                    <div className="grid grid-cols-3 gap-1">
                      {[...Array(9)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1 h-1 bg-gradient-to-r from-primary to-secondary rounded-full animate-cyber-pulse"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 3D Visualization */}
      <section className="py-20 bg-dark relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="neon-text">Neural</span> <span className="gradient-text">Visualization</span>
            </h2>
            <p className="text-xl text-light/70 max-w-3xl mx-auto">
              Experience our AI technology in action with interactive 3D demonstrations
            </p>
          </div>

          {/* 3D Scene Component */}
          <div className="mb-16">
            <ThreeScene />
          </div>
        </div>
      </section>

      {/* AI Capabilities Showcase */}
      <section className="py-20 bg-gradient-to-b from-dark-secondary to-dark relative overflow-hidden">
        <div className="absolute inset-0 particle-field opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              The <span className="gradient-text">Technology</span> We Master
            </h2>
            <p className="text-xl text-light/70 max-w-3xl mx-auto">
              We harness cutting-edge AI frameworks and neural architectures to build solutions that push the boundaries of what's possible
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Neural Networks",
                desc: "Custom deep learning architectures trained on your domain-specific data",
                icon: "🧠",
                color: "from-purple-600 to-blue-600"
              },
              {
                title: "Large Language Models",
                desc: "Advanced NLP models that understand context and generate human-like text",
                icon: "📝",
                color: "from-green-500 to-emerald-500"
              },
              {
                title: "Computer Vision",
                desc: "AI systems that can analyze, interpret, and understand visual information",
                icon: "👁️",
                color: "from-cyan-500 to-teal-500"
              },
              {
                title: "Predictive Analytics",
                desc: "Machine learning models that forecast trends and optimize decision-making",
                icon: "🔮",
                color: "from-orange-500 to-red-500"
              }
            ].map((capability, index) => (
              <div key={index} className="glass-morphism hover-depth rounded-xl p-6 text-center group">
                <div className={`w-16 h-16 bg-gradient-to-r ${capability.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{capability.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
                  {capability.title}
                </h3>
                <p className="text-light/70 text-sm leading-relaxed">
                  {capability.desc}
                </p>
                <div className="mt-4 flex justify-center">
                  <div className={`w-2 h-2 bg-gradient-to-r ${capability.color} rounded-full animate-pulse`}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-4 p-6 glass-morphism rounded-2xl">
              <span className="text-sm font-medium text-primary">Neural Framework Arsenal:</span>
              <div className="flex flex-wrap items-center gap-4">
                {[
                  { name: "TensorFlow", color: "text-blue-400" },
                  { name: "PyTorch", color: "text-orange-400" },
                  { name: "Hugging Face", color: "text-green-400" },
                  { name: "OpenAI", color: "text-purple-400" },
                  { name: "LangChain", color: "text-cyan-400" }
                ].map((tech, index) => (
                  <span key={index} className={`text-sm font-medium ${tech.color} hover:scale-110 transition-transform duration-200 cursor-default`}>
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-5"></div>
        <div className="absolute inset-0 particle-field opacity-20"></div>

        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <div className="mb-8">
            <div className="inline-block p-4 glass-morphism rounded-2xl mb-6 animate-float">
              <div className="text-6xl mb-4">🚀</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 neon-text">
                Ready to See What <span className="gradient-text">AI</span> Can Do?
              </h2>
              <div className="flex justify-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-cyber-pulse"></div>
                <div className="w-2 h-2 bg-secondary rounded-full animate-cyber-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-cyber-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>

            <p className="text-xl text-light/80 mb-8 leading-relaxed max-w-3xl mx-auto">
              Let's explore your business challenges and discover how custom AI training or intelligent chatbots can transform your operations.
              <span className="text-primary font-semibold block mt-2">No pressure—just a strategic conversation about infinite possibilities.</span>
            </p>

            {/* Interactive Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services" className="btn-3d bg-gradient-to-r from-primary via-secondary to-primary hover:from-secondary hover:via-primary hover:to-secondary text-white font-bold text-lg px-8 py-4 rounded-xl shadow-2xl hover:shadow-primary/50 transition-all duration-500 transform hover:scale-105 group">
                <span className="flex items-center justify-center">
                  <Sparkles className="h-6 w-6 mr-3 group-hover:animate-spin" />
                  Explore Neural Services
                </span>
              </Link>

              <Link to="/portfolio" className="btn-3d border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold text-lg px-8 py-4 rounded-xl transition-all duration-500 group">
                <span className="flex items-center justify-center">
                  <Eye className="h-6 w-6 mr-3 group-hover:animate-pulse" />
                  View AI Projects
                </span>
              </Link>

              <Link to="/contact" className="btn-3d bg-gradient-to-r from-transparent to-transparent hover:from-primary/20 hover:to-secondary/20 border-2 border-light/30 text-light hover:text-white font-bold text-lg px-8 py-4 rounded-xl transition-all duration-500">
                <span className="flex items-center justify-center">
                  <MousePointer className="h-6 w-6 mr-3" />
                  Initiate Contact
                </span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-light/60">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Neural Networks Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-sm">AI Models Ready</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Chatbots Operational</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-primary/30 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-secondary/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-primary/40 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </section>
    </div>
  )
}

export default Home
