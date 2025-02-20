'use client'

import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  Image,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Tag,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Parser from 'rss-parser'
import { format } from 'date-fns'

interface BlogPost {
  title: string
  link: string
  pubDate: string
  categories: string[]
  content: string
  thumbnail?: string
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const titleColor = useColorModeValue('gray.900', 'white')
  const textColor = useColorModeValue('gray.800', 'gray.100')

  useEffect(() => {
    fetch('/api/medium-feed')
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error fetching posts:', error)
        setIsLoading(false)
      })
  }, [])

  const extractThumbnail = (content: string): string | undefined => {
    const match = content.match(/<img[^>]+src="([^">]+)"/)
    return match ? match[1] : undefined
  }

  return (
    <Container maxW="container.lg" pt={20} pb={20}>
      <VStack spacing={8} alignItems="start">
        <Heading as="h1" size="2xl">
          Blog
        </Heading>
        
        {isLoading ? (
          <Text>Loading posts...</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
            {posts.map((post, index) => (
              <LinkBox 
                key={index}
                as="article"
                p={6}
                rounded="xl"
                bg={bgColor}
                borderWidth="1px"
                borderColor={borderColor}
                transition="all 0.2s"
                _hover={{
                  transform: 'translateY(-4px)',
                  shadow: 'lg',
                }}
              >
                {post.thumbnail && (
                  <Box mb={4} borderRadius="lg" overflow="hidden">
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      w="full"
                      h="200px"
                      objectFit="cover"
                    />
                  </Box>
                )}
                
                <VStack align="start" spacing={3}>
                  <LinkOverlay href={post.link} isExternal>
                    <Heading size="md" color={titleColor}>
                      {post.title}
                    </Heading>
                  </LinkOverlay>
                  
                  <Text fontSize="sm" color={textColor}>
                    {format(new Date(post.pubDate), 'MMMM d, yyyy')}
                  </Text>
                  
                  <HStack spacing={2}>
                    {post.categories.slice(0, 3).map((category, idx) => (
                      <Tag key={idx} size="sm" colorScheme="green">
                        {category}
                      </Tag>
                    ))}
                  </HStack>
                </VStack>
              </LinkBox>
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  )
} 