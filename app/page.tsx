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

// Dynamically import components that need browser APIs
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })
const NewsletterSubscribe = dynamic(() => import('@/components/NewsletterSubscribe'), { ssr: false })
const AIChatInterface = dynamic(() => import('@/components/AIChatInterface'), { ssr: false })

// Import animation data
import drawSmileAnimation from '@/public/animations/DrawSmile.json'

export default function Home() {
  // Responsive values for animation
  const animationWidth = useBreakpointValue({ 
    base: '1100px',
    sm: '1000px',
    md: '1200px',
    lg: '1400px'
  })
  
  const animationHeight = useBreakpointValue({ 
    base: '400px',
    sm: '350px',
    md: '450px',
    lg: '500px'
  })
  
  const animationLeft = useBreakpointValue({ 
    base: '50%',
    sm: '50%',
    md: '52%',
    lg: '53%'
  })
  
  const animationTop = useBreakpointValue({ 
    base: '0%',
    sm: '0%',
    md: '0%',
    lg: '0%'
  })

  return (
    <Container 
      maxW="container.xl" 
      pt={{ base: 20, sm: 24, md: 28, lg: 40 }}
      px={{ base: 4, sm: 6, md: 8 }}
    >
      <VStack 
        spacing={{ base: 3, sm: 4, md: 6, lg: 8 }} 
        alignItems="center" 
        textAlign="center"
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
            transform="translate(-50%, -50%)"
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
            Hi, I&apos;m Robert
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

        {/* Add Newsletter Component */}
        <NewsletterSubscribe />

        {/* Add the chat interface */}
        <Box w="full" maxW="container.md" mt={8}>
          <AIChatInterface />
        </Box>
      </VStack>
    </Container>
  )
}
