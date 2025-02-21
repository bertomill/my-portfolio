'use client'

import {
  Container,
  VStack,
  Heading,
  Text,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'

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

  return (
    <Container maxW="container.lg" pt={20} pb={20}>
      <VStack spacing={8} alignItems="start">
        <Heading as="h1" size="2xl">
          Blog
        </Heading>
        
        {isLoading ? (
          <Text>Loading posts...</Text>
        ) : (
          <VStack spacing={8} w="full">
            {posts.map((post, index) => (
              <Text key={index}>{post.title}</Text>
            ))}
          </VStack>
        )}
      </VStack>
    </Container>
  )
} 