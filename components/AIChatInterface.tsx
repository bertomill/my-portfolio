'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function AIChatInterface() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)
    setMessages(prev => [...prev, { role: 'user', content: input }])
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      })

      const data = await response.json()
      
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
      } else {
        console.error('Error:', data.error)
        setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error.' }])
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error.' }])
    }

    setInput('')
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg ${
              message.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
            } max-w-[80%]`}
          >
            {message.content}
          </motion.div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 p-2 border rounded"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isLoading ? 'Thinking...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  )
} 