'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ChatPanelProps extends React.ComponentProps<'div'> {
  isLoading?: boolean
  onSubmit?: (value: string) => void
  placeholder?: string
}

export function ChatPanel({ 
  isLoading, 
  onSubmit, 
  placeholder = 'Type a message...', 
  className, 
  ...props 
}: ChatPanelProps) {
  const [input, setInput] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    
    onSubmit?.(input)
    setInput('')
  }

  return (
    <div className={cn('p-3 w-full', className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="relative w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="w-full p-3 pr-20 rounded-lg bg-[hsl(0_0%_9%)] text-foreground border border-border/50 focus:outline-none focus:ring-1 focus:ring-border focus:border-border"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={cn(
              'absolute right-1.5 top-1/2 -translate-y-1/2',
              'px-3 py-1.5 rounded-md',
              'bg-[hsl(0_0%_9%)] text-foreground border border-border/50',
              'hover:bg-[hsl(0_0%_13%)] transition-colors',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            {isLoading ? 'Thinking...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  )
} 