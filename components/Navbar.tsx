'use client'

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link as ChakraLink,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  VStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons'
import { AiFillHome } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { GoProject } from 'react-icons/go'
import { BiBrain } from 'react-icons/bi'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(0, 0, 0, 0.8)')
  const pathname = usePathname()

  const NavLink = ({ href, icon, children }: { href: string, icon: React.ReactElement, children: React.ReactNode }) => {
    const isActive = pathname === href
    return (
      <Link href={href} passHref>
        <ChakraLink 
          display="flex"
          alignItems="center"
          fontSize="sm"
          fontWeight="medium"
          px={3}
          py={2}
          rounded="full"
          bg={isActive ? useColorModeValue('gray.100', 'whiteAlpha.100') : 'transparent'}
          _hover={{ 
            bg: useColorModeValue('gray.100', 'whiteAlpha.100'),
            textDecoration: 'none'
          }}
          onClick={onClose}
        >
          <Box as="span" mr={2}>
            {icon}
          </Box>
          {children}
        </ChakraLink>
      </Link>
    )
  }

  const navItems = [
    { href: '/', label: 'Home', icon: <AiFillHome size="1.2em" /> },
    { href: '/about', label: 'About', icon: <CgProfile size="1.2em" /> },
    { href: '/projects', label: 'Projects', icon: <GoProject size="1.2em" /> },
    { href: '/blog', label: 'Blog', icon: <BiBrain size="1.2em" /> },
  ]

  return (
    <Box 
      position="fixed" 
      w="full" 
      zIndex={999}
      backdropFilter="blur(10px)"
      bg={bg}
    >
      <Flex
        px={{ base: 4, md: 8 }}
        h="64px"
        alignItems="center"
        justifyContent="space-between"
        maxW="container.lg"
        mx="auto"
      >
        {/* Mobile menu button */}
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant="ghost"
          aria-label="Open menu"
          icon={<HamburgerIcon />}
        />

        {/* Desktop navigation */}
        <HStack 
          spacing={4}
          display={{ base: 'none', md: 'flex' }}
          flex={1}
          justify="center"
        >
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} icon={item.icon}>
              {item.label}
            </NavLink>
          ))}
        </HStack>

        {/* Theme toggle button */}
        <IconButton
          variant="ghost"
          size="sm"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          aria-label="Toggle color mode"
        />

        {/* Mobile drawer */}
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <VStack align="stretch" spacing={2}>
                {navItems.map((item) => (
                  <NavLink key={item.href} href={item.href} icon={item.icon}>
                    {item.label}
                  </NavLink>
                ))}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  )
}

export { Navbar } 