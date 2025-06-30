import ReactGA from 'react-ga4'

// Initialize Google Analytics
export const initGA = (measurementId: string) => {
  if (typeof window !== 'undefined' && measurementId) {
    ReactGA.initialize(measurementId, {
      testMode: process.env.NODE_ENV === 'development',
    })
  }
}

// Track page views
export const trackPageView = (path: string) => {
  if (typeof window !== 'undefined') {
    ReactGA.send({ 
      hitType: 'pageview', 
      page: path,
      title: document.title 
    })
  }
}

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined') {
    ReactGA.event({
      action,
      category,
      label,
      value,
    })
  }
}

// Predefined event tracking functions for common actions
export const analytics = {
  // Project interactions
  projectView: (projectTitle: string) => {
    trackEvent('view', 'Project', projectTitle)
  },
  
  projectClick: (projectTitle: string, projectUrl: string) => {
    trackEvent('click', 'Project', `${projectTitle} - ${projectUrl}`)
  },

  // Blog interactions
  blogPostClick: (postTitle: string) => {
    trackEvent('click', 'Blog Post', postTitle)
  },

  // YouTube video interactions
  videoView: (videoTitle: string) => {
    trackEvent('view', 'YouTube Video', videoTitle)
  },

  videoClick: (videoTitle: string) => {
    trackEvent('click', 'YouTube Video', videoTitle)
  },

  // Navigation
  navClick: (destination: string) => {
    trackEvent('click', 'Navigation', destination)
  },

  // Social media clicks
  socialClick: (platform: string) => {
    trackEvent('click', 'Social Media', platform)
  },

  // Newsletter
  newsletterSubscribe: (email?: string) => {
    trackEvent('subscribe', 'Newsletter', email ? 'Success' : 'Attempt')
  },

  // Contact form
  contactFormSubmit: () => {
    trackEvent('submit', 'Contact Form', 'Contact Attempt')
  },

  // File downloads
  resumeDownload: () => {
    trackEvent('download', 'Resume', 'PDF Download')
  },

  // External link clicks
  externalLinkClick: (url: string, context: string) => {
    trackEvent('click', 'External Link', `${context} - ${url}`)
  },

  // Search and filters (if you add them later)
  search: (query: string) => {
    trackEvent('search', 'Site Search', query)
  },

  // Performance tracking
  pageLoadTime: (loadTime: number) => {
    trackEvent('timing', 'Page Load', 'Load Time', loadTime)
  },

  // Error tracking
  error: (errorMessage: string, page: string) => {
    trackEvent('error', 'JavaScript Error', `${page}: ${errorMessage}`)
  },
}

// Utility to check if analytics should be loaded (for privacy compliance)
export const shouldLoadAnalytics = (): boolean => {
  if (typeof window === 'undefined') return false
  
  // Check for Do Not Track header
  if (navigator.doNotTrack === '1') return false
  
  // You can add cookie consent logic here later
  // For now, we'll load analytics by default
  return true
} 