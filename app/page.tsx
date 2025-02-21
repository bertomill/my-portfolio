'use client'

import dynamic from 'next/dynamic'
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react'
import Link from 'next/link'
import AIChatInterface from '@/components/AIChatInterface'

// Dynamically import components that need browser APIs
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })
const NewsletterSubscribe = dynamic(() => import('@/components/NewsletterSubscribe'), { ssr: false })

// Import animation data
import drawSmileAnimation from '@/public/animations/DrawSmile.json'

export default function Home() {
  // Adjusted animation values
  const animationWidth = useBreakpointValue({ 
    base: '1000px',
    sm: '1000px',
    md: '1200px',
    lg: '1400px'
  })
  
  const animationHeight = useBreakpointValue({ 
    base: '350px',
    sm: '350px',
    md: '450px',
    lg: '500px'
  })
  
  const animationLeft = useBreakpointValue({ 
    base: '45%',
    sm: '50%',
    md: '52%',
    lg: '53%'
  })
  
  const animationTop = useBreakpointValue({ 
    base: '-35%', // Moved up even further for mobile
    sm: '-45%',
    md: '-40%', // Moved up for desktop
    lg: '-40%'
  })

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
            {/* Animation */}
            <Box
              position="absolute"
              width={animationWidth}
              height={animationHeight}
              top={animationTop}
              left={animationLeft}
              transform="translate(-50%, -20%)" // Reduced transform to move up
              zIndex={10}
              pointerEvents="none"
            >
              <Lottie
                animationData={drawSmileAnimation}
                loop={false}
                autoplay={true}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  background: 'transparent',
                }}
              />
            </Box>

            {/* Content */}
            <Heading 
              as="h1" 
              size={{ base: "lg", sm: "xl", md: "2xl" }}
              position="relative"
              zIndex={1}
              mb={{ base: 2, sm: 3, md: 4, lg: 6 }}
            >
              Hi, I&apos;m Rob
            </Heading>

            <Text 
              fontSize={{ base: "md", sm: "lg", md: "xl" }}
              maxW={{ base: "100%", sm: "90%", md: "container.md" }}
              mt={{ base: 6, sm: 8, md: 10, lg: 12 }}
              position="relative"
              zIndex={1}
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
              position="relative"
              zIndex={1}
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
