'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ChatListProps extends React.ComponentProps<'div'> {
  children: React.ReactNode
}

export function ChatList({ children, className, ...props }: ChatListProps) {
  return (
    <div
      className={cn('flex flex-col gap-3 overflow-y-auto px-3', className)}
      {...props}
    >
      {children}
    </div>
  )
} 