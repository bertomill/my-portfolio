'use client'

import { Box, Image } from '@chakra-ui/react'

export default function GeometricBackground() {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      zIndex="-1"
      overflow="hidden"
      pointerEvents="none"
    >
      {/* Subtle paper texture background */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        bg="linear-gradient(45deg, 
            rgba(252, 251, 247, 0.95) 0%, 
            rgba(248, 246, 238, 0.92) 25%,
            rgba(252, 251, 247, 0.95) 50%,
            rgba(248, 246, 238, 0.92) 75%,
            rgba(252, 251, 247, 0.95) 100%)"
        opacity="0.3"
      />
      
      {/* CN Tower watercolor - positioned like a journal sketch */}
      <Box
        position="absolute"
        right={{ base: "-120px", md: "-20px", lg: "20px" }}
        top={{ base: "5%", md: "8%" }}
        width={{ base: "350px", md: "500px", lg: "600px" }}
        height={{ base: "700px", md: "1000px", lg: "1200px" }}
        opacity="0.15"
        transform="rotate(2deg)"
        filter="sepia(20%) hue-rotate(15deg)"
      >
        <Image
          src="/cn-tower-watercolor.png"
          alt="CN Tower watercolor background"
          width="100%"
          height="100%"
          objectFit="contain"
          objectPosition="center"
          draggable="false"
        />
      </Box>

      {/* Subtle journal dots pattern */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        opacity="0.12"
        background="radial-gradient(circle, rgba(45, 41, 38, 0.5) 1.5px, transparent 1.5px)"
        backgroundSize="28px 28px"
      />

      {/* Very subtle journal lines effect */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        opacity="0.015"
        background="repeating-linear-gradient(
          transparent,
          transparent 28px,
          rgba(45, 41, 38, 0.08) 29px,
          rgba(45, 41, 38, 0.08) 30px
        )"
      />

      {/* Left margin line like a notebook */}
      <Box
        position="absolute"
        left={{ base: "20px", md: "60px", lg: "80px" }}
        top="0"
        width="1px"
        height="100%"
        bg="rgba(220, 38, 38, 0.04)"
        opacity="0.6"
      />
    </Box>
  )
} 