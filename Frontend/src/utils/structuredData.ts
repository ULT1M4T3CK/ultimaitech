// Structured data schemas for SEO

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "UltimAItech",
  "description": "AI-Powered Web Development & Digital Solutions",
  "url": "https://ultimaitech.com",
  "logo": "https://ultimaitech.com/images/ultimaitech-logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-XXX-XXX-XXXX",
    "contactType": "customer service",
    "email": "andre@ultimaitech.com",
    "availableLanguage": "English"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US",
    "addressRegion": "Remote & Worldwide"
  },
  "sameAs": [
    "https://linkedin.com/company/ultimaitech",
    "https://github.com/ultimaitech",
    "https://twitter.com/ultimaitech"
  ],
  "founder": {
    "@type": "Person",
    "name": "Andre Hassler",
    "email": "andre@ultimaitech.com"
  },
  "foundingDate": "2024",
  "numberOfEmployees": "1-10",
  "industry": "Web Development, AI Solutions"
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "UltimAItech",
  "description": "AI-Powered Web Development & Digital Solutions",
  "url": "https://ultimaitech.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://ultimaitech.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "UltimAItech",
    "logo": {
      "@type": "ImageObject",
      "url": "https://ultimaitech.com/images/ultimaitech-logo.png"
    }
  }
}

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Web Development Services",
  "description": "Professional web development services including React, Node.js, AI integration, and full-stack solutions",
  "provider": {
    "@type": "Organization",
    "name": "UltimAItech",
    "url": "https://ultimaitech.com"
  },
  "serviceType": "Web Development",
  "areaServed": "Worldwide",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Web Development Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Frontend Development",
          "description": "React, Vue.js, and modern frontend frameworks"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Backend Development",
          "description": "Node.js, Express, API development"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Integration",
          "description": "Artificial Intelligence and machine learning solutions"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Full-Stack Development",
          "description": "Complete web application development"
        }
      }
    ]
  }
}

export const portfolioSchema = (projects: any[]) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "UltimAItech Portfolio",
  "description": "Showcase of web development projects and creative solutions",
  "url": "https://ultimaitech.com/portfolio",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Portfolio Projects",
    "itemListElement": projects.map((project, index) => ({
      "@type": "CreativeWork",
      "@id": `https://ultimaitech.com/portfolio#project-${project.id}`,
      "position": index + 1,
      "name": project.title,
      "description": project.description,
      "creator": {
        "@type": "Organization",
        "name": "UltimAItech"
      },
      "dateCreated": project.created_at,
      "keywords": project.technologies.join(", "),
      ...(project.project_url && { "url": project.project_url }),
      ...(project.github_url && { "codeRepository": project.github_url }),
      ...(project.image_path && { 
        "image": {
          "@type": "ImageObject",
          "url": project.image_path
        }
      })
    }))
  }
})

export const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact UltimAItech",
  "description": "Get in touch with UltimAItech for your web development and AI solution needs",
  "url": "https://ultimaitech.com/contact",
  "mainEntity": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "andre@ultimaitech.com",
    "availableLanguage": "English",
    "areaServed": "Worldwide"
  }
}

export const breadcrumbSchema = (breadcrumbs: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url
  }))
})
