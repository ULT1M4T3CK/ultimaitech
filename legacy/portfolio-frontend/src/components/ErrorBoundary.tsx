import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    this.setState({
      error,
      errorInfo
    })

    // Log error to monitoring service (implement when available)
    // logErrorToService(error, errorInfo)
  }

  private handleRefresh = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-dark flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="h-10 w-10 text-red-500" />
              </div>
              <h1 className="text-3xl font-bold text-light mb-4">
                Oops! Something went wrong
              </h1>
              <p className="text-light/70 mb-8">
                We apologize for the inconvenience. An unexpected error has occurred. 
                Please try refreshing the page or return to the home page.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={this.handleRefresh}
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                <RefreshCw className="h-5 w-5" />
                <span>Refresh Page</span>
              </button>
              
              <Link
                to="/"
                className="w-full btn-outline flex items-center justify-center space-x-2"
              >
                <Home className="h-5 w-5" />
                <span>Go to Home</span>
              </Link>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="cursor-pointer text-light/70 hover:text-light transition-colors">
                  Error Details (Development)
                </summary>
                <div className="mt-4 p-4 bg-dark-secondary rounded-lg border border-red-500/20">
                  <pre className="text-sm text-red-400 overflow-auto">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </div>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
