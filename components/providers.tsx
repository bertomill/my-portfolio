'use client'

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { theme } from '@/lib/theme'
import { CacheProvider } from '@chakra-ui/next-js'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
} 