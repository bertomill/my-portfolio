'use client'

import {
  VStack,
  Heading,
  Box,
  Text,
  Link,
  Image,
  HStack,
  Tag,
  Container,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

export default function Projects() {
  const hoverBg = useColorModeValue('rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.05)')

  return (
    <Container maxW="container.md" px={{ base: 4, md: 8 }}>
      <VStack 
        spacing={8} 
        alignItems="stretch" 
        pt={{ base: 16, md: 40 }} 
        pb={{ base: 16, md: 20 }}
      >
        <Heading 
          as="h1" 
          size={{ base: "xl", md: "2xl" }}
          mb={{ base: 6, md: 8 }} 
          textAlign="center"
        >
          Projects
        </Heading>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Box
            p={{ base: 4, md: 6 }}
            borderRadius="xl"
            position="relative"
            _hover={{
              bg: hoverBg,
              transform: 'translateY(-2px)',
            }}
            transition="all 0.2s"
          >
            <Box
              position="absolute"
              inset={0}
              borderRadius="xl"
              opacity={0}
              bg="linear-gradient(45deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)"
              transition="opacity 0.2s"
              _groupHover={{ opacity: 1 }}
            />

            <HStack spacing={6} align="start">
              <Image 
                src="/letterpipe-logo.svg" 
                alt="LetterPipe Logo" 
                boxSize={{ base: "80px", md: "100px" }}
                objectFit="cover"
                borderRadius="md"
              />
              <VStack align="start" spacing={3}>
                <Heading size={{ base: "md", md: "lg" }}>LetterPipe</Heading>
                <Text>
                  Streamline your newsletter creation process. Save articles, YouTube videos, and notes in one place. 
                  Write better newsletters with AI assistance.
                </Text>
                <HStack spacing={2} flexWrap="wrap" gap={2}>
                  <Tag size={{ base: "sm", md: "md" }}>Newsletter</Tag>
                  <Tag size={{ base: "sm", md: "md" }}>AI</Tag>
                  <Tag size={{ base: "sm", md: "md" }}>Content Creation</Tag>
                </HStack>
                <Link 
                  href="https://letterpipe.vercel.app/" 
                  isExternal 
                  color="blue.500" 
                  fontWeight="medium"
                  _hover={{ textDecoration: 'underline' }}
                >
                  Visit Project →
                </Link>
              </VStack>
            </HStack>
          </Box>
        </MotionBox>
      </VStack>
    </Container>
  )
} 