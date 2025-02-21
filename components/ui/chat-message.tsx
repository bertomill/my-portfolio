'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ChatMessageProps extends React.ComponentProps<'div'> {
  role: 'user' | 'assistant'
  content: string
}

export function ChatMessage({ role, content, className, ...props }: ChatMessageProps) {
  return (
    <div
      className={cn(
        'flex w-full',
        role === 'assistant' ? 'justify-start' : 'justify-end',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'rounded-lg px-4 py-2 max-w-[80%]',
          role === 'assistant' 
            ? 'bg-secondary text-secondary-foreground' 
            : 'bg-primary text-primary-foreground'
        )}
      >
        {content}
      </div>
    </div>
  )
} 