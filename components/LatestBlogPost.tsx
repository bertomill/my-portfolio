'use client'

import {
  Box,
  Heading,
  Text,
  Link,
  Tag,
  HStack,
  VStack,
  useColorModeValue,
  Skeleton,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import type { BlogPost } from '@/lib/getBlogPosts'
import NextLink from 'next/link'

const MotionBox = motion(Box)
const MotionLinkBox = motion(LinkBox)

export default function LatestBlogPost() {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const hoverBg = useColorModeValue('rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.05)')
  const dateFontColor = useColorModeValue('gray.400', 'gray.400')

  useEffect(() => {
    async function fetchLatestPost() {
      try {
        const response = await fetch('/api/posts')
        const data = await response.json()
        if (data && data.length > 0) {
          setPost(data[0]) // Get the first (latest) post
        }
      } catch (error) {
        console.error('Error fetching latest post:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchLatestPost()
  }, [])

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return format(date, 'MMMM d, yyyy')
    } catch (error) {
      console.error('Error formatting date:', error)
      return dateString
    }
  }

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      w="full"
    >
      <Heading 
        as="h2" 
        size={{ base: "md", md: "lg" }} 
        mb={4}
        textAlign="center"
      >
        Latest Article
      </Heading>
      
      {isLoading ? (
        <Box 
          p={{ base: 4, md: 5 }} 
          borderRadius="xl" 
          bg={hoverBg}
        >
          <VStack align="stretch" spacing={3}>
            <Skeleton height="20px" width="100px" />
            <Skeleton height="24px" width="100%" />
            <Skeleton height="20px" width="200px" />
          </VStack>
        </Box>
      ) : post ? (
        <MotionLinkBox
          as="article"
          p={{ base: 4, md: 5 }}
          borderRadius="xl"
          position="relative"
          _hover={{
            bg: hoverBg,
            transform: 'translateY(-2px)',
          }}
          transition="all 0.2s"
          role="group"
          whileHover={{ scale: 1.01 }}
        >
          <Box
            position="absolute"
            inset={0}
            borderRadius="xl"
            opacity={0}
            bg="linear-gradient(45deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)"
            transition="opacity 0.2s"
            _groupHover={{ opacity: 1 }}
            pointerEvents="none"
          />

          <VStack align="stretch" spacing={{ base: 2, md: 3 }}>
            <Text 
              fontSize={{ base: "xs", md: "sm" }}
              color={dateFontColor}
              fontFamily="mono"
            >
              {formatDate(post.pubDate)}
            </Text>
            
            <Text
              fontSize={{ base: "md", md: "lg" }}
              fontWeight="semibold"
              color="white"
              _groupHover={{ 
                bgGradient: "linear(to-r, gray.100, white)",
                bgClip: "text"
              }}
              transition="all 0.2s"
            >
              {post.title}
            </Text>

            {post.categories?.length > 0 && (
              <HStack 
                spacing={2} 
                mt={1}
                flexWrap="wrap"
                gap={2}
              >
                {post.categories.slice(0, 2).map((category) => (
                  <Tag
                    key={category}
                    size="sm"
                    bg="whiteAlpha.200"
                    color="white"
                  >
                    {category}
                  </Tag>
                ))}
              </HStack>
            )}
            
            <Box 
              position="relative" 
              zIndex={2}
              mt={1}
            >
              <LinkOverlay
                as={NextLink}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                passHref
              >
                <Link
                  color="blue.500" 
                  fontWeight="medium"
                  _hover={{ textDecoration: 'underline' }}
                  display="flex"
                  alignItems="center"
                  fontSize={{ base: "sm", md: "md" }}
                >
                  Read Article <ExternalLinkIcon mx="2px" />
                </Link>
              </LinkOverlay>
            </Box>
          </VStack>
        </MotionLinkBox>
      ) : (
        <Box 
          p={{ base: 4, md: 5 }} 
          borderRadius="xl" 
          bg={hoverBg}
        >
          <Text>No blog posts found. Check back soon!</Text>
        </Box>
      )}
    </MotionBox>
  )
} 