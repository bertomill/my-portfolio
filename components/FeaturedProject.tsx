'use client'

import {
  Box,
  Heading,
  Text,
  Link,
  Image,
  HStack,
  Tag,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

export default function FeaturedProject() {
  const hoverBg = useColorModeValue('rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.05)')
  
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      w="full"
    >
      <Heading 
        as="h2" 
        size={{ base: "md", md: "lg" }} 
        mb={4}
        textAlign="center"
      >
        Latest Project
      </Heading>
      
      <Box
        p={{ base: 4, md: 5 }}
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

        <HStack spacing={5} align="start">
          <Image 
            src="/letterpipe-logo.svg" 
            alt="LetterPipe Logo" 
            boxSize={{ base: "70px", md: "80px" }}
            objectFit="cover"
            borderRadius="md"
          />
          <VStack align="start" spacing={2}>
            <Heading size={{ base: "sm", md: "md" }}>LetterPipe</Heading>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Streamline your newsletter creation process with AI assistance.
            </Text>
            <HStack spacing={2} flexWrap="wrap" gap={2}>
              <Tag size="sm">Newsletter</Tag>
              <Tag size="sm">AI</Tag>
            </HStack>
            <Link 
              href="https://letterpipe.vercel.app/" 
              isExternal 
              color="blue.500" 
              fontWeight="medium"
              _hover={{ textDecoration: 'underline' }}
              display="flex"
              alignItems="center"
              target="_blank"
              rel="noopener noreferrer"
              fontSize={{ base: "sm", md: "md" }}
            >
              View Project <ExternalLinkIcon mx="2px" />
            </Link>
          </VStack>
        </HStack>
      </Box>
    </MotionBox>
  )
} 