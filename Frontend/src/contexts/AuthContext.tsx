import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import axios from 'axios'

// Helper function to decode JWT token and check expiration
const isTokenExpired = (token: string): boolean => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    
    const payload = JSON.parse(jsonPayload)
    const currentTime = Date.now() / 1000
    
    return payload.exp < currentTime
  } catch (error) {
    console.warn('Invalid token format')
    return true
  }
}

interface User {
  id: string
  username: string
  role: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing token on app load
    const token = localStorage.getItem('authToken')
    if (token) {
      // Check if token is expired
      if (isTokenExpired(token)) {
        console.warn('Token expired, logging out')
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
        delete axios.defaults.headers.common['Authorization']
        setUser(null)
      } else {
        // Token is valid, set user and axios header
        setUser(JSON.parse(localStorage.getItem('user') || 'null'))
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      console.log('🔐 Attempting login with username:', username)
      
      // Use production API URL when deployed
      const apiUrl = (import.meta as any).env?.VITE_API_URL || (window.location.hostname === 'localhost' ? '' : 'https://your-railway-backend.railway.app');
      const loginEndpoint = `${apiUrl}/api/auth/login`;
      
      console.log('🌐 Making POST request to:', loginEndpoint)
      console.log('📤 Request payload:', { username, password: '***' })
      
      const response = await axios.post(loginEndpoint, { username, password })
      console.log('✅ Login response received:', response.status, response.data)
      
      const { token, user } = response.data
      
      localStorage.setItem('authToken', token)
      localStorage.setItem('user', JSON.stringify(user))
      
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      console.log('Login successful, token set:', token.substring(0, 20) + '...')
      console.log('Auth header set:', axios.defaults.headers.common['Authorization'])
      
      setUser(user)
      return true
    } catch (error: any) {
      console.error('❌ Login failed:', error)
      console.error('📊 Error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method
      })
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    isLoading
  }

  // Ensure token is set for all API calls and check expiration periodically
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      if (isTokenExpired(token)) {
        console.warn('Token expired during session, logging out')
        logout()
      } else {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
    }
  }, [user])

  // Set up periodic token expiration check
  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('authToken')
      if (token && user && isTokenExpired(token)) {
        console.warn('Token expired, auto-logout triggered')
        logout()
      }
    }

    // Check every 5 minutes
    const interval = setInterval(checkTokenExpiration, 5 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [user])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
