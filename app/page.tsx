'use client'

import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  useColorModeValue,
  HStack,
  Tag,
  Image,
  Link as ChakraLink,
  AspectRatio,
  Skeleton,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react'
import Link from 'next/link'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import NewsletterSubscribe from '@/components/NewsletterSubscribe'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import type { BlogPost } from '@/lib/getBlogPosts'

const MotionBox = motion(Box)

// Project Card interface
interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  logoSrc: string;
  logoAlt: string;
  projectUrl: string;
}

// Project Card component
function ProjectCard({ title, description, tags, logoSrc, logoAlt, projectUrl }: ProjectCardProps) {
  const hoverBg = useColorModeValue('rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.05)')
  const tagBg = useColorModeValue('gray.200', 'whiteAlpha.200')
  const tagColor = useColorModeValue('black', 'white')
  
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      w="full"
    >
      <Box
        as="article"
        p={4}
        borderRadius="xl"
        position="relative"
        _hover={{
          bg: hoverBg,
          transform: 'translateY(-2px)',
        }}
        transition="all 0.2s"
        height="100%"
      >
        <HStack spacing={4} align="start">
          <Image 
            src={logoSrc} 
            alt={logoAlt} 
            boxSize={{ base: "60px", md: "70px" }}
            objectFit="cover"
            borderRadius="md"
          />
          <VStack align="start" spacing={2}>
            <Heading size="sm" color="black">{title}</Heading>
            <Text fontSize="sm" noOfLines={2} color="gray.800" fontWeight="medium">
              {description}
            </Text>
            <HStack spacing={2} flexWrap="wrap" gap={1}>
              {tags.map((tag: string, index: number) => (
                <Tag 
                  size="sm" 
                  key={index} 
                  bg={tagBg} 
                  color={tagColor}
                  fontWeight="medium"
                  borderRadius="full"
                >
                  {tag}
                </Tag>
              ))}
            </HStack>
            <Box mt={1}>
              <NextLink href={projectUrl} passHref target="_blank" rel="noopener noreferrer">
                <ChakraLink
                  color="blue.600" 
                  fontWeight="medium"
                  fontSize="sm"
                  display="flex"
                  alignItems="center"
                >
                  View Project <ExternalLinkIcon mx="2px" />
                </ChakraLink>
              </NextLink>
            </Box>
          </VStack>
        </HStack>
      </Box>
    </MotionBox>
  )
}

// Blog Post Card component
function BlogPostCard({ post }: { post: BlogPost }) {
  const hoverBg = useColorModeValue('white', 'rgba(255, 255, 255, 0.05)')
  const bgColor = useColorModeValue('gray.50', 'transparent')
  const borderColor = useColorModeValue('gray.200', 'transparent')
  const dateFontColor = useColorModeValue('black', 'gray.400')
  const titleColor = useColorModeValue('black', 'white')
  const blogTagBg = useColorModeValue('gray.200', 'whiteAlpha.200')
  const blogTagColor = useColorModeValue('black', 'white')

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
    <LinkBox 
      as={Box}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="xl"
      overflow="hidden"
      bg={bgColor}
      height="100%"
      boxShadow="sm"
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: 'md',
        bg: hoverBg
      }}
      transition="all 0.2s"
    >
      <Box p={4}>
        <VStack align="start" spacing={2}>
          <Text 
            fontSize={{ base: "xs", md: "sm" }}
            color={dateFontColor}
            fontWeight="medium"
            fontFamily="mono"
          >
            {formatDate(post.pubDate)}
          </Text>
          
          <Heading
            as="h3"
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="semibold"
            color={titleColor}
            noOfLines={2}
            _groupHover={{ color: "blue.600" }}
          >
            <LinkOverlay
              as={NextLink}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              isExternal
            >
              {post.title}
            </LinkOverlay>
          </Heading>

          {post.categories?.length > 0 && (
            <HStack spacing={2} mt={1} flexWrap="wrap" gap={2}>
              {post.categories.slice(0, 2).map((category) => (
                <Tag
                  key={category}
                  size="sm"
                  bg={blogTagBg}
                  color={blogTagColor}
                  fontWeight="medium"
                  borderRadius="full"
                >
                  {category}
                </Tag>
              ))}
            </HStack>
          )}
        </VStack>
      </Box>
    </LinkBox>
  )
}

// Blog Posts section component
function BlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const sectionBg = useColorModeValue('white', 'rgba(255, 255, 255, 0.03)')
  const borderColor = useColorModeValue('gray.200', 'transparent')

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts')
        const data = await response.json()
        setPosts(data.slice(0, 3)) // Get the latest 3 posts
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return (
    <Box 
      w="full" 
      p={{ base: 5, md: 6 }}
      borderRadius="xl"
      bg={sectionBg}
      borderWidth="1px"
      borderColor={borderColor}
      boxShadow="sm"
    >
      <VStack spacing={6}>
        <Heading 
          as="h2" 
          size={{ base: "md", md: "lg" }}
          mb={{ base: 1, md: 2 }}
          color="black"
        >
          Blog Posts
        </Heading>
        
        {isLoading ? (
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 6 }} w="full">
            {[...Array(3)].map((_, index) => (
              <Box 
                key={index}
                p={4} 
                borderRadius="xl" 
                bg="gray.50"
                boxShadow="sm"
                borderWidth="1px"
                borderColor="gray.200"
              >
                <VStack align="stretch" spacing={3}>
                  <Skeleton height="20px" width="100px" />
                  <Skeleton height="24px" width="100%" />
                  <Skeleton height="20px" width="200px" />
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        ) : posts.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 6 }} w="full">
            {posts.map((post) => (
              <BlogPostCard key={post.guid} post={post} />
            ))}
          </SimpleGrid>
        ) : (
          <Box 
            p={4} 
            borderRadius="xl" 
            bg="gray.50"
            width="full"
            textAlign="center"
          >
            <Text color="black" fontWeight="medium">No blog posts found. Check back soon!</Text>
          </Box>
        )}
        
        <Box alignSelf="center">
          <Button
            as={Link}
            href="/blog"
            variant="outline"
            size={{ base: "md", md: "md" }}
            rightIcon={<ExternalLinkIcon />}
          >
            View All Articles
          </Button>
        </Box>
      </VStack>
    </Box>
  )
}

export default function Home() {
  const sectionBg = useColorModeValue('rgba(255, 255, 255, 0.03)', 'rgba(255, 255, 255, 0.03)')
  const lightSectionBg = useColorModeValue('gray.50', 'rgba(255, 255, 255, 0.03)')

  // Projects data
  const projects: ProjectCardProps[] = [
    {
      title: "Letter Forge",
      description: "Streamline your newsletter creation process with AI assistance.",
      tags: ["Newsletter", "AI"],
      logoSrc: "/letter-forge-logo.svg",
      logoAlt: "Letter Forge Logo",
      projectUrl: "https://letterpipe.vercel.app/"
    },
    {
      title: "Marble",
      description: "A modern development platform for building better applications faster.",
      tags: ["Development", "Platform"],
      logoSrc: "/marble-logo.svg",
      logoAlt: "Marble Logo",
      projectUrl: "https://www.marble.dev/"
    },
    {
      title: "MarketStep",
      description: "A comprehensive platform for digital marketing analytics and strategy.",
      tags: ["Marketing", "Analytics"],
      logoSrc: "/marketstep-logo.svg",
      logoAlt: "MarketStep Logo",
      projectUrl: "https://marketstep.vercel.app/"
    }
  ]

  return (
    <Box w="full" display="flex" justifyContent="center">
      <Container 
        maxW="container.xl" 
        pt={{ base: 20, sm: 24, md: 28, lg: 32 }}
        px={{ base: 4, sm: 6, md: 8 }}
        centerContent
      >
        <VStack 
          spacing={{ base: 6, sm: 8, md: 10, lg: 12 }} 
          alignItems="center" 
          textAlign="center"
          w="full"
          maxW="container.lg"
        >
          <Box 
            position="relative" 
            width="full" 
            display="flex" 
            flexDirection="column" 
            alignItems="center"
          >
            {/* Hero Section with Image */}
            <Box
              display="flex"
              flexDirection={{ base: "column", md: "row" }}
              alignItems="center"
              justifyContent="center"
              w="full"
              mb={{ base: 6, md: 10 }}
              gap={{ base: 4, md: 8 }}
            >
              <VStack 
                flex="1" 
                alignItems={{ base: "center", md: "flex-start" }}
                textAlign={{ base: "center", md: "left" }}
              >
                <Heading 
                  as="h1" 
                  size={{ base: "lg", sm: "xl", md: "2xl" }}
                  mb={{ base: 2, sm: 3 }}
                >
                  Hi, I&apos;m Robert 👋
                </Heading>

                <Text 
                  fontSize={{ base: "md", sm: "lg", md: "xl" }}
                  lineHeight={{ base: "tall", md: "taller" }}
                  color="black"
                  fontWeight="medium"
                >
                  I am a technology consultant and ML application developer based in Toronto, passionate about crafting intuitive user experiences to
                  help people and businesses solve problems.
                </Text>
              </VStack>
              
              <Box 
                flex="1"
                maxW={{ base: "200px", md: "300px" }}
                minW={{ base: "200px", md: "300px" }}
              >
                <MotionBox
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box
                    position="relative"
                    borderRadius="xl"
                    overflow="hidden" 
                    boxShadow="lg"
                    width="100%"
                    paddingBottom="110%"
                  >
                    <Image
                      src="/headshot.png"
                      alt="Robert Mill"
                      position="absolute"
                      top="-15%"
                      left="0"
                      width="100%"
                      height="130%"
                      objectFit="cover"
                      objectPosition="center top"
                    />
                  </Box>
                </MotionBox>
              </Box>
            </Box>

            {/* Featured Work Section */}
            <Box 
              w="full" 
              mt={{ base: 8, md: 12 }}
              p={{ base: 5, md: 6 }}
              borderRadius="xl"
              bg={sectionBg}
            >
              <VStack spacing={6}>
                <Heading 
                  as="h2" 
                  size={{ base: "md", md: "lg" }}
                  mb={{ base: 1, md: 2 }}
                >
                  Featured Projects
                </Heading>
                
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 6 }} w="full">
                  {projects.map((project, index) => (
                    <Box key={index}>
                      <ProjectCard {...project} />
                    </Box>
                  ))}
                </SimpleGrid>
              </VStack>
            </Box>

            {/* Blog Posts Section */}
            <Box 
              w="full" 
              mt={{ base: 8, md: 12 }}
            >
              <BlogPosts />
            </Box>

            {/* Media Section */}
            <Box 
              w="full" 
              mt={{ base: 8, md: 12 }}
              p={{ base: 5, md: 6 }}
              borderRadius="xl"
              bg={lightSectionBg}
              boxShadow="sm"
            >
              <VStack spacing={6}>
                <Heading 
                  as="h2" 
                  size={{ base: "md", md: "lg" }}
                  mb={{ base: 1, md: 2 }}
                  color="black"
                >
                  Featured Media
                </Heading>
                
                <Box w="full" maxW="container.md" mx="auto">
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AspectRatio ratio={16/9} w="full" borderRadius="xl" overflow="hidden" boxShadow="md">
                      <iframe 
                        src="https://www.youtube.com/embed/VPN4P6zAquo?start=40" 
                        title="Featured YouTube video" 
                        allowFullScreen
                        style={{ borderRadius: '0.75rem' }}
                      />
                    </AspectRatio>
                    <Text mt={3} fontSize="sm" textAlign="left" color="black" fontWeight="medium">
                      My latest tech presentation discussing innovative approaches to app development
                    </Text>
                  </MotionBox>
                </Box>
              </VStack>
            </Box>

            {/* Education Section */}
            <Box 
              w="full" 
              mt={{ base: 8, md: 12 }}
              p={{ base: 5, md: 6 }}
              borderRadius="xl"
              bg={lightSectionBg}
              boxShadow="sm"
            >
              <VStack spacing={6}>
                <Heading 
                  as="h2" 
                  size={{ base: "md", md: "lg" }}
                  mb={{ base: 1, md: 2 }}
                  color="black"
                >
                  Education
                </Heading>
                
                <Box w="full">
                  <VStack spacing={4} align="stretch">
                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      w="full"
                    >
                      <Box
                        p={4}
                        borderRadius="lg"
                        bg="white"
                        borderWidth="1px"
                        borderColor="gray.200"
                        boxShadow="sm"
                      >
                        <VStack align="stretch" spacing={1}>
                          <Text fontSize="lg" fontWeight="bold" color="black">
                            Ivey Business School
                          </Text>
                          <Text fontSize="md" fontWeight="medium" color="black">
                            Masters of Science, Digital Management (MSc)
                          </Text>
                          <Text fontSize="sm" color="black" fontFamily="mono">
                            2022 - 2023
                          </Text>
                        </VStack>
                      </Box>
                    </MotionBox>

                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      w="full"
                    >
                      <Box
                        p={4}
                        borderRadius="lg"
                        bg="white"
                        borderWidth="1px"
                        borderColor="gray.200"
                        boxShadow="sm"
                      >
                        <VStack align="stretch" spacing={1}>
                          <Text fontSize="lg" fontWeight="bold" color="black">
                            Ivey Business School
                          </Text>
                          <Text fontSize="md" fontWeight="medium" color="black">
                            Graduate Diploma in Business and Sustainability (GDip)
                          </Text>
                          <Text fontSize="sm" color="black" fontFamily="mono">
                            2023
                          </Text>
                        </VStack>
                      </Box>
                    </MotionBox>

                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      w="full"
                    >
                      <Box
                        p={4}
                        borderRadius="lg"
                        bg="white"
                        borderWidth="1px"
                        borderColor="gray.200"
                        boxShadow="sm"
                      >
                        <VStack align="stretch" spacing={1}>
                          <Text fontSize="lg" fontWeight="bold" color="black">
                            Western University
                          </Text>
                          <Text fontSize="md" fontWeight="medium" color="black">
                            Bachelors of Arts, Management and Legal Studies (BA)
                          </Text>
                          <Text fontSize="sm" color="black" fontFamily="mono">
                            2017 - 2021
                          </Text>
                        </VStack>
                      </Box>
                    </MotionBox>
                  </VStack>
                </Box>
              </VStack>
            </Box>

            <Box 
              display="flex" 
              flexDirection={{ base: 'column', sm: 'row' }}
              gap={{ base: 2, sm: 3, md: 4 }} 
              mt={{ base: 8, sm: 10, md: 12 }}
              width={{ base: 'full', sm: 'auto' }}
            >
              <Button
                as={Link}
                href="/about"
                variant="solid"
                size={{ base: "md", md: "lg" }}
                width={{ base: 'full', sm: 'auto' }}
              >
                More About Me
              </Button>
              <Button
                as={Link}
                href="/projects"
                variant="outline"
                size={{ base: "md", md: "lg" }}
                width={{ base: 'full', sm: 'auto' }}
              >
                View Projects
              </Button>
            </Box>
          </Box>

          {/* Newsletter Component */}
          <Box w="full" maxW="container.md" px={{ base: 0, sm: 4 }}>
            <NewsletterSubscribe />
          </Box>

        </VStack>
      </Container>
    </Box>
  )
}
