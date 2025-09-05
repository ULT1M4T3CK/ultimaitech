import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Globe, 
  Smartphone, 
  MessageCircle, 
  Brain, 
  ArrowRight, 
  ArrowLeft,
  Code,
  Palette,
  Zap,
  Shield,
  Clock,
  Users
} from 'lucide-react'
import { useAnalytics } from '../contexts/AnalyticsContext'
import SEOHead from '../components/SEOHead'
import { serviceSchema, breadcrumbSchema } from '../utils/structuredData'

const Services = () => {
  const { recordVisit } = useAnalytics()

  useEffect(() => {
    recordVisit('Services')
  }, [recordVisit])

  const services = [
    {
      id: 'ai-training',
      title: 'Custom AI Model Training',
      description: 'Transform your business with specialized AI models trained on your unique data. From computer vision to natural language processing, we create AI solutions that understand your specific domain.',
      icon: Brain,
      features: [
        'Custom Neural Network Architecture',
        'Large Language Model Fine-tuning',
        'Computer Vision Model Training',
        'Domain-specific Data Processing',
        'Model Optimization & Deployment',
        'Continuous Learning Systems',
        'Performance Analytics & Monitoring',
        'A/B Testing for AI Models'
      ],
      technologies: ['TensorFlow', 'PyTorch', 'Transformers', 'Hugging Face', 'CUDA', 'Docker', 'Kubernetes', 'MLOps'],
      color: 'from-purple-600 to-blue-600',
      featured: true
    },
    {
      id: 'ai-integration',
      title: 'AI Integration & Automation',
      description: 'Seamlessly integrate cutting-edge AI capabilities into your existing systems and workflows to automate complex tasks and enhance decision-making.',
      icon: Zap,
      features: [
        'OpenAI API Integration',
        'Custom AI Workflow Automation',
        'Intelligent Document Processing',
        'Predictive Analytics Implementation',
        'AI-powered Recommendation Systems',
        'Automated Content Generation',
        'Smart Data Analysis Tools'
      ],
      technologies: ['OpenAI GPT-4', 'LangChain', 'Python', 'FastAPI', 'Azure AI', 'AWS SageMaker', 'Google AI'],
      color: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'chatbot-development',
      title: 'Intelligent AI Chatbots',
      description: 'Advanced conversational AI systems that understand context, maintain memory, and provide human-like interactions for superior customer engagement.',
      icon: MessageCircle,
      features: [
        'GPT-powered Conversational AI',
        'Multi-language Support',
        'Context-aware Responses',
        'Integration with Business Systems',
        'Voice & Text Capabilities',
        'Advanced NLP Processing',
        'Custom Knowledge Base Training',
        'Analytics & Conversation Insights'
      ],
      technologies: ['OpenAI GPT', 'LangChain', 'Rasa', 'Dialogflow', 'Python', 'Node.js', 'WebSockets', 'Vector Databases'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'ai-consulting',
      title: 'AI Strategy & Consulting',
      description: 'Expert guidance on AI adoption, strategy development, and implementation roadmaps to maximize your AI investment and competitive advantage.',
      icon: Users,
      features: [
        'AI Readiness Assessment',
        'Custom AI Strategy Development',
        'Technology Stack Recommendations',
        'ROI Analysis & Planning',
        'Team Training & Workshops',
        'AI Ethics & Governance',
        'Implementation Roadmapping'
      ],
      technologies: ['Strategic Planning', 'Data Analysis', 'ML Frameworks', 'Cloud Platforms', 'Business Intelligence'],
      color: 'from-indigo-500 to-purple-600'
    }
  ]

  const processSteps = [
    {
      step: '01',
      title: 'AI Assessment & Strategy',
      description: 'We analyze your data, identify AI opportunities, and develop a comprehensive AI implementation strategy.',
      icon: Users
    },
    {
      step: '02',
      title: 'Data Preparation & Model Design',
      description: 'Preparing your data for training and designing the optimal AI model architecture for your specific use case.',
      icon: Palette
    },
    {
      step: '03',
      title: 'Training & Optimization',
      description: 'Training custom AI models on your data with continuous optimization for maximum performance and accuracy.',
      icon: Brain
    },
    {
      step: '04',
      title: 'Deployment & Monitoring',
      description: 'Seamless deployment to production with real-time monitoring, performance tracking, and continuous improvement.',
      icon: Zap
    }
  ]

  const breadcrumbs = [
    { name: 'Home', url: 'https://ultimaitech.com' },
    { name: 'Services', url: 'https://ultimaitech.com/services' }
  ]

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [serviceSchema, breadcrumbSchema(breadcrumbs)]
  }

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Web Development Services - UltimAItech | React, Node.js, AI Solutions"
        description="Professional web development services including React, Node.js, AI integration, and full-stack solutions. Transform your business with modern web applications and digital solutions."
        keywords="web development services, React development, Node.js services, AI integration, full-stack development, custom web applications, digital solutions, UltimAItech services"
        canonical="https://ultimaitech.com/services"
        ogTitle="Professional Web Development Services - UltimAItech"
        ogDescription="Expert web development services including React, Node.js, AI integration, and full-stack solutions for modern businesses."
        ogImage="https://ultimaitech.com/images/services-og-image.png"
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
              AI-Powered <span className="gradient-text">Solutions</span>
            </h1>
            <p className="text-xl md:text-2xl text-light/70 max-w-3xl mx-auto">
              Transform your business with cutting-edge AI technology. From custom model training to intelligent automation, we specialize in making AI work for you.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-dark-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <div key={service.id} className={`card group hover:scale-105 transition-all duration-300 ${
                service.featured ? 'ring-2 ring-primary/50 relative overflow-hidden' : ''
              }`}>
                {service.featured && (
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                )}
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-light">{service.title}</h3>
                <p className="text-light/70 mb-6 text-lg">{service.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-light mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-light/70">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-light mb-3">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-dark border border-secondary/20 rounded-full text-sm text-light/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <Link 
                  to="/contact" 
                  className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Our <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-light/70 max-w-2xl mx-auto">
              A proven methodology that ensures successful project delivery and client satisfaction
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="h-10 w-10 text-white" />
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-primary/20">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-light">{step.title}</h3>
                <p className="text-light/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-dark-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Why Choose <span className="gradient-text">UltimAItech</span> for AI
            </h2>
            <p className="text-xl text-light/70 max-w-2xl mx-auto">
              Deep AI expertise combined with practical business understanding to deliver transformative AI solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-light">AI Expertise</h3>
              <p className="text-light/70">
                Deep knowledge in machine learning, neural networks, and cutting-edge AI technologies including GPT, computer vision, and custom model training
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-light">Proven Results</h3>
              <p className="text-light/70">
                Track record of successful AI implementations that deliver measurable business value and ROI for our clients
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-light">End-to-End Support</h3>
              <p className="text-light/70">
                From initial AI strategy to deployment and ongoing optimization, we provide comprehensive support throughout your AI journey
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
            Let's discuss how our services can help transform your business and achieve your goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary text-lg px-8 py-4">
              Get Started Today
            </Link>
            <Link to="/portfolio" className="btn-outline text-lg px-8 py-4">
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services
