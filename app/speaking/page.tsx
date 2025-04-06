'use client'

import {
  VStack,
  Heading,
  Box,
  Text,
  Image,
  HStack,
  Tag,
  Container,
  useColorModeValue,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Flex,
  Badge,
  Divider,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useState } from 'react'

const MotionBox = motion(Box)
const MotionHeading = motion(Heading)
const MotionText = motion(Text)

export default function Speaking() {
  const hoverBg = useColorModeValue('rgba(255, 255, 255, 0.07)', 'rgba(255, 255, 255, 0.07)')
  const bgGradient = useColorModeValue(
    'linear-gradient(to bottom, rgba(240, 240, 250, 0.03), rgba(240, 240, 250, 0))',
    'linear-gradient(to bottom, rgba(20, 20, 30, 0.1), rgba(20, 20, 30, 0))'
  )
  const accentColor = useColorModeValue('blue.500', 'blue.300')
  const borderColor = useColorModeValue('rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0.5)')
  const [selectedImage, setSelectedImage] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc)
    onOpen()
  }

  return (
    <Box 
      position="relative" 
      overflow="hidden" 
      pt={{ base: 16, md: 24 }}
      pb={{ base: 16, md: 32 }}
    >
      {/* Background elements */}
      <Box 
        position="absolute" 
        inset={0} 
        bgGradient={bgGradient}
        opacity={0.6}
        zIndex={-1}
      />
      <Box
        position="absolute"
        top="-30%"
        right="-10%"
        width="60%"
        height="60%"
        bg={`radial-gradient(circle, ${accentColor}15 0%, transparent 70%)`}
        zIndex={-1}
        filter="blur(80px)"
      />
      <Box
        position="absolute"
        bottom="-20%"
        left="-20%"
        width="50%"
        height="50%"
        bg={`radial-gradient(circle, ${accentColor}10 0%, transparent 70%)`}
        zIndex={-1}
        filter="blur(60px)"
      />

      <Container maxW="container.md" px={{ base: 4, md: 8 }}>
        <VStack 
          spacing={{ base: 10, md: 16 }} 
          alignItems="stretch"
        >
          <MotionHeading 
            as="h1" 
            size={{ base: "xl", md: "2xl" }}
            textAlign="center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            letterSpacing="tight"
            fontWeight="extrabold"
            bgGradient={`linear(to-r, ${accentColor}, purple.400)`}
            bgClip="text"
          >
            Speaking Engagements
          </MotionHeading>

          <MotionBox
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Box
              p={{ base: 5, md: 8 }}
              borderRadius="2xl"
              position="relative"
              _hover={{
                bg: hoverBg,
                transform: 'translateY(-4px)',
              }}
              transition="all 0.3s"
              borderWidth="1px"
              borderColor="transparent"
              bgGradient="linear(to-br, rgba(255,255,255,0.03), rgba(255,255,255,0.01))"
              boxShadow="xl"
              backdropFilter="blur(8px)"
            >
              {/* Decorative elements */}
              <Box
                position="absolute"
                top="-2px"
                left="10%"
                right="10%"
                height="2px"
                bgGradient={`linear(to-r, transparent, ${accentColor}, transparent)`}
              />

              <VStack spacing={8} align="start">
                <VStack align="start" spacing={4} w="full">
                  <Flex width="full" justifyContent="space-between" alignItems="flex-start">
                    <MotionHeading 
                      size={{ base: "lg", md: "xl" }}
                      bgGradient={`linear(to-r, ${accentColor}, blue.600)`}
                      bgClip="text"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      AI UI Designer Marble
                    </MotionHeading>
                    
                    <Badge 
                      px={3} 
                      py={1} 
                      colorScheme="blue" 
                      borderRadius="full" 
                      fontWeight="medium"
                      textTransform="none"
                      fontSize="sm"
                    >
                      Featured Talk
                    </Badge>
                  </Flex>

                  <MotionText
                    fontSize={{ base: "md", md: "lg" }}
                    lineHeight="tall"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    A deep dive into building context around website for AI to learn from and generate world class output.
                  </MotionText>

                  <Flex 
                    wrap="wrap" 
                    justify="space-between" 
                    align="center" 
                    width="full"
                    gap={4}
                  >
                    <Text fontSize="sm" color="gray.500" fontWeight="medium">
                      <Box as="span" fontWeight="bold" color={accentColor}>Shopify Builder Sundays</Box> • March 2025 • Toronto, ON
                    </Text>
                    
                    <HStack spacing={2} flexWrap="wrap" gap={2}>
                      <Tag size={{ base: "sm", md: "md" }} colorScheme="blue" variant="subtle">AI</Tag>
                      <Tag size={{ base: "sm", md: "md" }} colorScheme="teal" variant="subtle">UI Design</Tag>
                      <Tag size={{ base: "sm", md: "md" }} colorScheme="purple" variant="subtle">Web Development</Tag>
                    </HStack>
                  </Flex>

                  <Divider borderColor="gray.200" opacity={0.2} my={1} />

                  <Button 
                    as="a"
                    href="https://builder-sundays.myshopify.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    size="md"
                    colorScheme="blue"
                    fontWeight="medium"
                    rightIcon={<ExternalLinkIcon />}
                    _hover={{ transform: 'translateY(-2px)', boxShadow: 'sm' }}
                    transition="all 0.2s"
                    variant="ghost"
                  >
                    Event Details
                  </Button>
                </VStack>
                
                <Box 
                  position="relative" 
                  w="full" 
                  h={{ base: "340px", md: "420px" }}
                  cursor="pointer"
                  mt={4}
                >
                  <Box
                    position="absolute"
                    top="0"
                    right="0"
                    width="75%"
                    height="75%"
                    zIndex={2}
                    onClick={() => handleImageClick("/Berto_Shopify_Talk_03.30.2025.jpeg")}
                    transition="all 0.3s ease"
                    _hover={{ transform: 'scale(1.03)', zIndex: 3 }}
                    borderRadius="lg"
                    overflow="hidden"
                    boxShadow="2xl"
                    border={`3px solid ${borderColor}`}
                  >
                    <Image
                      src="/Berto_Shopify_Talk_03.30.2025.jpeg"
                      alt="Berto presenting at Shopify Builder Sundays"
                      objectFit="cover"
                      width="100%"
                      height="100%"
                    />
                    <Box
                      position="absolute"
                      inset={0}
                      bg="linear-gradient(to top, rgba(0,0,0,0.2), transparent 50%)"
                    />
                  </Box>
                  <Box
                    position="absolute"
                    bottom="0"
                    left="0"
                    width="75%"
                    height="75%"
                    zIndex={1}
                    onClick={() => handleImageClick("/Berto_Shopify_Talk_2_03.30.2025.jpeg")}
                    transition="all 0.3s ease"
                    _hover={{ transform: 'scale(1.03)', zIndex: 3 }}
                    borderRadius="lg"
                    overflow="hidden"
                    boxShadow="2xl"
                    border={`3px solid ${borderColor}`}
                  >
                    <Image
                      src="/Berto_Shopify_Talk_2_03.30.2025.jpeg"
                      alt="Shopify Builder Sundays venue with presentation screen"
                      objectFit="cover"
                      width="100%"
                      height="100%"
                    />
                    <Box
                      position="absolute"
                      inset={0}
                      bg="linear-gradient(to top, rgba(0,0,0,0.2), transparent 50%)"
                    />
                  </Box>
                </Box>
              </VStack>
            </Box>
          </MotionBox>

          <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
            <ModalOverlay backdropFilter="blur(10px)" />
            <ModalContent bg="transparent" boxShadow="2xl">
              <ModalCloseButton color="white" />
              <ModalBody p={0}>
                <Image
                  src={selectedImage}
                  alt="Expanded view"
                  w="100%"
                  h="auto"
                  borderRadius="lg"
                  objectFit="contain"
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </VStack>
      </Container>
    </Box>
  )
} 