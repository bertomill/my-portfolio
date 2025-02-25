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
    <Box as="footer" py={8} mt={16}>
      <Container maxW="container.xl">
        <VStack spacing={6}>
          <SocialLinks />
          
          <Divider width="60%" opacity={0.2} />
          
          <Text fontSize="sm" color={textColor} textAlign="center">
            © {year} Robert Mill. All rights reserved.
          </Text>
        </VStack>
      </Container>
    </Box>
  )
} 