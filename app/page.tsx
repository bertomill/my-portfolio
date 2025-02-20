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
import Script from 'next/script'

export default function Home() {
  const textColor = useColorModeValue('gray.800', 'gray.100')

  return (
    <Container maxW="container.lg" pt={{ base: 32, md: 40 }} pb={20}>
      {/* Kit Form Script */}
      <Script
        async
        data-uid="eaea810148"
        src="https://berto-mill.kit.com/eaea810148/index.js"
        strategy="afterInteractive"
      />

      <VStack spacing={8} alignItems="center" textAlign="center">
        <Heading 
          as="h1" 
          fontSize={{ base: '4xl', md: '6xl' }}
          letterSpacing="tight"
          lineHeight="1.2"
        >
          Hi, I&apos;m Robert
        </Heading>
        <Text
          fontSize={{ base: 'lg', md: 'xl' }}
          color={textColor}
          maxW="container.md"
          lineHeight="tall"
        >
          I am an application developer passionate about crafting intuitive user experiences 
          to help people and businesses solve problems.
        </Text>
        <Box pt={8}>
          <Button
            as={Link}
            href="/about"
            size="lg"
            height="60px"
            px={8}
            fontSize="lg"
            mr={4}
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

        {/* Kit will inject the form here */}
        <Box w="full" maxW="md" mt={16}>
          {/* The form will be automatically injected by Kit's script */}
        </Box>
      </VStack>
    </Container>
  )
}
