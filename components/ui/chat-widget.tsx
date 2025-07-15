'use client'

import { useState } from 'react'
import { MessageCircle, Send, X, Bot, User } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm here to help you learn more about my projects and experience. What would you like to know?",
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputMessage })
      })

      const data = await response.json()
      
      if (response.ok) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, assistantMessage])
      } else {
        throw new Error(data.error || 'Failed to get response')
      }
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I'm having trouble responding right now. Please try again later.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          rounded-full h-12 w-12 shadow-lg transition-all duration-300 glass-effect
          flex items-center justify-center text-white
          ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}
        `}
        style={{ 
          background: 'linear-gradient(135deg, var(--warm-gray) 0%, var(--deep-beige) 100%)',
        }}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      <div
        className={`
          w-80 h-96 shadow-xl transition-all duration-300 origin-bottom-right
          glass-effect rounded-lg overflow-hidden
          ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        `}
      >
        <div className="flex flex-row items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-sm font-medium" style={{ color: 'var(--charcoal)' }}>Ask me anything</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="p-0 flex flex-col h-full">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-2 ${
                  message.role === 'user' ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === 'assistant' && (
                  <div 
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white"
                    style={{ background: 'var(--warm-gray)' }}
                  >
                    <Bot className="h-3 w-3" />
                  </div>
                )}
                
                <div
                  className={`max-w-[70%] p-3 rounded-lg text-sm ${
                    message.role === 'user'
                      ? "text-white"
                      : "text-gray-800"
                  }`}
                  style={{
                    background: message.role === 'user' 
                      ? 'var(--deep-beige)'
                      : 'var(--warm-beige)'
                  }}
                >
                  {message.content}
                </div>
                
                {message.role === 'user' && (
                  <div 
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--soft-tan)', color: 'var(--charcoal)' }}
                  >
                    <User className="h-3 w-3" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start space-x-2">
                <div 
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white"
                  style={{ background: 'var(--warm-gray)' }}
                >
                  <Bot className="h-3 w-3" />
                </div>
                <div 
                  className="p-3 rounded-lg text-sm"
                  style={{ background: 'var(--warm-beige)' }}
                >
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about projects, skills, experience..."
                className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                disabled={isLoading || !inputMessage.trim()}
                className="px-3 py-2 rounded-md text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  background: 'linear-gradient(135deg, var(--warm-gray) 0%, var(--deep-beige) 100%)',
                }}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}