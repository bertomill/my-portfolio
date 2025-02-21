'use client'

import * as React from 'react'
import { useInView } from 'react-intersection-observer'

interface ChatScrollAnchorProps {
  trackVisibility?: boolean
}

export function ChatScrollAnchor({ trackVisibility }: ChatScrollAnchorProps) {
  const [ref, inView] = useInView({
    trackVisibility
  })

  React.useEffect(() => {
    if (!inView) {
      ref.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [inView, ref])

  return <div ref={ref} className="h-1 w-full" />
} 