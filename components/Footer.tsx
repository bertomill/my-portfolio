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
import { usePathname } from 'next/navigation'

export default function Footer() {
  const year = new Date().getFullYear()
  const textColor = useColorModeValue('gray.400', 'gray.400')
  const pathname = usePathname()
  const isArtPage = pathname?.startsWith('/art')
  const dividerColor = useColorModeValue('rgba(147,145,152,0.35)', 'rgba(147,145,152,0.35)')
  
  return (
    <Box 
      as="footer" 
      py={6} 
      mt={8}
      bgGradient={isArtPage ? "linear(to-b, #9da7ae, #939198)" : undefined}
      borderTop={isArtPage ? '1px solid' : undefined}
      borderColor={isArtPage ? 'rgba(157, 167, 174, 0.35)' : undefined}
    >
      <Container maxW="container.xl">
        <VStack spacing={4}>
          <SocialLinks />
          
          <Divider width="60%" opacity={0.4} borderColor={isArtPage ? dividerColor : undefined} />
          
          <Text fontSize="sm" color={textColor} textAlign="center">
            © {year} Berto Mill. All rights reserved.
          </Text>
        </VStack>
      </Container>
    </Box>
  )
} 