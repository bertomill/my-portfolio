'use client'

import { Button as ChakraButton } from '@chakra-ui/react'
import type { ButtonProps } from '@chakra-ui/react'

export const Button = ({ children, ...props }: ButtonProps) => {
  return <ChakraButton {...props}>{children}</ChakraButton>
} 