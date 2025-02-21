'use client'

import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import Link from 'next/link'
import NewsletterSubscribe from '@/components/NewsletterSubscribe'

export default function Home() {
  const textColor = useColorModeValue('gray.800', 'gray.100')

  return (
    <Container maxW="container.lg" pt={{ base: 32, md: 40 }} pb={20}>
      <VStack spacing={8} alignItems="center" textAlign="center">
        <Heading as="h1" size="2xl">
          Hi, I&apos;m Robert
        </Heading>
        
        <Text fontSize="xl" color={textColor} maxW="container.md">
          I am an application developer passionate about crafting intuitive user
          experiences to help people and businesses solve problems.
        </Text>

        <Box display="flex" gap={4} mt={4}>
          <Button
            as={Link}
            href="/about"
            size="lg"
            height="60px"
            px={8}
            fontSize="lg"
          >
            More About Me
          </Button>
          <Button
            as={Link}
            href="/projects"
            size="lg"
            height="60px"
            px={8}
            fontSize="lg"
            variant="outline"
          >
            View Projects
          </Button>
        </Box>

        {/* Add Newsletter Component */}
        <NewsletterSubscribe />
      </VStack>
    </Container>
  )
}
