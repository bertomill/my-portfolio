'use client'

import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react'
import Link from 'next/link'
import NewsletterSubscribe from '@/components/NewsletterSubscribe'
import FeaturedProject from '@/components/FeaturedProject'
import LatestBlogPost from '@/components/LatestBlogPost'

export default function Home() {
  const sectionBg = useColorModeValue('rgba(255, 255, 255, 0.03)', 'rgba(255, 255, 255, 0.03)')

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
              Hi, I&apos;m Robert 👋
            </Heading>

            <Text 
              fontSize={{ base: "md", sm: "lg", md: "xl" }}
              maxW={{ base: "100%", sm: "90%", md: "container.md" }}
              lineHeight={{ base: "tall", md: "taller" }}
            >
              I am a technology consultant and ML application developer based in Toronto, passionate about crafting intuitive user experiences to
              help people and businesses solve problems.
            </Text>

            {/* Featured Work Section */}
            <Box 
              w="full" 
              mt={{ base: 8, md: 12 }}
              p={{ base: 5, md: 6 }}
              borderRadius="xl"
              bg={sectionBg}
            >
              <VStack spacing={8}>
                <Heading 
                  as="h2" 
                  size={{ base: "md", md: "lg" }}
                  mb={{ base: 2, md: 3 }}
                >
                  Featured Work
                </Heading>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 6, md: 8 }} w="full">
                  <Box>
                    <FeaturedProject />
                  </Box>
                  
                  <Box>
                    <LatestBlogPost />
                  </Box>
                </SimpleGrid>
              </VStack>
            </Box>

            <Box 
              display="flex" 
              flexDirection={{ base: 'column', sm: 'row' }}
              gap={{ base: 2, sm: 3, md: 4 }} 
              mt={{ base: 8, sm: 10, md: 12 }}
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

        </VStack>
      </Container>
    </Box>
  )
}
