import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'black',
        color: 'white',
      },
    },
  },
  colors: {
    // Your custom colors here
  },
  fonts: {
    heading: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    body: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: '600',
      },
    },
    Button: {
      baseStyle: {
        _hover: {
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        },
        transition: 'all 0.2s',
      },
    },
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: 'none',
        },
      },
    },
  },
})

export default theme 