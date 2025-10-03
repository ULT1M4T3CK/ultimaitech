import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { motion } from 'framer-motion'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'AI Training & Chatbots', path: '/services' },
    { name: 'Projects', path: '/portfolio' },
    { name: 'Contact', path: '/contact' }
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="bg-dark-secondary/80 backdrop-blur-md border-b border-accent-gray/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src="/images/ultimaitech-logo.png" 
              alt="UltimAItech Logo" 
              className="h-[70px] w-[70px] group-hover:scale-105 transition-transform duration-200"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'text-primary bg-primary/10 border border-primary/20'
                    : 'text-light/70 hover:text-primary hover:bg-primary/10 hover:border hover:border-primary/20'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {user && (
              <div className="flex items-center space-x-4">
                <span className="text-light/70 text-sm">Welcome, {user.username}</span>
                <button
                  onClick={logout}
                  className="btn-outline text-sm py-2 px-4"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-light/70 hover:text-primary transition-colors duration-200 p-2 rounded-md hover:bg-primary/10"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-dark-secondary/95 rounded-lg mt-2 border border-accent-gray/20">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-primary bg-primary/10 border border-primary/20'
                      : 'text-light/70 hover:text-primary hover:bg-primary/10 hover:border hover:border-primary/20'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {user && (
                <div className="pt-4 border-t border-accent-gray/20">
                  <div className="px-3 py-2 text-light/70 text-sm">
                    Welcome, {user.username}
                  </div>
                  <button
                    onClick={() => {
                      logout()
                      setIsMenuOpen(false)
                    }}
                    className="w-full text-left px-3 py-2 text-primary hover:bg-primary/10 rounded-md transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
