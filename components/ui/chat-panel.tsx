'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/ui/prompt-form'
import { cn } from '@/lib/utils'

export interface ChatPanelProps {
  isLoading?: boolean
  onSubmit?: (value: string) => void
  placeholder?: string
  className?: string
}

export function ChatPanel({
  isLoading,
  onSubmit,
  placeholder,
  className,
  ...props
}: ChatPanelProps) {
  return (
    <div className={cn('fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%', className)} {...props}>
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm
            onSubmit={onSubmit}
            isLoading={isLoading}
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  )
} 