'use client'

import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

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
        description: "Thanks for subscribing!",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      setEmail('')
    } catch (error) {
      toast({
        title: 'Error',
        description: "Couldn't subscribe. Please try again.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      p={4}
      borderRadius="lg"
      bg="hsl(0 0% 7%)"
      border="1px solid"
      borderColor="whiteAlpha.100"
    >
      <VStack spacing={3}>
        <Heading as="h3" size="md" textAlign="center" color="white">
          Stay Updated
        </Heading>
        
        <Text fontSize="sm" color="gray.300" textAlign="center">
          Subscribe to get notified about new projects and tech insights.
        </Text>

        <Box display="flex" gap={2} w="full">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            size="md"
            required
            bg="hsl(0 0% 9%)"
            border="1px solid"
            borderColor="whiteAlpha.100"
            _hover={{ bg: 'hsl(0 0% 11%)' }}
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="md"
            bg="hsl(0 0% 9%)"
            color="white"
            _hover={{ bg: 'hsl(0 0% 13%)' }}
            isLoading={isLoading}
            loadingText="..."
          >
            Subscribe
          </Button>
        </Box>

        <Text fontSize="xs" color="gray.500" textAlign="center">
          No spam. Unsubscribe at any time.
        </Text>
      </VStack>
    </Box>
  )
} 