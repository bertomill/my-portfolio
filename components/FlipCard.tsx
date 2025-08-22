'use client';

import React, { useState, useEffect } from 'react';
import { Box, Text, useBreakpointValue } from '@chakra-ui/react';
import { motion, PanInfo } from 'framer-motion';
import Image from 'next/image';
import CodeNameDisplay from './CodeNameDisplay';

// This component creates an interactive flip card that users can drag or click to flip
// between the code name display and the user's photo
const FlipCard: React.FC = () => {
  // State to track which side of the card is currently showing
  const [isFlipped, setIsFlipped] = useState(false);
  // State to track card position for free dragging - start on left side for side-by-side layout
  const [position, setPosition] = useState({ x: -200, y: -180 });
  // State to track if user is currently dragging to move (vs dragging to flip)
  const [isDragging, setIsDragging] = useState(false);
  // State to track if card has ever been dragged (detached from page flow)
  const [hasBeenDragged, setHasBeenDragged] = useState(false);
  // State to track viewport dimensions for constraining movement
  const [constraints, setConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 });
  
  // Use responsive positioning - fixed only on desktop
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  // Update constraints when viewport changes
  useEffect(() => {
    const updateConstraints = () => {
      const cardWidth = window.innerWidth < 640 ? 360 : window.innerWidth < 768 ? 380 : 420;
      const cardHeight = window.innerWidth < 640 ? 300 : window.innerWidth < 768 ? 340 : 350;
      
      setConstraints({
        left: -(window.innerWidth / 2 - cardWidth / 2),
        right: window.innerWidth / 2 - cardWidth / 2,
        top: -(window.innerHeight / 2 - cardHeight / 2),
        bottom: window.innerHeight / 2 - cardHeight / 2
      });
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, []);

  // Handle the flip action - this toggles between front and back
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Handle drag gestures - distinguish between flipping and moving
  const handleDragEnd = (_: any, info: PanInfo) => {
    setIsDragging(false);
    
    // Calculate total drag distance to determine if this was a meaningful drag
    const totalDistance = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2);
    const flipThreshold = 50;
    const moveThreshold = 20;
    
    // If drag distance is small and primarily horizontal, treat as flip gesture
    if (totalDistance < moveThreshold && Math.abs(info.offset.x) > flipThreshold) {
      handleFlip();
    }
    
    // Note: hasBeenDragged is set in handleDragStart when first drag begins
  };

  // Handle drag start to set dragging state
  const handleDragStart = () => {
    setIsDragging(true);
    
    // If this is the first drag, capture current position and transition to fixed positioning
    if (!hasBeenDragged && isDesktop) {
      const element = document.querySelector('[data-flip-card]') as HTMLElement;
      if (element) {
        const rect = element.getBoundingClientRect();
        const newPosition = {
          x: rect.left + rect.width / 2 - window.innerWidth / 2,
          y: rect.top + rect.height / 2 - window.innerHeight / 2
        };
        setPosition(newPosition);
        setHasBeenDragged(true);
      }
    }
  };

  // Determine positioning based on desktop status and drag state
  const shouldBeFixed = isDesktop && hasBeenDragged;
  
  return (
    <Box
      data-flip-card
      position={shouldBeFixed ? "fixed" : "relative"}
      w={{ base: "360px", sm: "380px", md: "420px" }}
      h={{ base: "300px", sm: "340px", md: "350px" }}
      left={shouldBeFixed ? "50%" : "auto"}
      top={shouldBeFixed ? "50%" : "auto"}
      transform={shouldBeFixed ? `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))` : "none"}
      mx={!shouldBeFixed ? "auto" : "unset"}
      style={{ 
        perspective: '1000px', 
        zIndex: shouldBeFixed ? 1000 : 1,
        transition: shouldBeFixed ? 'none' : 'all 0.3s ease'
      }} // 3D perspective for flip effect
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
        drag={isDesktop}
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={shouldBeFixed ? constraints : undefined}
        onDragStart={isDesktop ? handleDragStart : undefined}
        onDrag={isDesktop ? (_, info) => {
          // Only update position if card has been dragged before (is detached)
          if (hasBeenDragged) {
            setPosition({
              x: info.point.x - window.innerWidth / 2,
              y: info.point.y - window.innerHeight / 2
            });
          }
        } : undefined}
        onDragEnd={isDesktop ? handleDragEnd : undefined}
        onTap={!isDragging ? handleFlip : undefined}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        whileDrag={{ scale: 1.05, rotate: 2, cursor: 'grabbing' }}
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
            bg="transparent"
            overflow="hidden"
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {/* Scale the CodeNameDisplay to fit nicely in the card at different screen sizes */}
            <Box transform={{ base: "scale(0.9)", sm: "scale(0.95)", md: "scale(1.0)" }}>
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
            _dark={{ bg: "gray.800", borderColor: "gray.600" }}
            borderRadius="16px"
            border="1px solid #e2e8f0"
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
                Robert Mill
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
      

    </Box>
  );
};

export default FlipCard; 