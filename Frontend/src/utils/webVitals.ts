import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals'

type MetricName = 'CLS' | 'INP' | 'FCP' | 'LCP' | 'TTFB'

interface WebVitalMetric {
  name: MetricName
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  id: string
}

// Function to send metrics to analytics service
const sendToAnalytics = (metric: WebVitalMetric) => {
  // In production, you would send this to your analytics service
  // For now, we'll just log it
  console.log('Web Vital:', metric)
  
  // Example: Send to Google Analytics
  // gtag('event', metric.name, {
  //   event_category: 'Web Vitals',
  //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
  //   event_label: metric.id,
  //   non_interaction: true,
  // })
}

// Initialize Web Vitals monitoring
export const initWebVitals = () => {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    onCLS(sendToAnalytics)
    onINP(sendToAnalytics)
    onFCP(sendToAnalytics)
    onLCP(sendToAnalytics)
    onTTFB(sendToAnalytics)
  }
}

// Performance optimization functions
export const optimizeLoading = () => {
  // Preload critical resources
  const preloadCriticalResources = () => {
    const criticalResources = [
      '/images/ultimaitech-logo.png',
      '/images/hero-background.png'
    ]
    
    criticalResources.forEach(resource => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = resource
      document.head.appendChild(link)
    })
  }
  
  // Optimize font loading
  const optimizeFontLoading = () => {
    const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]')
    fontLinks.forEach(link => {
      ;(link as HTMLLinkElement).rel = 'preload'
      ;(link as HTMLLinkElement).as = 'style'
      ;(link as HTMLLinkElement).onload = function() {
        ;(this as HTMLLinkElement).rel = 'stylesheet'
      }
    })
  }
  
  // Enable passive event listeners for better scrolling performance
  const enablePassiveListeners = () => {
    let supportsPassive = false
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get: function() {
          supportsPassive = true
          return true
        }
      })
      window.addEventListener('testPassive', () => {}, opts as EventListenerOptions)
      window.removeEventListener('testPassive', () => {}, opts as EventListenerOptions)
    } catch (e) {
      // Passive not supported
    }
    
    if (supportsPassive) {
      // Add passive listeners for touch events
      document.addEventListener('touchstart', () => {}, { passive: true })
      document.addEventListener('touchmove', () => {}, { passive: true })
    }
  }
  
  // Defer non-critical JavaScript
  const deferNonCriticalJS = () => {
    const scripts = document.querySelectorAll('script[data-defer]')
    scripts.forEach(script => {
      if (script.hasAttribute('data-defer')) {
        const newScript = document.createElement('script')
        newScript.src = script.getAttribute('src') || ''
        newScript.defer = true
        document.head.appendChild(newScript)
        script.remove()
      }
    })
  }
  
  // Run optimizations
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      preloadCriticalResources()
      optimizeFontLoading()
      enablePassiveListeners()
      deferNonCriticalJS()
    })
  } else {
    preloadCriticalResources()
    optimizeFontLoading()
    enablePassiveListeners()
    deferNonCriticalJS()
  }
}

// Image optimization utility
export const createOptimizedImageUrl = (src: string, width?: number, height?: number): string => {
  // In a real implementation, you might use a service like Cloudinary or ImageKit
  // For now, we'll just return the original URL
  // Example with query parameters for future CDN integration:
  const url = new URL(src, window.location.origin)
  if (width) url.searchParams.set('w', width.toString())
  if (height) url.searchParams.set('h', height.toString())
  url.searchParams.set('f', 'webp') // Request WebP format if supported
  url.searchParams.set('q', '85') // Set quality to 85%
  
  return url.toString()
}

// Check if WebP is supported
export const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image()
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2)
    }
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  })
}

// Lazy loading intersection observer
export const createLazyLoadObserver = (callback: (entries: IntersectionObserverEntry[]) => void) => {
  if ('IntersectionObserver' in window) {
    return new IntersectionObserver(callback, {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    })
  }
  return null
}

// Performance monitoring
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now()
  fn()
  const end = performance.now()
  console.log(`${name} took ${end - start} milliseconds`)
}

// Resource hints
export const addResourceHints = () => {
  const hints = [
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' }
  ]
  
  hints.forEach(hint => {
    const link = document.createElement('link')
    link.rel = hint.rel
    link.href = hint.href
    if ('crossorigin' in hint) {
      link.crossOrigin = hint.crossorigin
    }
    document.head.appendChild(link)
  })
}

export default {
  initWebVitals,
  optimizeLoading,
  createOptimizedImageUrl,
  supportsWebP,
  createLazyLoadObserver,
  measurePerformance,
  addResourceHints
}