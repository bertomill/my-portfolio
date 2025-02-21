'use client'

import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  VStack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { useState } from 'react'

// Subtle gradient animation
const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  
  const bgColor = useColorModeValue('rgba(23, 25, 35, 0.7)', 'rgba(23, 25, 35, 0.7)')
  const inputBg = useColorModeValue('rgba(23, 25, 35, 0.5)', 'rgba(23, 25, 35, 0.5)')
  const textColor = useColorModeValue('gray.100', 'gray.100')
  const borderGlow = useColorModeValue(
    '0 0 15px rgba(255, 255, 255, 0.1)',
    '0 0 15px rgba(255, 255, 255, 0.1)'
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error)

      toast({
        title: 'Subscribed!',
        description: data.message || "Thanks for subscribing to the newsletter!",
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      })
      setEmail('')
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || "Couldn't subscribe. Please try again.",
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      p={8}
      borderRadius="xl"
      bg={bgColor}
      backdropFilter="blur(10px)"
      maxW="container.md"
      mx="auto"
      mt={16}
      position="relative"
      boxShadow={borderGlow}
      _before={{
        content: '""',
        position: 'absolute',
        top: '-1px',
        left: '-1px',
        right: '-1px',
        bottom: '-1px',
        borderRadius: 'xl',
        padding: '1px',
        background: 'linear-gradient(90deg, #ffffff08, #ffffff03)',
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        maskComposite: 'exclude',
      }}
      transition="transform 0.2s, box-shadow 0.2s"
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: '0 0 20px rgba(255, 255, 255, 0.15)',
      }}
    >
      <VStack spacing={6} align="stretch">
        <Heading 
          as="h3" 
          size="lg" 
          textAlign="center" 
          color="white"
          bgGradient="linear(to-r, gray.100, white, gray.100)"
          bgClip="text"
          sx={{
            animation: `${gradientShift} 8s ease infinite`,
            backgroundSize: '200% auto',
          }}
        >
          Stay Updated
        </Heading>
        
        <Text textAlign="center" color={textColor}>
          Subscribe to get notified about new projects and tech insights.
        </Text>

        <Box 
          display="flex" 
          gap={4}
          position="relative"
          _before={{
            content: '""',
            position: 'absolute',
            top: '-10px',
            left: '-10px',
            right: '-10px',
            bottom: '-10px',
            bg: 'rgba(255, 255, 255, 0.03)',
            borderRadius: 'lg',
            filter: 'blur(8px)',
            zIndex: -1,
          }}
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            size="lg"
            required
            flex={1}
            bg={inputBg}
            border="none"
            color="white"
            _placeholder={{ color: 'gray.400' }}
            _hover={{ bg: 'rgba(23, 25, 35, 0.6)' }}
            _focus={{ 
              bg: 'rgba(23, 25, 35, 0.8)',
              boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1)',
            }}
            disabled={isLoading}
            transition="all 0.2s"
            backdropFilter="blur(5px)"
          />
          <Button
            type="submit"
            size="lg"
            bg="white"
            color="black"
            _hover={{ 
              bg: 'gray.100',
              transform: 'translateY(-1px)',
              boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)'
            }}
            _active={{
              transform: 'translateY(0)',
            }}
            isLoading={isLoading}
            loadingText="Subscribing..."
            px={8}
            transition="all 0.2s"
          >
            Subscribe
          </Button>
        </Box>

        <Text 
          fontSize="sm" 
          color="gray.400" 
          textAlign="center"
          opacity={0.8}
          _hover={{ opacity: 1 }}
          transition="opacity 0.2s"
        >
          No spam. Unsubscribe at any time.
        </Text>
      </VStack>
    </Box>
  )
} 