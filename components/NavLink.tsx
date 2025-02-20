'use client'

import { Link as ChakraLink, Icon, HStack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { IconType } from 'react-icons'

interface NavLinkProps {
  href: string
  icon?: IconType
  children: React.ReactNode
  onClick?: () => void
}

export default function NavLink({ href, icon, children, onClick }: NavLinkProps) {
  return (
    <Link href={href} passHref legacyBehavior>
      <ChakraLink
        display="flex"
        alignItems="center"
        fontSize="sm"
        fontWeight="medium"
        px={3}
        py={2}
        rounded="md"
        _hover={{
          bg: 'whiteAlpha.100'
        }}
        onClick={onClick}
      >
        <HStack spacing={3}>
          {icon && <Icon as={icon} boxSize={4} />}
          <Text>{children}</Text>
        </HStack>
      </ChakraLink>
    </Link>
  )
} 