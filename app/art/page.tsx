'use client'

import Image from 'next/image'
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  AspectRatio,
  VStack,
  useColorModeValue,
  LinkBox,
  LinkOverlay,
  Skeleton,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { ArtPiece } from '@/lib/schema'

export default function ArtGalleryPage() {
  const [artPieces, setArtPieces] = useState<ArtPiece[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArtPieces()
  }, [])

  const fetchArtPieces = async () => {
    try {
      const response = await fetch('/api/art')
      if (response.ok) {
        const data = await response.json()
        setArtPieces(data)
      }
    } catch (error) {
      console.error('Error fetching art pieces:', error)
    } finally {
      setLoading(false)
    }
  }
  // Consistent palette with homepage/cards
  const cardBg = useColorModeValue('white', 'gray.800')
  const cardBorder = useColorModeValue('rgba(147,145,152,0.30)', 'rgba(147,145,152,0.35)')
  const textMuted = useColorModeValue('gray.600', 'gray.400')

  return (
    <Box
      className="min-h-screen"
      bgGradient="linear(to-b, #9da7ae, #939198)"
    >
      <Container
        maxW="container.xl"
        pt={{ base: 20, md: 28, lg: 32 }}
        px={{ base: 4, md: 8 }}
      >
        {/* Page header */}
        <VStack align="start" spacing={2} mb={{ base: 6, md: 10 }}>
          <Heading size={{ base: 'lg', md: 'xl' }}>Art</Heading>
          <Text color={textMuted}>A small selection of pieces I’ve created.</Text>
        </VStack>

        {/* Responsive art grid */}
        {loading ? (
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={{ base: 4, md: 6 }}>
            {[...Array(6)].map((_, index) => (
              <Card key={index} bg={cardBg} borderColor={cardBorder} borderWidth="1px">
                <Skeleton>
                  <AspectRatio ratio={4/3}>
                    <Box />
                  </AspectRatio>
                </Skeleton>
                <CardBody>
                  <VStack align="start" spacing={2}>
                    <Skeleton height="20px" width="150px" />
                    <Skeleton height="16px" width="200px" />
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        ) : artPieces.length === 0 ? (
          <Alert status="info" borderRadius="md">
            <AlertIcon />
            No art pieces available yet. Check back soon!
          </Alert>
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={{ base: 4, md: 6 }}>
            {artPieces.map((piece) => (
              <LinkBox
                as={Card}
                key={piece.id}
                bg={cardBg}
                borderColor={cardBorder}
                borderWidth="1px"
                _hover={{ shadow: 'md', transform: 'translateY(-3px)' }}
                transition="all 0.25s"
              >
                {/* Image container keeps Next/Image happy while maintaining aspect ratio */}
                <AspectRatio ratio={4/3}>
                  <Box position="relative" borderTopRadius="md" overflow="hidden">
                    <Image src={piece.src} alt={piece.title} fill style={{ objectFit: 'cover' }} />
                  </Box>
                </AspectRatio>

                <CardBody>
                  <VStack align="start" spacing={1}>
                    <Heading as="h3" size="sm">
                      {piece.href ? (
                        <LinkOverlay href={piece.href} target="_blank" rel="noopener noreferrer">
                          {piece.title}
                        </LinkOverlay>
                      ) : (
                        piece.title
                      )}
                    </Heading>
                    {piece.description && (
                      <Text fontSize="sm" color={textMuted} noOfLines={2}>
                        {piece.description}
                      </Text>
                    )}
                  </VStack>
                </CardBody>
              </LinkBox>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  )
}


