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

const Services = () => {
  const { recordVisit } = useAnalytics()

  useEffect(() => {
    recordVisit('Services')
  }, [recordVisit])

  const services = [
    {
      id: 'website-development',
      title: 'Website Development',
      description: 'Modern, responsive websites and web applications built with cutting-edge technologies.',
      icon: Globe,
      features: [
        'Responsive Design',
        'SEO Optimization',
        'Performance Optimization',
        'Content Management Systems',
        'E-commerce Solutions',
        'Custom Web Applications'
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'MongoDB'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'app-development',
      title: 'App Development',
      description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
      icon: Smartphone,
      features: [
        'iOS & Android Development',
        'Cross-platform Solutions',
        'Native Performance',
        'Offline Functionality',
        'Push Notifications',
        'App Store Optimization'
      ],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'Redux'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'chatbot-development',
      title: 'Chat Bot Development',
      description: 'Intelligent conversational AI that enhances customer engagement and automates support.',
      icon: MessageCircle,
      features: [
        'Natural Language Processing',
        'Multi-platform Integration',
        'Automated Response System',
        'Custom Training Data',
        'Analytics & Insights',
        'Seamless Handoff to Humans'
      ],
      technologies: ['OpenAI GPT', 'Dialogflow', 'Rasa', 'Python', 'Node.js', 'Webhooks'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'ai-training',
      title: 'Custom Training of AI',
      description: 'Specialized AI models trained on your data for unique business applications.',
      icon: Brain,
      features: [
        'Custom Model Training',
        'Data Preprocessing',
        'Fine-tuning Existing Models',
        'Domain-specific Solutions',
        'Continuous Learning',
        'Performance Monitoring'
      ],
      technologies: ['TensorFlow', 'PyTorch', 'Hugging Face', 'Python', 'GPU Computing', 'MLOps'],
      color: 'from-orange-500 to-red-500'
    }
  ]

  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'We start by understanding your business needs, goals, and requirements.',
      icon: Users
    },
    {
      step: '02',
      title: 'Design & Architecture',
      description: 'Creating detailed designs and technical architecture for your solution.',
      icon: Palette
    },
    {
      step: '03',
      title: 'Development & Testing',
      description: 'Building your solution with rigorous testing and quality assurance.',
      icon: Code
    },
    {
      step: '04',
      title: 'Deployment & Launch',
      description: 'Smooth deployment and launch with ongoing support and maintenance.',
      icon: Zap
    }
  ]

  return (
    <div className="min-h-screen">
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
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-light/70 max-w-3xl mx-auto">
              Comprehensive digital solutions tailored to your business needs. From websites to AI, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-dark-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <div key={service.id} className="card group hover:scale-105 transition-all duration-300">
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
              Why Choose <span className="gradient-text">UltimAItech</span>
            </h2>
            <p className="text-xl text-light/70 max-w-2xl mx-auto">
              We combine technical expertise with creative innovation to deliver exceptional results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-light">Quality Assurance</h3>
              <p className="text-light/70">
                Rigorous testing and quality control ensure your solution meets the highest standards
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-light">Timely Delivery</h3>
              <p className="text-light/70">
                We value your time and deliver projects on schedule with transparent communication
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-light">Ongoing Support</h3>
              <p className="text-light/70">
                Continuous support and maintenance to ensure your solution evolves with your business
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
