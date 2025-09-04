// Web Vitals monitoring for Core Web Vitals optimization

interface WebVitalMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  id: string
}

// Thresholds based on Google's Core Web Vitals recommendations
const THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FID: { good: 100, poor: 300 },
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 }
}

function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS]
  if (!threshold) return 'good'
  
  if (value <= threshold.good) return 'good'
  if (value <= threshold.poor) return 'needs-improvement'
  return 'poor'
}

function sendToAnalytics(metric: WebVitalMetric) {
  // In production, send to your analytics service
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric)
  }
  
  // Example: Send to Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', metric.name, {
      custom_parameter_1: metric.value,
      custom_parameter_2: metric.rating,
      custom_parameter_3: metric.id
    })
  }
}

export function measureWebVitals() {
  // Only run in browser environment
  if (typeof window === 'undefined') return

  // Measure Cumulative Layout Shift (CLS)
  if ('PerformanceObserver' in window) {
    try {
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
          }
        }
        
        if (clsValue > 0) {
          const metric: WebVitalMetric = {
            name: 'CLS',
            value: clsValue,
            rating: getRating('CLS', clsValue),
            delta: clsValue,
            id: 'cls-' + Date.now()
          }
          sendToAnalytics(metric)
        }
      })
      
      clsObserver.observe({ type: 'layout-shift', buffered: true })
    } catch (e) {
      console.warn('CLS measurement failed:', e)
    }

    // Measure First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fidValue = entry.processingStart - entry.startTime
          const metric: WebVitalMetric = {
            name: 'FID',
            value: fidValue,
            rating: getRating('FID', fidValue),
            delta: fidValue,
            id: 'fid-' + Date.now()
          }
          sendToAnalytics(metric)
        }
      })
      
      fidObserver.observe({ type: 'first-input', buffered: true })
    } catch (e) {
      console.warn('FID measurement failed:', e)
    }

    // Measure Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        const lcpValue = lastEntry.startTime
        
        const metric: WebVitalMetric = {
          name: 'LCP',
          value: lcpValue,
          rating: getRating('LCP', lcpValue),
          delta: lcpValue,
          id: 'lcp-' + Date.now()
        }
        sendToAnalytics(metric)
      })
      
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })
    } catch (e) {
      console.warn('LCP measurement failed:', e)
    }
  }

  // Measure First Contentful Paint (FCP) and Time to First Byte (TTFB)
  window.addEventListener('load', () => {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
      const paintEntries = performance.getEntriesByType('paint')
      
      if (navigationEntries.length > 0) {
        const nav = navigationEntries[0]
        
        // TTFB
        const ttfbValue = nav.responseStart - nav.fetchStart
        const ttfbMetric: WebVitalMetric = {
          name: 'TTFB',
          value: ttfbValue,
          rating: getRating('TTFB', ttfbValue),
          delta: ttfbValue,
          id: 'ttfb-' + Date.now()
        }
        sendToAnalytics(ttfbMetric)
      }
      
      // FCP
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint')
      if (fcpEntry) {
        const fcpValue = fcpEntry.startTime
        const fcpMetric: WebVitalMetric = {
          name: 'FCP',
          value: fcpValue,
          rating: getRating('FCP', fcpValue),
          delta: fcpValue,
          id: 'fcp-' + Date.now()
        }
        sendToAnalytics(fcpMetric)
      }
    }
  })
}

// Preload critical resources
export function preloadCriticalResources() {
  // Preload hero image
  const heroImage = new Image()
  heroImage.src = '/images/hero-background.png'
  
  // Preload logo
  const logo = new Image()
  logo.src = '/images/ultimaitech-logo.png'
}

// Optimize loading performance
export function optimizeLoading() {
  // Preload critical resources
  preloadCriticalResources()
  
  // Start measuring web vitals
  measureWebVitals()
  
  // Prefetch likely next pages
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      const routes = ['/portfolio', '/services', '/contact']
      routes.forEach(route => {
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.href = route
        document.head.appendChild(link)
      })
    })
  }
}
