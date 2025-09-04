import { useEffect } from 'react'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  canonical?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: string
  twitterCard?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  structuredData?: object
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'UltimAItech - AI-Powered Web Development & Digital Solutions',
  description = 'Transform your digital presence with UltimAItech. Expert web development, AI integration, and innovative digital solutions for modern businesses. Get cutting-edge websites and applications.',
  keywords = 'web development, AI development, digital solutions, React development, Node.js, full-stack development, UltimAItech, artificial intelligence, web applications, mobile apps',
  canonical,
  ogTitle,
  ogDescription,
  ogImage = '/images/ultimaitech-og-image.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  twitterTitle,
  twitterDescription,
  twitterImage,
  structuredData
}) => {
  useEffect(() => {
    // Update document title
    document.title = title

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
      let meta = document.querySelector(selector) as HTMLMetaElement
      
      if (!meta) {
        meta = document.createElement('meta')
        if (property) {
          meta.setAttribute('property', name)
        } else {
          meta.setAttribute('name', name)
        }
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }

    // Basic SEO meta tags
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)
    updateMetaTag('author', 'UltimAItech')
    updateMetaTag('robots', 'index, follow')
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0')

    // Open Graph meta tags
    updateMetaTag('og:title', ogTitle || title, true)
    updateMetaTag('og:description', ogDescription || description, true)
    updateMetaTag('og:image', ogImage, true)
    updateMetaTag('og:type', ogType, true)
    updateMetaTag('og:site_name', 'UltimAItech', true)
    updateMetaTag('og:locale', 'en_US', true)

    // Twitter Card meta tags
    updateMetaTag('twitter:card', twitterCard)
    updateMetaTag('twitter:title', twitterTitle || ogTitle || title)
    updateMetaTag('twitter:description', twitterDescription || ogDescription || description)
    updateMetaTag('twitter:image', twitterImage || ogImage)
    updateMetaTag('twitter:site', '@UltimAItech')
    updateMetaTag('twitter:creator', '@UltimAItech')

    // Canonical URL
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
      if (!link) {
        link = document.createElement('link')
        link.rel = 'canonical'
        document.head.appendChild(link)
      }
      link.href = canonical
    }

    // Structured Data (JSON-LD)
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]')
      if (!script) {
        script = document.createElement('script')
        script.type = 'application/ld+json'
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(structuredData)
    }

    // Additional SEO improvements
    updateMetaTag('theme-color', '#3b82f6')
    updateMetaTag('msapplication-TileColor', '#3b82f6')
    updateMetaTag('apple-mobile-web-app-capable', 'yes')
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'default')

  }, [title, description, keywords, canonical, ogTitle, ogDescription, ogImage, ogType, twitterCard, twitterTitle, twitterDescription, twitterImage, structuredData])

  return null
}

export default SEOHead
