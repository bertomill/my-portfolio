import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { initGA, trackPageView, analytics, shouldLoadAnalytics } from '@/lib/analytics'

export const useAnalytics = () => {
  const router = useRouter()

  useEffect(() => {
    // Only initialize analytics if we should load it and have a measurement ID
    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    
    if (shouldLoadAnalytics() && measurementId) {
      initGA(measurementId)
      
      // Track initial page view
      trackPageView(router.asPath)
    }
  }, [])

  useEffect(() => {
    // Track page views on route changes
    const handleRouteChange = (url: string) => {
      if (shouldLoadAnalytics()) {
        trackPageView(url)
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return analytics
} 