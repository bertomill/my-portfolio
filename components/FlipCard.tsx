'use client';

import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { motion, PanInfo } from 'framer-motion';
import Image from 'next/image';
import CodeNameDisplay from './CodeNameDisplay';

// This component creates an interactive flip card that users can drag or click to flip
// between the code name display and the user's photo
const FlipCard: React.FC = () => {
  // State to track which side of the card is currently showing
  const [isFlipped, setIsFlipped] = useState(false);

  // Handle the flip action - this toggles between front and back
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Handle drag gestures to flip the card
  const handleDragEnd = (event: any, info: PanInfo) => {
    // If user drags more than 50 pixels horizontally, flip the card
    const threshold = 50;
    if (Math.abs(info.offset.x) > threshold) {
      handleFlip();
    }
  };

  return (
    <Box
      position="relative"
      w={{ base: "200px", md: "300px" }}
      h={{ base: "220px", md: "330px" }}
      mx="auto"
      style={{ perspective: '1000px' }} // 3D perspective for flip effect
    >
      {/* Flip card container with 3D transform */}
      <motion.div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          cursor: 'grab',
        }}
        animate={{ 
          rotateY: isFlipped ? 180 : 0 
        }}
        transition={{ 
          duration: 0.6, 
          type: 'spring',
          stiffness: 100,
          damping: 15
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        onTap={handleFlip}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Front side - Code Name Display */}
        <Box
          position="absolute"
          w="full"
          h="full"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
          }}
        >
          <Box
            w="full"
            h="full"
            bg="linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)"
            borderRadius="16px"
            border="1px solid #333"
            boxShadow="0 10px 30px rgba(0, 0, 0, 0.3)"
            overflow="hidden"
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {/* Scale down the CodeNameDisplay to fit nicely in the card */}
            <Box transform="scale(0.9)">
              <CodeNameDisplay />
            </Box>
            
            {/* Instruction hint */}
            <Box
              position="absolute"
              bottom="10px"
              left="50%"
              transform="translateX(-50%)"
              fontSize="0.5rem"
              color="#666"
              fontFamily="var(--font-jetbrains)"
              textAlign="center"
              opacity={0.7}
            >
              drag or click to flip
            </Box>
          </Box>
        </Box>

        {/* Back side - Photo */}
        <Box
          position="absolute"
          w="full"
          h="full"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <Box
            w="full"
            h="full"
            bg="white"
            _dark={{ bg: "gray.800" }}
            borderRadius="16px"
            border="1px solid #e2e8f0"
            _dark={{ borderColor: "gray.600" }}
            boxShadow="0 10px 30px rgba(0, 0, 0, 0.15)"
            overflow="hidden"
            position="relative"
          >
            {/* Photo container with proper aspect ratio */}
            <Box
              position="relative"
              w="full"
              h="85%"
              borderRadius="16px 16px 0 0"
              overflow="hidden"
            >
              <Image
                src="/headshot.png"
                alt="Berto Mill"
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center"
                }}
              />
            </Box>
            
            {/* Photo caption */}
            <Box
              position="absolute"
              bottom="0"
              left="0"
              right="0"
              h="15%"
              bg="white"
              _dark={{ bg: "gray.800" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="0 0 16px 16px"
            >
              <Text
                fontSize={{ base: "0.7rem", md: "0.8rem" }}
                fontWeight="600"
                color="gray.700"
                _dark={{ color: "gray.300" }}
                textAlign="center"
              >
                Berto Mill
              </Text>
            </Box>
            
            {/* Instruction hint for photo side */}
            <Box
              position="absolute"
              top="10px"
              right="10px"
              fontSize="0.5rem"
              color="gray.500"
              fontFamily="var(--font-jetbrains)"
              opacity={0.7}
            >
              drag or click to flip
            </Box>
          </Box>
        </Box>
      </motion.div>
      
      {/* Side indicator dots */}
      <Box
        position="absolute"
        bottom="-30px"
        left="50%"
        transform="translateX(-50%)"
        display="flex"
        gap="8px"
        alignItems="center"
      >
        <Box
          w="8px"
          h="8px"
          borderRadius="50%"
          bg={!isFlipped ? "#4ecdc4" : "gray.300"}
          transition="all 0.3s"
          cursor="pointer"
          onClick={() => setIsFlipped(false)}
        />
        <Box
          w="8px"
          h="8px"
          borderRadius="50%"
          bg={isFlipped ? "#4ecdc4" : "gray.300"}
          transition="all 0.3s"
          cursor="pointer"
          onClick={() => setIsFlipped(true)}
        />
      </Box>
    </Box>
  );
};

export default FlipCard; 