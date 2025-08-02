'use client'

import {
  Box,
  Container,
  Text,
  VStack,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react'
import SocialLinks from './SocialLinks'

export default function Footer() {
  const year = new Date().getFullYear()
  const textColor = useColorModeValue('gray.400', 'gray.400')
  
  return (
    <Box as="footer" py={6} mt={8}>
      <Container maxW="container.xl">
        <VStack spacing={4}>
          <SocialLinks />
          
          <Divider width="60%" opacity={0.2} />
          
          <Text fontSize="sm" color={textColor} textAlign="center">
            © {year} Berto Mill. All rights reserved.
          </Text>
        </VStack>
      </Container>
    </Box>
  )
} 