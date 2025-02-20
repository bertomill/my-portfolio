'use client'

import {
  Box,
  VStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

export default function NewsletterSubscribe() {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box
      w="full"
      maxW="md"
      mx="auto"
      mt={12}
      p={6}
      bg={bgColor}
      borderRadius="xl"
      borderWidth="1px"
      borderColor={borderColor}
    >
      <VStack spacing={4}>
        <Text fontSize="lg" fontWeight="medium" textAlign="center">
          Subscribe to my newsletter
        </Text>
        <Text fontSize="sm" color="gray.500" textAlign="center">
          Get the latest updates on AI, tech, and development
        </Text>
        
        {/* Substack iframe embed */}
        <iframe
          src="https://bertovmill.substack.com/embed"
          width="100%"
          height="320"
          style={{ 
            border: '1px solid #EEE', 
            background: 'transparent', 
            borderRadius: '8px',
            margin: '0 auto',
          }}
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </VStack>
    </Box>
  )
} 