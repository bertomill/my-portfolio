'use client'

import {
  Box,
  Flex,
  HStack,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { AiFillHome } from 'react-icons/ai'
import { BsFillPersonFill, BsFillGridFill } from 'react-icons/bs'
import { FaBlog } from 'react-icons/fa'
import NavLink from './NavLink'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 26, 26, 0.8)')
  const borderColor = useColorModeValue('rgba(0, 0, 0, 0.1)', 'rgba(255, 255, 255, 0.1)')

  return (
    <Box 
      position="fixed" 
      w="full" 
      zIndex={999} 
      backdropFilter="blur(10px)" 
      bg={bg}
      borderBottom="1px solid"
      borderColor={borderColor}
      boxShadow={`inset 0 -1px 0 0 ${borderColor}`}
    >
      <Flex 
        px={{ base: 4, md: 8 }} 
        h="64px" 
        alignItems="center" 
        justifyContent="space-between" 
        maxW="container.lg" 
        mx="auto"
      >
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          variant="ghost"
          _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
        />

        <HStack spacing={4} display={{ base: 'none', md: 'flex' }} flex={1} justify="center">
          <NavLink href="/" icon={AiFillHome}>Home</NavLink>
          <NavLink href="/about" icon={BsFillPersonFill}>About</NavLink>
          <NavLink href="/projects" icon={BsFillGridFill}>Projects</NavLink>
          <NavLink href="/blog" icon={FaBlog}>Blog</NavLink>
        </HStack>

        <ThemeToggle />
      </Flex>
    </Box>
  )
}

export default Navbar 