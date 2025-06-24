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

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure()
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Speaking', href: '/speaking' },
    { name: 'Blog', href: '/blog' },
  ]

  return (
    <Box 
      as="nav" 
      position="fixed" 
      w="100%" 
      zIndex="sticky"
      className="nav-glass"
      borderBottom="1px solid"
      borderColor="rgba(212, 197, 169, 0.15)"
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
                  color={pathname === item.href ? "var(--deep-beige)" : "var(--charcoal)"}
                  position="relative"
                  transition="all 0.3s ease"
                  fontSize="sm"
                  letterSpacing="0.5px"
                  textTransform="uppercase"
                  _hover={{
                    color: "var(--deep-beige)",
                    transform: "translateY(-1px)"
                  }}
                  _after={{
                    content: '""',
                    position: 'absolute',
                    width: pathname === item.href ? '100%' : '0%',
                    height: '1px',
                    bottom: '-4px',
                    left: '0',
                    background: 'linear-gradient(135deg, var(--warm-gray) 0%, var(--deep-beige) 100%)',
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
            className="glass-effect"
            borderRadius="6px"
            mt={4}
            p={4}
          >
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={onToggle}>
                <Text
                  fontWeight={pathname === item.href ? "400" : "300"}
                  color={pathname === item.href ? "var(--deep-beige)" : "var(--charcoal)"}
                  transition="all 0.3s ease"
                  fontSize="sm"
                  letterSpacing="0.5px"
                  textTransform="uppercase"
                  _hover={{
                    color: "var(--deep-beige)",
                    transform: "translateX(4px)",
                    bg: "rgba(160, 139, 115, 0.1)"
                  }}
                  p={2}
                  borderRadius="4px"
                >
                  {item.name}
                </Text>
              </Link>
            ))}
            
            <Divider my={2} opacity={0.2} />
            
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