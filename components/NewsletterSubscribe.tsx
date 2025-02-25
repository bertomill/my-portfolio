'use client'

import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
  keyframes,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BellIcon } from '@chakra-ui/icons'

const MotionBox = motion(Box)
const MotionIcon = motion(Icon)

// Subtle pulse animation
const pulsate = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(66, 153, 225, 0.3); }
  70% { box-shadow: 0 0 0 15px rgba(66, 153, 225, 0); }
  100% { box-shadow: 0 0 0 0 rgba(66, 153, 225, 0); }
`

// Subtle glow animation for the border
const glow = keyframes`
  0% { border-color: rgba(66, 153, 225, 0.3); }
  50% { border-color: rgba(66, 153, 225, 0.6); }
  100% { border-color: rgba(66, 153, 225, 0.3); }
`

// Subtle float animation
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const toast = useToast()
  
  const borderColor = useColorModeValue('blue.400', 'blue.400')
  const buttonBg = useColorModeValue('blue.500', 'blue.500')
  const buttonHoverBg = useColorModeValue('blue.600', 'blue.600')
  const gradientStart = useColorModeValue('blue.400', 'blue.400')
  const gradientEnd = useColorModeValue('purple.400', 'purple.400')

  // Set visibility after a delay for entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

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
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 20 
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      transition={{ duration: 0.5, delay: 0.2 }}
      as="form"
      onSubmit={handleSubmit}
      p={6}
      borderRadius="lg"
      bg="hsl(0 0% 7%)"
      border="1px solid"
      borderColor="whiteAlpha.200"
      position="relative"
      _after={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 'lg',
        animation: `${pulsate} 3s infinite`,
        zIndex: -1,
      }}
      _before={{
        content: '""',
        position: 'absolute',
        top: -1,
        left: -1,
        right: -1,
        bottom: -1,
        borderRadius: 'lg',
        border: '1px solid transparent',
        animation: `${glow} 4s infinite`,
        zIndex: -1,
      }}
      boxShadow="0 4px 20px rgba(0, 0, 0, 0.2)"
      transform="translateZ(0)"
      overflow="hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box 
        position="absolute" 
        top="0" 
        left="0" 
        right="0" 
        height="3px" 
        bgGradient={`linear(to-r, ${gradientStart}, ${gradientEnd})`}
      />
      
      <VStack spacing={4}>
        <Box position="relative" textAlign="center">
          <MotionIcon
            as={BellIcon}
            color="blue.300"
            boxSize={5}
            mr={2}
            display="inline-block"
            verticalAlign="middle"
            animate={{ 
              rotate: isHovered ? [0, 15, -15, 0] : 0 
            }}
            transition={{ 
              duration: 0.5, 
              repeat: isHovered ? 1 : 0 
            }}
          />
          <Heading 
            as="h3" 
            size="md" 
            textAlign="center" 
            color="white"
            display="inline-block"
            verticalAlign="middle"
            bgGradient={`linear(to-r, ${gradientStart}, ${gradientEnd})`}
            bgClip="text"
          >
            Stay Updated
          </Heading>
        </Box>
        
        <Text fontSize="sm" color="gray.300" textAlign="center">
          Subscribe to get notified about new projects and tech insights.
        </Text>

        <MotionBox 
          display="flex" 
          gap={2} 
          w="full"
          animate={{ 
            y: isVisible ? [0, -5, 0] : 0 
          }}
          transition={{ 
            duration: 2, 
            delay: 1.5,
            repeat: 1,
            repeatType: "reverse" 
          }}
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            size="md"
            required
            bg="hsl(0 0% 9%)"
            border="1px solid"
            borderColor="whiteAlpha.200"
            _hover={{ borderColor: borderColor, bg: 'hsl(0 0% 11%)' }}
            _focus={{ borderColor: borderColor, boxShadow: `0 0 0 1px ${borderColor}` }}
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="md"
            bg={buttonBg}
            color="white"
            _hover={{ bg: buttonHoverBg, transform: 'translateY(-2px)' }}
            _active={{ transform: 'translateY(0)' }}
            isLoading={isLoading}
            loadingText="..."
            fontWeight="medium"
            transition="all 0.2s"
          >
            Subscribe
          </Button>
        </MotionBox>

        <Text fontSize="xs" color="gray.500" textAlign="center">
          No spam. Unsubscribe at any time.
        </Text>
      </VStack>
    </MotionBox>
  )
} 