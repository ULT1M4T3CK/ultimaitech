import { createContext, useContext, ReactNode } from 'react'
import axios from 'axios'

interface AnalyticsContextType {
  recordVisit: (page: string) => void
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext)
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider')
  }
  return context
}

interface AnalyticsProviderProps {
  children: ReactNode
}

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  const recordVisit = async (page: string) => {
    try {
      // Skip API call in production (GitHub Pages)
      if (window.location.hostname === 'ultimaitech.com' || window.location.hostname === 'www.ultimaitech.com') {
        console.log('Analytics recording skipped in production')
        return
      }
      
      await axios.post('/api/analytics/visit', { page_visited: page })
    } catch (error) {
      console.error('Failed to record visit:', error)
    }
  }

  const value = {
    recordVisit
  }

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  )
}
