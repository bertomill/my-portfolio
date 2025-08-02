'use client'

import {
  VStack,
  Heading,
  Box,
  Text,
  HStack,
  useColorModeValue,
  Container,
  SimpleGrid,
  Card,
  CardBody,
  Badge,
  Skeleton,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { TracingBeam } from '@/components/ui/tracing-beam'
import { useEffect, useState } from 'react'

const MotionBox = motion(Box)

interface Book {
  id: string
  title: string
  author: string
  status: string
  rating: number | null
  category: string
  description: string
  dateRead: string | null
  notes: string
  recommendation: string
  createdTime: string | null
}

function BookCard({ book }: { book: Book }) {
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const titleColor = useColorModeValue('gray.900', 'white')
  const authorColor = useColorModeValue('gray.600', 'gray.400')

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': 
      case 'read': 
        return 'green'
      case 'reading': 
      case 'currently reading':
        return 'blue'
      case 'want to read':
      case 'to read':
      case 'wishlist':
        return 'orange'
      default: return 'gray'
    }
  }

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': 
      case 'read': 
        return 'Completed'
      case 'reading': 
      case 'currently reading':
        return 'Currently Reading'
      case 'want to read':
      case 'to read':
      case 'wishlist':
        return 'Want to Read'
      default: return status
    }
  }

  const renderStars = (rating: number | null) => {
    if (!rating) return null
    return (
      <HStack spacing={1}>
        {[...Array(5)].map((_, i) => (
          <Text key={i} color={i < rating ? 'yellow.400' : 'gray.300'}>
            ★
          </Text>
        ))}
      </HStack>
    )
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null
    try {
      const date = new Date(dateString)
      return date.getFullYear().toString()
    } catch {
      return dateString
    }
  }

  return (
    <Card
      bg={cardBg}
      borderColor={borderColor}
      borderWidth="1px"
      height="100%"
      _hover={{ 
        shadow: "lg",
        transform: "translateY(-4px)"
      }}
      transition="all 0.3s"
    >
      <CardBody p={4}>
        <VStack align="start" spacing={3} height="100%">
          {/* Book Info */}
          <VStack align="start" spacing={2} flex="1" width="100%">
            <Heading
              as="h3"
              fontSize="lg"
              fontWeight="semibold"
              color={titleColor}
              noOfLines={2}
              width="100%"
            >
              {book.title}
            </Heading>

            {/* Why I read this book */}
            {book.description && (
              <Box>
                <Text 
                  fontSize="sm" 
                  fontWeight="semibold"
                  color={titleColor}
                  mb={1}
                >
                  Why I read this book:
                </Text>
                <Text 
                  fontSize="sm" 
                  color={authorColor}
                  noOfLines={3}
                  lineHeight="tall"
                >
                  {book.description}
                </Text>
              </Box>
            )}

            {/* Good for someone who */}
            {book.recommendation && (
              <Box>
                <Text 
                  fontSize="sm" 
                  fontWeight="semibold"
                  color={titleColor}
                  mb={1}
                >
                  Good for someone who:
                </Text>
                <Text 
                  fontSize="sm" 
                  color={authorColor}
                  noOfLines={3}
                  lineHeight="tall"
                >
                  {book.recommendation}
                </Text>
              </Box>
            )}

            {/* Comments */}
            {book.notes && (
              <Box>
                <Text 
                  fontSize="sm" 
                  fontWeight="semibold"
                  color={titleColor}
                  mb={1}
                >
                  Comments:
                </Text>
                <Text 
                  fontSize="sm" 
                  color={authorColor}
                  noOfLines={3}
                  lineHeight="tall"
                >
                  {book.notes}
                </Text>
              </Box>
            )}

            {/* Created time */}
            <VStack spacing={2} width="100%" mt="auto">
              {book.createdTime && (
                <Text fontSize="xs" color={authorColor} fontFamily="mono">
                  Added {formatDate(book.createdTime)}
                </Text>
              )}
            </VStack>
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  )
}

export default function Books() {
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch('/api/books')
        const data = await response.json()
        setBooks(data)
      } catch (error) {
        console.error('Error fetching books:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchBooks()
  }, [])

  // Since your DB doesn't have status categories, we'll show all books as completed
  const completedBooks = books
  const currentlyReading: Book[] = []
  const wantToRead: Book[] = []

  return (
    <Container maxW="container.lg" px={{ base: 4, md: 8 }}>
      <TracingBeam>
        <VStack 
          spacing={8} 
          alignItems="stretch" 
          pt={{ base: 24, md: 48 }} 
          pb={{ base: 16, md: 20 }}
        >
          <Heading 
            as="h1" 
            size={{ base: "xl", md: "2xl" }}
            mb={{ base: 6, md: 8 }} 
            textAlign="center"
            color="black"
          >
            My Reading Journey
          </Heading>

          <Text 
            fontSize={{ base: "md", md: "lg" }}
            textAlign="center"
            color="gray.600"
            maxW="2xl"
            alignSelf="center"
            mb={8}
          >
            Books that have shaped my thinking and continue to inspire my work in AI and technology.
          </Text>

          {isLoading ? (
            // Loading skeletons
            <VStack align="stretch" spacing={8}>
              {['Currently Reading', 'Completed', 'Want to Read'].map((section, sectionIndex) => (
                <VStack key={section} align="stretch" spacing={4}>
                  <Skeleton height="32px" width="200px" />
                  <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
                    {[...Array(3)].map((_, index) => (
                      <Card key={index} height="200px">
                        <CardBody p={4}>
                          <VStack align="stretch" spacing={3}>
                            <Skeleton height="20px" width="100%" />
                            <Skeleton height="16px" width="80%" />
                            <Skeleton height="14px" width="100%" />
                            <Skeleton height="14px" width="60%" />
                            <Skeleton height="24px" width="100px" />
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                  </SimpleGrid>
                </VStack>
              ))}
            </VStack>
          ) : (
            <>
              {/* All Books */}
              {completedBooks.length > 0 ? (
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <VStack align="stretch" spacing={4}>
                    <Heading as="h2" size="lg" color="green.600">
                      Books I've Read ({completedBooks.length})
                    </Heading>
                    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
                      {completedBooks.map((book) => (
                        <BookCard key={book.id} book={book} />
                      ))}
                    </SimpleGrid>
                  </VStack>
                </MotionBox>
              ) : (
                <Box 
                  bg="gray.50"
                  _dark={{ bg: "gray.700" }}
                  rounded="lg" 
                  p={8} 
                  textAlign="center"
                >
                  <Text color="gray.600" _dark={{ color: "gray.400" }}>
                    No books found. Check back soon!
                  </Text>
                </Box>
              )}
            </>
          )}
        </VStack>
      </TracingBeam>
    </Container>
  )
}