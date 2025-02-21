'use client'

import Lottie from 'lottie-react'
import { Box, Center, Container } from '@chakra-ui/react'
import drawSmileAnimation from '@/public/animations/DrawSmile.json'

export default function TestPage() {
  return (
    <Container maxW="container.xl" py={20}>
      <Center>
        <Box 
          width="400px"
          height="400px"
          position="relative"
        >
          <Lottie
            animationData={drawSmileAnimation}
            loop={false}
            autoplay={true}
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              background: 'transparent',
            }}
            initialSegment={[0, 100]}
            onComplete={() => {
              console.log('Animation completed')
            }}
          />
        </Box>
      </Center>
    </Container>
  )
} 