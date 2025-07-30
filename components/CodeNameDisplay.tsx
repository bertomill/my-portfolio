'use client';

import React, { useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';

// This component creates a cool code editor-style display of the name "BERTO MILL"
// It includes animated typing effects, glitch effects, and interactive animations
const CodeNameDisplay: React.FC = () => {
  // useRef allows us to directly access DOM elements for animations
  const matrixBgRef = useRef<HTMLDivElement>(null);
  const codeWrapperRef = useRef<HTMLDivElement>(null);
  const glitchNameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Matrix background effect - creates falling characters like in The Matrix movie
    const createMatrixRain = () => {
      const matrix = matrixBgRef.current;
      if (!matrix) return;
      
      // Characters to use in the matrix effect - includes binary digits and relevant tech terms
      const chars = '01BERTOMILLAITENSORFLOWPYTHONLLM';
      
      // Create 50 falling character elements
      for (let i = 0; i < 50; i++) {
        const span = document.createElement('span');
        span.textContent = chars[Math.floor(Math.random() * chars.length)];
        span.style.position = 'absolute';
        span.style.left = Math.random() * 100 + '%';
        span.style.animationDelay = Math.random() * 2 + 's';
        span.style.fontSize = Math.random() * 20 + 10 + 'px';
        span.style.color = '#0f4c3a';
        span.style.animation = 'matrixFall 4s linear infinite';
        matrix.appendChild(span);
      }
    };

    // Add CSS animation for matrix characters falling down the screen
    const style = document.createElement('style');
    style.textContent = `
      @keyframes matrixFall {
        0% { transform: translateY(-100px); opacity: 1; }
        100% { transform: translateY(100vh); opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    // Function to create floating particles for ambient animation
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.position = 'absolute';
      particle.style.background = '#4ecdc4';
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.width = Math.random() * 4 + 2 + 'px';
      particle.style.height = particle.style.width;
      particle.style.animation = 'float 6s infinite ease-in-out';
      particle.style.animationDelay = Math.random() * 6 + 's';
      document.body.appendChild(particle);
      
      // Remove particle after animation completes to prevent memory leaks
      setTimeout(() => {
        particle.remove();
      }, 6000);
    };

    // Initialize effects
    createMatrixRain();
    const particleInterval = setInterval(createParticle, 300);

    // Cleanup function to remove intervals when component unmounts
    return () => {
      clearInterval(particleInterval);
    };
  }, []);

  // Handle mouse interactions for enhanced user experience
  const handleMouseEnter = () => {
    if (codeWrapperRef.current && glitchNameRef.current) {
      // Scale up the component and add subtle glowing shadow on hover
      codeWrapperRef.current.style.transform = 'scale(1.01)';
      codeWrapperRef.current.style.boxShadow = '0 10px 20px rgba(76, 220, 196, 0.15)';
      // Speed up glitch animation slightly
      glitchNameRef.current.style.animationDuration = '2s';
    }
  };

  const handleMouseLeave = () => {
    if (codeWrapperRef.current && glitchNameRef.current) {
      // Return to normal state
      codeWrapperRef.current.style.transform = 'scale(1)';
      codeWrapperRef.current.style.boxShadow = 'none';
      // Return to normal glitch animation speed
      glitchNameRef.current.style.animationDuration = '4s';
    }
  };

  // Restart typing animation when clicked
  const handleNameClick = () => {
    if (glitchNameRef.current) {
      glitchNameRef.current.style.animation = 'none';
      setTimeout(() => {
        glitchNameRef.current!.style.animation = 'typing 2s steps(40, end), blink-caret 0.75s step-end infinite';
      }, 10);
    }
  };

  return (
    <Box position="relative" p={2} maxW={{ base: "200px", md: "300px" }} mx="auto">
      {/* Matrix background effect container */}
      <Box
        ref={matrixBgRef}
        position="absolute"
        top={0}
        left={0}
        w="full"
        h="full"
        pointerEvents="none"
        opacity={0.05}
        zIndex={0}
      />
      
      {/* Main component container */}
      <Box position="relative" textAlign="center">
        {/* Code editor window container */}
        <Box
          ref={codeWrapperRef}
          background="linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)"
          border="1px solid #333"
          borderRadius="8px"
          p={4}
          position="relative"
          overflow="hidden"
          transition="all 0.3s ease"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          css={{
            // VS Code window header with colorful top bar
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '20px',
              background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)',
              opacity: 0.6,
              borderRadius: '8px 8px 0 0',
            },
          }}
        >
          {/* Window control buttons (close, minimize, maximize) */}
          <Box
            position="absolute"
            top="6px"
            left="10px"
            zIndex={10}
            display="flex"
            gap="6px"
          >
            <Box w="8px" h="8px" borderRadius="50%" bg="#ff5f56" />
            <Box w="8px" h="8px" borderRadius="50%" bg="#ffbd2e" />
            <Box w="8px" h="8px" borderRadius="50%" bg="#27ca3f" />
          </Box>
          
          {/* File name in window header */}
          <Box
            color="#888"
            fontSize="0.6rem"
            mt="10px"
            mb="0.5rem"
            textAlign="left"
            fontFamily="var(--font-jetbrains)"
          >
            portfolio.js - VS Code
          </Box>
          
          {/* JavaScript code block with syntax highlighting */}
          <Box
            textAlign="left"
            fontSize="0.65rem"
            lineHeight="1.4"
            mb="1rem"
            fontFamily="var(--font-jetbrains)"
          >
            <Box><span style={{ color: '#6a9955' }}>// Initializing developer profile...</span></Box>
            <Box><span style={{ color: '#569cd6' }}>class</span> <span style={{ color: '#dcdcaa' }}>Developer</span> {`{`}</Box>
            <Box>&nbsp;&nbsp;<span style={{ color: '#dcdcaa' }}>constructor</span>() {`{`}</Box>
            <Box>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#569cd6' }}>this</span>.<span style={{ color: '#d4d4d4' }}>name</span> = <span style={{ color: '#ce9178' }}>'Berto Mill'</span>;</Box>
            <Box>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#569cd6' }}>this</span>.<span style={{ color: '#d4d4d4' }}>expertise</span> = <span style={{ color: '#ce9178' }}>'AI consulting & engineering'</span>;</Box>
            <Box>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#569cd6' }}>this</span>.<span style={{ color: '#d4d4d4' }}>status</span> = <span style={{ color: '#ce9178' }}>'transforming businesses with AI'</span>;</Box>
            <Box>&nbsp;&nbsp;{`}`}</Box>
            <Box>{`}`}</Box>
            <Box><br /></Box>
            <Box><span style={{ color: '#569cd6' }}>const</span> <span style={{ color: '#9cdcfe' }}>portfolio</span> = <span style={{ color: '#569cd6' }}>new</span> <span style={{ color: '#dcdcaa' }}>Developer</span>();</Box>
            <Box><span style={{ color: '#9cdcfe' }}>console</span>.<span style={{ color: '#dcdcaa' }}>log</span>(<span style={{ color: '#9cdcfe' }}>portfolio</span>.<span style={{ color: '#d4d4d4' }}>name</span>);</Box>
          </Box>
          
          {/* Main name display with glitch effects */}
          <Box my={4} position="relative">
            <Box
              ref={glitchNameRef}
              fontSize={{ base: '1.2rem', sm: '1.4rem', md: '2rem' }}
              fontWeight="700"
              color="white"
              textTransform="uppercase"
              letterSpacing={{ base: "0.05em", md: "0.1em" }}
              position="relative"
              display="inline-block"
              fontFamily="var(--font-jetbrains)"
              cursor="pointer"
              onClick={handleNameClick}
              css={{
                // Subtle glowing text animation that cycles between colors
                animation: 'textGlow 4s ease-in-out infinite alternate',
                // Glitch effects using pseudo-elements
                '&::before, &::after': {
                  content: '"BERTO MILL"',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                },
                '&::before': {
                  animation: 'glitch-1 0.5s infinite',
                  color: '#ff0000',
                  zIndex: -1,
                },
                '&::after': {
                  animation: 'glitch-2 0.5s infinite',
                  color: '#00ffff',
                  zIndex: -2,
                },
                // Define all the keyframe animations
                '@keyframes textGlow': {
                  '0%': { textShadow: '0 0 5px #4ecdc4, 0 0 10px #4ecdc4' },
                  '100%': { textShadow: '0 0 8px #ff6b6b, 0 0 15px #ff6b6b' },
                },
                '@keyframes glitch-1': {
                  '0%, 14%, 15%, 49%, 50%, 99%, 100%': { transform: 'translate(0)' },
                  '15%, 49%': { transform: 'translate(-2px, 2px)' },
                },
                '@keyframes glitch-2': {
                  '0%, 20%, 21%, 62%, 63%, 99%, 100%': { transform: 'translate(0)' },
                  '21%, 62%': { transform: 'translate(2px, -2px)' },
                },
                '@keyframes typing': {
                  'from': { width: '0' },
                  'to': { width: '100%' },
                },
                '@keyframes blink-caret': {
                  'from, to': { borderColor: 'transparent' },
                  '50%': { borderColor: '#4ecdc4' },
                },
                '@keyframes float': {
                  '0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: 0 },
                  '50%': { transform: 'translateY(-100px) rotate(180deg)', opacity: 1 },
                },
              }}
            >
              BERTO MILL
            </Box>
            
            {/* Subtitle that appears with a delay */}
            <Box
              color="#888"
              fontSize="0.7rem"
              mt={2}
              fontFamily="var(--font-jetbrains)"
              css={{
                animation: 'fadeInUp 1s ease-out 2s both',
                '@keyframes fadeInUp': {
                  'from': {
                    opacity: 0,
                    transform: 'translateY(20px)',
                  },
                  'to': {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                },
              }}
            >
              AI Consultant & Engineer
            </Box>
          </Box>
          
          {/* Interactive hint for user guidance */}
          <Box
            position="absolute"
            bottom="-25px"
            left="50%"
            transform="translateX(-50%)"
            color="#666"
            fontSize="0.5rem"
            fontFamily="var(--font-jetbrains)"
            css={{
              animation: 'pulse 3s infinite',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 0.3 },
                '50%': { opacity: 0.7 },
              },
            }}
          >
            hover to interact
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CodeNameDisplay; 