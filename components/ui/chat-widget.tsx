'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, Send, X, Bot, User, Minimize2 } from 'lucide-react'
import {
  Box,
  Text,
  VStack,
  HStack,
  Input,
  IconButton,
  Avatar,
  useColorModeValue,
  Flex,
  Badge,
} from '@chakra-ui/react'

interface ChatSource {
  source: string
  content: string
  similarity: number
  chunkIndex: number
}

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  sources?: ChatSource[]
  timestamp: Date
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm here to help you learn more about Berto's projects and AI expertise. What would you like to know?",
      timestamp: new Date()
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Color mode values
  const chatBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const messagesBg = useColorModeValue('gray.50', 'gray.700')

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim()) return

    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMsg])
    setMessage('')
    setIsLoading(true)

    try {
      // Build conversation history for API (exclude the current user message since we'll send it separately)
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: userMessage,
          messages: conversationHistory // Send conversation history to maintain context
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const data = await response.json()

      // Add assistant response
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        sources: data.sources,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMsg])
    } catch (error) {
      console.error('Error sending message:', error)
      // Add error message
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(message)
  }

  return (
    <Box position="fixed" bottom="6" right="6" zIndex="50">
      {/* Chat Button */}
      <IconButton
        aria-label="Open chat"
        icon={<MessageCircle size={28} />}
        isRound
        size="lg"
        w="16"
        h="16"
        color="white"
        bgGradient="linear(135deg, #667eea 0%, #764ba2 100%)"
        _hover={{
          transform: 'scale(1.05)',
          boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)'
        }}
        transition="all 0.3s ease"
        boxShadow="0 8px 32px rgba(102, 126, 234, 0.3)"
        onClick={() => setIsOpen(!isOpen)}
        opacity={isOpen ? 0 : 1}
        transform={isOpen ? 'scale(0.9)' : 'scale(1)'}
        pointerEvents={isOpen ? 'none' : 'auto'}
        position="relative"
      >
        {/* Notification dot */}
        <Box
          position="absolute"
          top="-1"
          right="-1"
          w="4"
          h="4"
          bg="red.500"
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            w="2"
            h="2"
            bg="white"
            borderRadius="full"
            css={{
              animation: "pulse 2s infinite"
            }}
          />
        </Box>
      </IconButton>

      {/* Chat Window */}
      <Box
        w="96"
        h={isMinimized ? "16" : "500px"}
        bg={chatBg}
        borderRadius="2xl"
        boxShadow="0 25px 50px rgba(0, 0, 0, 0.15)"
        border="1px"
        borderColor={borderColor}
        overflow="hidden"
        transition="all 0.3s ease"
        opacity={isOpen ? 1 : 0}
        transform={isOpen ? 'scale(1)' : 'scale(0.95)'}
        pointerEvents={isOpen ? 'auto' : 'none'}
        transformOrigin="bottom right"
        position="absolute"
        bottom="20"
        right="0"
      >
        {/* Header */}
        <Box
          bgGradient="linear(135deg, #667eea 0%, #764ba2 100%)"
          p="4"
          borderTopRadius="2xl"
        >
          <Flex justify="space-between" align="center">
            <HStack spacing="3">
              <Avatar
                size="sm"
                bg="whiteAlpha.200"
                icon={<Bot size={20} />}
                color="white"
              />
              <VStack align="start" spacing="0">
                <Text fontSize="sm" fontWeight="semibold" color="white">
                  AI Assistant
                </Text>
                <HStack spacing="1">
                  <Box w="2" h="2" bg="green.400" borderRadius="full" />
                  <Text fontSize="xs" color="whiteAlpha.800">
                    RAG-Powered
                  </Text>
                </HStack>
              </VStack>
            </HStack>
            
            <HStack spacing="1">
              <IconButton
                aria-label="Minimize chat"
                icon={<Minimize2 size={16} />}
                size="sm"
                variant="ghost"
                color="white"
                _hover={{ bg: 'whiteAlpha.200' }}
                onClick={() => setIsMinimized(!isMinimized)}
              />
              <IconButton
                aria-label="Close chat"
                icon={<X size={16} />}
                size="sm"
                variant="ghost"
                color="white"
                _hover={{ bg: 'whiteAlpha.200' }}
                onClick={() => setIsOpen(false)}
              />
            </HStack>
          </Flex>
        </Box>
        
        {!isMinimized && (
          <>
            {/* Messages */}
            <Box
              flex="1"
              overflowY="auto"
              p="4"
              bg={messagesBg}
              maxH="340px"
            >
              <VStack spacing="4" align="stretch">
                {messages.map((msg) => (
                  <Flex
                    key={msg.id}
                    justify={msg.role === 'user' ? 'flex-end' : 'flex-start'}
                    align="flex-start"
                  >
                    {msg.role === 'assistant' && (
                      <Avatar
                        size="sm"
                        bg="blue.500"
                        icon={<Bot size={16} />}
                        color="white"
                        mr="3"
                        flexShrink="0"
                      />
                    )}
                    
                    <VStack align={msg.role === 'user' ? 'flex-end' : 'flex-start'} spacing="2" maxW="75%">
                      <Box
                        p="3"
                        borderRadius="2xl"
                        fontSize="sm"
                        lineHeight="relaxed"
                        bg={msg.role === 'user' ? 'blue.500' : 'white'}
                        color={msg.role === 'user' ? 'white' : 'gray.800'}
                        borderBottomLeftRadius={msg.role === 'assistant' ? 'md' : '2xl'}
                        borderBottomRightRadius={msg.role === 'user' ? 'md' : '2xl'}
                        boxShadow="sm"
                        border={msg.role === 'assistant' ? '1px' : 'none'}
                        borderColor="gray.100"
                      >
                        {msg.content}
                      </Box>
                      
                      {/* Sources */}
                      {msg.sources && msg.sources.length > 0 && (
                        <Box
                          w="full"
                          bg="gray.50"
                          border="1px"
                          borderColor="gray.200"
                          borderRadius="lg"
                          p="3"
                          fontSize="xs"
                        >
                          <Text fontWeight="semibold" mb="2" color="gray.700">
                            Sources ({msg.sources.length})
                          </Text>
                          <VStack spacing="2" align="stretch">
                            {msg.sources.map((source, index) => (
                              <Box key={index}>
                                <HStack justify="space-between">
                                  <Text color="gray.600" fontWeight="medium">
                                    📄 {source.source}
                                  </Text>
                                  <Badge colorScheme="blue" size="sm">
                                    {source.similarity}% match
                                  </Badge>
                                </HStack>
                                <Text color="gray.500" noOfLines={2}>
                                  {source.content}
                                </Text>
                              </Box>
                            ))}
                          </VStack>
                        </Box>
                      )}
                    </VStack>
                    
                    {msg.role === 'user' && (
                      <Avatar
                        size="sm"
                        bg="gray.300"
                        icon={<User size={16} />}
                        color="gray.600"
                        ml="3"
                        flexShrink="0"
                      />
                    )}
                  </Flex>
                ))}
                
                {/* Loading indicator */}
                {isLoading && (
                  <Flex align="flex-start">
                    <Avatar
                      size="sm"
                      bg="blue.500"
                      icon={<Bot size={16} />}
                      color="white"
                      mr="3"
                      flexShrink="0"
                    />
                    <Box
                      bg="white"
                      p="3"
                      borderRadius="2xl"
                      borderBottomLeftRadius="md"
                      boxShadow="sm"
                      border="1px"
                      borderColor="gray.100"
                    >
                      <HStack spacing="1">
                        <Box
                          w="2"
                          h="2"
                          bg="gray.400"
                          borderRadius="full"
                          css={{
                            animation: "bounce 1s infinite"
                          }}
                        />
                        <Box
                          w="2"
                          h="2"
                          bg="gray.400"
                          borderRadius="full"
                          css={{
                            animation: "bounce 1s infinite",
                            animationDelay: "0.1s"
                          }}
                        />
                        <Box
                          w="2"
                          h="2"
                          bg="gray.400"
                          borderRadius="full"
                          css={{
                            animation: "bounce 1s infinite",
                            animationDelay: "0.2s"
                          }}
                        />
                      </HStack>
                    </Box>
                  </Flex>
                )}
                <div ref={messagesEndRef} />
              </VStack>
            </Box>

            {/* Input */}
            <Box p="4" borderTop="1px" borderColor={borderColor} bg={chatBg}>
              <form onSubmit={handleSendMessage}>
                <HStack spacing="2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask me about AI, projects, or anything..."
                    bg="gray.50"
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="xl"
                    _focus={{
                      outline: 'none',
                      ring: 2,
                      ringColor: 'blue.500',
                      borderColor: 'transparent'
                    }}
                    fontSize="sm"
                    isDisabled={isLoading}
                  />
                  <IconButton
                    type="submit"
                    aria-label="Send message"
                    icon={<Send size={16} />}
                    bgGradient="linear(to-r, blue.500, purple.600)"
                    color="white"
                    _hover={{
                      bgGradient: 'linear(to-r, blue.600, purple.700)',
                      boxShadow: 'md'
                    }}
                    borderRadius="xl"
                    isDisabled={!message.trim() || isLoading}
                    isLoading={isLoading}
                  />
                </HStack>
              </form>
              
              <Text fontSize="xs" color="gray.500" textAlign="center" mt="2">
                RAG-Powered AI • Press Enter to send
              </Text>
            </Box>
          </>
        )}
      </Box>
    </Box>
  )
}