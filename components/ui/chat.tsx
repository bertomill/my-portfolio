'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ChatProps extends React.ComponentProps<'div'> {
  children: React.ReactNode
}

export function Chat({ children, className, ...props }: ChatProps) {
  return (
    <div className={cn('flex h-full flex-col', className)} {...props}>
      {children}
    </div>
  )
} 