import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-dark-secondary border-t border-secondary/20 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Logo above copyright text */}
          <div className="mb-2">
            <img
              src="/images/ultimaitech-logo.svg"
              alt="UltimAItech Logo"
              className="h-40 w-40"
            />
          </div>

          {/* Centered copyright text */}
          <div className="mb-2">
            <p className="text-light/70 text-sm">
              © 2025 UltimAItech. All rights reserved.
            </p>
          </div>

          {/* Admin button below copyright text */}
          <div>
            <Link
              to="/admin"
              className="text-primary hover:text-primary/80 transition-colors duration-200 text-sm font-medium"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
