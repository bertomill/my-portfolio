'use client'

import {
  Box,
  Container,
  Flex,
  IconButton,
  Stack,
  useDisclosure,
  VStack,
  HStack,
  Divider,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import SocialLinks from './SocialLinks'

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box as="nav" position="fixed" w="100%" zIndex="sticky" backdropFilter="blur(10px)">
      <Container maxW="container.xl" py={4}>
        <Flex align="center" justify="space-between">
          {/* Desktop Navigation */}
          <Stack
            direction="row"
            spacing={8}
            align="center"
            display={{ base: 'none', md: 'flex' }}
          >
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/blog">Blog</Link>
          </Stack>

          {/* Mobile Hamburger */}
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onToggle}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            variant="ghost"
            aria-label="Toggle Navigation"
          />

          {/* Social Links - Desktop Only */}
          <HStack 
            spacing={4} 
            display={{ base: 'none', md: 'flex' }}
            ml="auto"
          >
            <SocialLinks />
          </HStack>
        </Flex>

        {/* Mobile Navigation */}
        {isOpen && (
          <VStack
            display={{ base: 'flex', md: 'none' }}
            py={4}
            spacing={4}
            align="stretch"
          >
            <Link href="/" onClick={onToggle}>Home</Link>
            <Link href="/about" onClick={onToggle}>About</Link>
            <Link href="/projects" onClick={onToggle}>Projects</Link>
            <Link href="/blog" onClick={onToggle}>Blog</Link>
            
            <Divider my={2} />
            
            {/* Social Links - Mobile */}
            <Box pt={2} pb={1}>
              <SocialLinks />
            </Box>
          </VStack>
        )}
      </Container>
    </Box>
  )
} 