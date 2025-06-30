'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { initGA, trackPageView, shouldLoadAnalytics } from '@/lib/analytics'

export default function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Initialize Google Analytics
    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    
    if (shouldLoadAnalytics() && measurementId) {
      initGA(measurementId)
    }
  }, [])

  useEffect(() => {
    // Track page views when pathname or search params change
    if (shouldLoadAnalytics()) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
      trackPageView(url)
    }
  }, [pathname, searchParams])

  return null
} 