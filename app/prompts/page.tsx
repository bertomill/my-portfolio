'use client'

import * as React from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Card,
  CardBody,
  CardHeader,
  Badge,
  HStack,
  Code,
  Divider,
  useColorModeValue,
  Button,
  useToast,
} from '@chakra-ui/react'
import { CopyIcon, CheckIcon } from '@chakra-ui/icons'
import { useState } from 'react'

const PromptCard = ({ 
  title, 
  description, 
  tags, 
  prompt, 
  difficulty = "Intermediate" 
}: {
  title: string
  description: string
  tags: string[]
  prompt: string
  difficulty?: "Beginner" | "Intermediate" | "Advanced"
}) => {
  const [copied, setCopied] = useState(false)
  const toast = useToast()
  
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      toast({
        title: "Copied to clipboard!",
        status: "success",
        duration: 2000,
        isClosable: true,
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        status: "error",
        duration: 2000,
        isClosable: true,
      })
    }
  }
  
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Beginner": return "green"
      case "Advanced": return "red"
      default: return "blue"
    }
  }
  
  return (
    <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" mb={8}>
      <CardHeader pb={2}>
        <VStack align="start" spacing={3}>
          <HStack justify="space-between" w="full" flexWrap="wrap">
            <Heading size="lg">{title}</Heading>
            <Badge colorScheme={getDifficultyColor(difficulty)} size="sm">
              {difficulty}
            </Badge>
          </HStack>
          
          <Text color="gray.600" _dark={{ color: "gray.400" }}>
            {description}
          </Text>
          
          <HStack spacing={2} flexWrap="wrap">
            {tags.map((tag, index) => (
              <Badge key={index} variant="outline" colorScheme="gray">
                {tag}
              </Badge>
            ))}
          </HStack>
        </VStack>
      </CardHeader>
      
      <CardBody pt={0}>
        <VStack align="stretch" spacing={4}>
          <Divider />
          
          <HStack justify="space-between" align="center">
            <Text fontWeight="medium" color="gray.700" _dark={{ color: "gray.300" }}>
              Prompt:
            </Text>
            <Button
              size="sm"
              variant="outline"
              leftIcon={copied ? <CheckIcon /> : <CopyIcon />}
              onClick={handleCopy}
              colorScheme={copied ? "green" : "gray"}
            >
              {copied ? "Copied!" : "Copy"}
            </Button>
          </HStack>
          
          <Box
            bg="gray.50"
            _dark={{ bg: "gray.900", borderColor: "gray.700" }}
            p={4}
            borderRadius="md"
            border="1px solid"
            borderColor="gray.200"
          >
            <Text
              fontSize="sm"
              lineHeight="tall"
              fontFamily="mono"
              whiteSpace="pre-wrap"
              color="gray.800"
              _dark={{ color: "gray.200" }}
            >
              {prompt}
            </Text>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  )
}

export default function PromptsPage() {
  const draggableCardPrompt = `🚀 Prompt to Build This Draggable Developer Card:

"Create a draggable, interactive developer profile card component using React, Framer Motion, and Chakra UI with the following features:

1. **FlipCard Functionality**: A card that flips between a VS Code-style developer profile (with syntax-highlighted JavaScript code showing name, expertise, status) and a photo view
   - **Code View Styling**:
     • VS Code window header with macOS-style traffic light buttons (red, yellow, green circles)
     • File tab showing "portfolio.js - VS Code" 
     • Syntax highlighting: blue keywords, orange strings, green comments, white variables
     • Animated typing effect on the developer name with blinking cursor
     • Matrix-style falling characters background effect using binary and tech terms
   - **Photo View Design**:
     • Clean white/dark background with professional headshot
     • Name caption at bottom with proper typography
     • Smooth 3D flip animation with spring physics
     • Backface visibility hidden for clean transitions

2. **Draggable Desktop Experience**: 
   - Fixed positioning that allows free 2D dragging around the viewport
   - Smooth, organic movement with real-time position updates
   - Visual feedback (scaling, rotation) while dragging
   - Viewport constraints to prevent dragging off-screen
   - **Drag Implementation Details**:
     • Use Framer Motion's drag, onDragStart, onDrag, onDragEnd
     • Real-time position updates in onDrag using info.point coordinates
     • Transform positioning with calc() for precise center-based movement
     • dragMomentum={false} and dragElastic={0} for immediate response
   - **Constraint System**:
     • Dynamic viewport boundary calculation on window resize
     • Account for card dimensions in constraint calculations
     • Separate constraints for different screen sizes
   - **Visual Feedback**:
     • Scale to 1.05 and rotate 2 degrees while dragging
     • Cursor changes to 'grabbing' during drag
     • Hover scale effect (1.02) with subtle shadow

3. **Responsive Behavior**:
   - Desktop (lg+): Fully draggable with fixed positioning
   - Mobile: Static positioning within normal layout flow
   - Side-by-side layout on desktop, stacked on mobile
   - **Breakpoint Logic**:
     • Use Chakra UI's useBreakpointValue hook
     • Conditional drag enabling: drag={isDesktop}
     • Position switching: "fixed" vs "relative"
     • Z-index management: 1000 for desktop, 1 for mobile
   - **Layout Architecture**:
     • SimpleGrid with responsive columns: { base: 1, lg: 2 }
     • Desktop: justify content flex-end (left) and flex-start (right)
     • Mobile: center alignment with proper stacking order

4. **Interactive Features**:
   - Click/tap to flip between code and photo views
   - Hover effects with subtle scaling and glow
   - Gesture recognition (distinguish between flip gestures vs. drag movements)
   - **Gesture Detection Logic**:
     • Track total drag distance vs. flip threshold (50px)
     • Horizontal swipe detection for flip triggers
     • Movement threshold (20px) to distinguish between clicks and drags
     • isDragging state to prevent accidental flips during movement
   - **Animation States**:
     • whileHover, whileTap, whileDrag motion variants
     • Spring animations with custom stiffness and damping
     • Transition timing: 0.6s duration with spring physics

5. **Visual Design**:
   - VS Code window styling with colored header bar and window controls  
   - Syntax-highlighted code with proper JavaScript formatting
   - Glowing text effects and matrix-style background animations
   - Professional photo display on the back
   - **Code Syntax Details**:
     • Class declaration with constructor pattern
     • this.name, this.expertise, this.status properties
     • Console.log statement and variable instantiation
     • Proper indentation and JavaScript conventions
     • Color scheme: #569cd6 (keywords), #ce9178 (strings), #6a9955 (comments)
   - **Animation Effects**:
     • Text glow cycling between #4ecdc4 and #ff6b6b
     • Glitch effects on name using pseudo-elements with red/cyan offsets
     • Floating particle system with 6s infinite animations
     • Matrix rain with random character positioning and fall speeds
   - **Typography & Spacing**:
     • JetBrains Mono font for code authenticity
     • Responsive font sizes: { base: "1.2rem", sm: "1.4rem", md: "2rem" }
     • Letter spacing and line height optimization for readability

6. **State Management & Performance**:
   - Position state with x,y coordinates
   - Flip state boolean for card orientation
   - Dragging state for interaction feedback
   - Constraint state for viewport boundaries
   - **Optimization Techniques**:
     • useCallback for event handlers to prevent re-renders
     • Cleanup intervals and timeouts in useEffect
     • Efficient constraint recalculation on resize only
     • Conditional event listener attachment based on screen size

The component should feel like a desktop window that users can freely move around while maintaining flip functionality. Make it mobile-friendly by disabling drag on smaller screens."`

  return (
    <Box className="min-h-screen">
      <Container 
        maxW="container.xl" 
        pt={{ base: 32, sm: 36, md: 40, lg: 44 }}
        px={{ base: 4, sm: 6, md: 8 }}
      >
        <VStack spacing={8} align="stretch" maxW="4xl" mx="auto">
          {/* Header */}
          <VStack spacing={4} align="center" textAlign="center">
            <Heading size="2xl" bgGradient="linear(to-r, blue.400, purple.500)" bgClip="text">
              Component Prompts
            </Heading>
            <Text fontSize="lg" color="gray.600" _dark={{ color: "gray.400" }} maxW="2xl">
              Ready-to-use prompts for building interactive React components. Perfect for sharing with AI assistants or development teams.
            </Text>
          </VStack>
          
          {/* Prompts */}
          <PromptCard
            title="Draggable Developer Profile Card"
            description="An interactive, draggable flip card that showcases a developer profile with VS Code styling, syntax highlighting, and smooth animations. Features desktop dragging with mobile-responsive fallback."
            tags={["React", "Framer Motion", "Chakra UI", "TypeScript", "Animations", "Responsive"]}
            prompt={draggableCardPrompt}
            difficulty="Advanced"
          />
          
          {/* Placeholder for future prompts */}
          <Card bg="gray.50" _dark={{ bg: "gray.800", borderColor: "gray.600" }} borderStyle="dashed" borderWidth="2px" borderColor="gray.300">
            <CardBody>
              <VStack spacing={4} py={8}>
                <Text fontSize="lg" fontWeight="medium" color="gray.500" _dark={{ color: "gray.400" }}>
                  More prompts coming soon!
                </Text>
                <Text color="gray.400" _dark={{ color: "gray.500" }} textAlign="center">
                  I'll be adding more component prompts for complex UI patterns, animations, and interactive features.
                </Text>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Box>
  )
}