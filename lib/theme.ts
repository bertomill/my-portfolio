import { extendTheme } from '@chakra-ui/theme-utils'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

const theme = extendTheme({
  config,
  fonts: {
    heading: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    body: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? '#000' : '#fff',
        color: props.colorMode === 'dark' ? '#fff' : '#000',
      },
    }),
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: '600',
      },
    },
    Button: {
      baseStyle: {
        fontWeight: '500',
        borderRadius: 'full',
      },
      variants: {
        solid: (props: any) => ({
          bg: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'blackAlpha.900',
          color: props.colorMode === 'dark' ? 'black' : 'white',
          _hover: {
            bg: props.colorMode === 'dark' ? 'whiteAlpha.800' : 'blackAlpha.800',
          },
        }),
        outline: (props: any) => ({
          borderColor: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'blackAlpha.900',
          color: props.colorMode === 'dark' ? 'white' : 'black',
        }),
      },
    },
  },
})

export { theme } 