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
  Text,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SocialLinks from './SocialLinks'
import { useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Art', href: '/art' },
    { name: 'Speaking', href: '/speaking' },
    { name: 'Blog', href: '/blog' },
    { name: 'Prompts', href: '/prompts' },
    { name: 'Books', href: '/books' },
  ]

  return (
    <Box 
      as="nav" 
      position="fixed" 
      w="100%" 
      zIndex="sticky"
      className="nav-glass"
      borderBottom="1px solid"
      borderColor="rgba(157, 167, 174, 0.35)"
      bg="rgba(147, 145, 152, 0.55)"
      backdropFilter="auto"
      backdropBlur="10px"
    >
      <Container maxW="container.xl" py={4}>
        <Flex align="center" justify="space-between">
          {/* Desktop Navigation */}
          <Stack
            direction="row"
            spacing={8}
            align="center"
            display={{ base: 'none', md: 'flex' }}
          >
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Text
                  fontWeight={pathname === item.href ? "400" : "300"}
                  color={pathname === item.href ? "#1b5e20" : "var(--charcoal)"}
                  position="relative"
                  transition="all 0.3s ease"
                  fontSize="sm"
                  letterSpacing="0.5px"
                  textTransform="uppercase"
                  _hover={{
                    color: "#2e7d32",
                    transform: "translateY(-1px)"
                  }}
                  _after={{
                    content: '""',
                    position: 'absolute',
                    width: pathname === item.href ? '100%' : '0%',
                    height: '1px',
                    bottom: '-4px',
                    left: '0',
                    background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
                    transition: 'width 0.3s ease',
                  }}
                  sx={{
                    '&:hover::after': {
                      width: '100%'
                    }
                  }}
                >
                  {item.name}
                </Text>
              </Link>
            ))}
          </Stack>

          {/* Mobile Hamburger */}
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onToggle}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            variant="ghost"
            aria-label="Toggle Navigation"
            className="glass-effect"
            color="var(--charcoal)"
            _hover={{
              transform: "scale(1.05)",
              bg: "rgba(160, 139, 115, 0.1)"
            }}
            transition="all 0.3s ease"
          />

          {/* Theme Toggle and Social Links - Desktop Only */}
          <HStack 
            spacing={4} 
            display={{ base: 'none', md: 'flex' }}
            ml="auto"
          >
            <IconButton
              aria-label="Toggle theme"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              size="md"
            />
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
            className="glass-effect"
            borderRadius="6px"
            mt={4}
            p={4}
          >
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={onToggle}>
                <Text
                  fontWeight={pathname === item.href ? "400" : "300"}
                  color={pathname === item.href ? "#1b5e20" : "var(--charcoal)"}
                  transition="all 0.3s ease"
                  fontSize="sm"
                  letterSpacing="0.5px"
                  textTransform="uppercase"
                  _hover={{
                    color: "#2e7d32",
                    transform: "translateX(4px)",
                    bg: "rgba(30, 94, 32, 0.12)"
                  }}
                  p={2}
                  borderRadius="4px"
                >
                  {item.name}
                </Text>
              </Link>
            ))}
            
            <Divider my={2} opacity={0.2} />
            
            {/* Theme Toggle - Mobile */}
            <Box pt={2} pb={1} display="flex" justifyContent="center">
              <IconButton
                aria-label="Toggle theme"
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="ghost"
                size="md"
              />
            </Box>
            
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