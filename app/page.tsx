'use client'

import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
import Link from 'next/link'
import AIChatInterface from '@/components/AIChatInterface'
import NewsletterSubscribe from '@/components/NewsletterSubscribe'

export default function Home() {
  return (
    <Box w="full" display="flex" justifyContent="center">
      <Container 
        maxW="container.xl" 
        pt={{ base: 20, sm: 24, md: 28, lg: 32 }}
        px={{ base: 4, sm: 6, md: 8 }}
        centerContent
      >
        <VStack 
          spacing={{ base: 6, sm: 8, md: 10, lg: 12 }} 
          alignItems="center" 
          textAlign="center"
          w="full"
          maxW="container.lg"
        >
          <Box 
            position="relative" 
            width="full" 
            display="flex" 
            flexDirection="column" 
            alignItems="center"
          >
            {/* Content */}
            <Heading 
              as="h1" 
              size={{ base: "lg", sm: "xl", md: "2xl" }}
              mb={{ base: 2, sm: 3, md: 4, lg: 6 }}
            >
              Hi, I&apos;m Robert
            </Heading>

            <Text 
              fontSize={{ base: "md", sm: "lg", md: "xl" }}
              maxW={{ base: "100%", sm: "90%", md: "container.md" }}
              mt={{ base: 6, sm: 8, md: 10, lg: 12 }}
              lineHeight={{ base: "tall", md: "taller" }}
            >
              I am an application developer passionate about crafting intuitive user experiences to
              help people and businesses solve problems.
            </Text>

            <Box 
              display="flex" 
              flexDirection={{ base: 'column', sm: 'row' }}
              gap={{ base: 2, sm: 3, md: 4 }} 
              mt={{ base: 4, sm: 6, md: 8 }}
              width={{ base: 'full', sm: 'auto' }}
            >
              <Button
                as={Link}
                href="/about"
                variant="solid"
                size={{ base: "md", md: "lg" }}
                width={{ base: 'full', sm: 'auto' }}
              >
                More About Me
              </Button>
              <Button
                as={Link}
                href="/projects"
                variant="outline"
                size={{ base: "md", md: "lg" }}
                width={{ base: 'full', sm: 'auto' }}
              >
                View Projects
              </Button>
            </Box>
          </Box>

          {/* Newsletter Component */}
          <Box w="full" maxW="container.md" px={{ base: 0, sm: 4 }}>
            <NewsletterSubscribe />
          </Box>

          {/* Chat interface */}
          <Box w="full" maxW="container.md" px={{ base: 0, sm: 4 }}>
            <AIChatInterface />
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}
