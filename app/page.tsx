'use client'

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { format } from "date-fns"
import { ExternalLink, Play, ArrowRight } from "lucide-react"

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
  AspectRatio,
  Skeleton,
  LinkBox,
  LinkOverlay,
  Select,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from '@chakra-ui/react'
import NextLink from 'next/link'

import type { BlogPost } from "@/lib/getBlogPosts"
import type { Project } from "@/lib/schema"
import { analytics } from "@/lib/analytics"

const MotionDiv = motion.div
const MotionBox = motion(Box)

// Custom hook for floating paper effect
function useFloatingEffect(phase = 0, intensity = 1) {
  const { scrollY } = useScroll()
  
  // Create different movement patterns for each section
  // Using sine waves with different phases and frequencies for organic movement
  const x = useTransform(
    scrollY,
    (value) => {
      const baseMovement = Math.sin((value * 0.001) + phase) * intensity
      const secondaryMovement = Math.sin((value * 0.0015) + phase + 1) * (intensity * 0.6)
      return baseMovement + secondaryMovement
    }
  )
  
  const y = useTransform(
    scrollY,
    (value) => {
      const verticalFloat = Math.cos((value * 0.0008) + phase) * (intensity * 0.3)
      return verticalFloat
    }
  )
  
  return { x, y }
}

// Watercolor Divide component to separate sections
function WatercolorDivide() {
  return (
    <Box
      width="100%"
      height={{ base: "60px", md: "80px" }}
      my={{ base: 8, md: 12 }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="relative"
    >
      <Image
        src="/watercolor-divide.png"
        alt="Watercolor section divider"
        width={800}
        height={100}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center",
          opacity: 0.7,
          filter: "hue-rotate(10deg) saturate(0.8)"
        }}
      />
    </Box>
  )
}

// Project Card component
function ProjectCard(project: Project) {
  const { title, description, tags, projectUrl, date, imageSrc } = project
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  
  const handleProjectClick = () => {
    analytics.projectClick(title, projectUrl)
    analytics.externalLinkClick(projectUrl, `Project: ${title}`)
  }

  const handleProjectView = () => {
    analytics.projectView(title)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ width: "100%" }}
    >
      <Card 
        height="100%" 
        bg={cardBg}
        borderColor={borderColor}
        borderWidth="1px"
        _hover={{ 
          shadow: "md",
          transform: "translateY(-2px)"
        }}
        transition="all 0.3s"
        onMouseEnter={handleProjectView}
      >
        <CardBody p={4}>
          {/* Project Image (if available) */}
          {imageSrc && (
            <Box mb={4}>
              {projectUrl && projectUrl !== "#" ? (
                <Link 
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    handleProjectClick()
                  }}
                  style={{ display: "block", width: "100%" }}
                >
                  <AspectRatio ratio={16/9}>
                    <Box 
                      borderRadius="md" 
                      overflow="hidden"
                      bg="gray.100"
                      transition="all 0.3s"
                      _hover={{ opacity: 0.9 }}
                    >
                      <Image 
                        src={imageSrc} 
                        alt={`${title} screenshot`}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                  </AspectRatio>
                </Link>
              ) : (
                <AspectRatio ratio={16/9}>
                  <Box 
                    borderRadius="md" 
                    overflow="hidden"
                    bg="gray.100"
                    opacity={0.8}
                  >
                    <Image 
                      src={imageSrc} 
                      alt={`${title} screenshot`}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                </AspectRatio>
              )}
            </Box>
          )}
          
          <VStack align="start" spacing={3} width="100%">
            <Heading size="md" fontWeight="medium">
              {title}
            </Heading>
            <Text 
              fontSize="sm" 
              noOfLines={3} 
              color="gray.600"
              _dark={{ color: "gray.400" }}
            >
              {description}
            </Text>
            
            <HStack spacing={2} flexWrap="wrap">
              {tags.map((tag: string, index: number) => (
                <Tag
                  key={index}
                  size="sm"
                  colorScheme="gray"
                  variant="subtle"
                  fontSize="xs"
                  fontWeight="normal"
                >
                  {tag}
                </Tag>
              ))}
            </HStack>
            
            <HStack justify="space-between" width="100%" pt={2}>
              {projectUrl && projectUrl !== "#" ? (
                <Button
                  variant="ghost"
                  size="sm"
                  as={Link}
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    handleProjectClick()
                  }}
                  color="gray.600"
                  _hover={{ color: "blue.600" }}
                  fontSize="sm"
                  fontWeight="normal"
                  p={0}
                  h="auto"
                  rightIcon={<ExternalLink size={14} />}
                >
                  View Project
                </Button>
              ) : (
                <Text fontSize="sm" color="gray.500">
                  Coming Soon
                </Text>
              )}
              
              <Text fontSize="xs" color="gray.500">
                {date}
              </Text>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </motion.div>
  )
}

// Blog Post Card component
function BlogPostCard({ post }: { post: BlogPost }) {
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const dateColor = useColorModeValue('gray.600', 'gray.400')
  const titleColor = useColorModeValue('gray.900', 'white')

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return format(date, 'MMMM d, yyyy')
    } catch {
      console.error('Error formatting date')
      return dateString
    }
  }

  const handleBlogPostClick = () => {
    analytics.blogPostClick(post.title)
    analytics.externalLinkClick(post.link, `Blog Post: ${post.title}`)
  }
  
  return (
    <LinkBox 
      as={Card}
      height="100%"
      bg={cardBg}
      borderColor={borderColor}
      borderWidth="1px"
      _hover={{ 
        shadow: "md",
        transform: "translateY(-2px)"
      }}
      transition="all 0.3s"
    >
      {/* Blog Post Image */}
      {post.imageUrl && (
        <AspectRatio ratio={16/9}>
          <Box bg="gray.100" borderTopRadius="md">
            <Image 
              src={post.imageUrl}
              alt={post.title}
              fill
              style={{ objectFit: "cover" }}
            />
          </Box>
        </AspectRatio>
      )}
      
      <CardBody p={4}>
        <VStack align="start" spacing={2}>
          <Text 
            fontSize="xs" 
            color={dateColor}
            fontFamily="mono"
            fontWeight="medium"
          >
            {formatDate(post.pubDate)}
          </Text>
          
          <LinkOverlay
            as={NextLink}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleBlogPostClick}
          >
            <Heading
              as="h3"
              fontSize="md"
              fontWeight="medium"
              color={titleColor}
              noOfLines={2}
              _hover={{ color: "blue.600" }}
            >
              {post.title}
            </Heading>
          </LinkOverlay>

          {post.categories?.length > 0 && (
            <HStack spacing={2} pt={1} flexWrap="wrap">
              {post.categories.slice(0, 2).map((category) => (
                <Tag
                  key={category}
                  size="sm"
                  variant="outline"
                  fontSize="xs"
                >
                  {category}
                </Tag>
              ))}
            </HStack>
          )}
        </VStack>
      </CardBody>
    </LinkBox>
  )
}

// Blog Posts section component
function BlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts')
        const data = await response.json()
        setPosts(data.slice(0, 3)) // Get the latest 3 posts
      } catch {
        console.error('Error fetching blog posts')
        analytics.error('Failed to fetch blog posts', 'Homepage')
      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const handleViewAllArticlesClick = () => {
    analytics.navClick('Blog Page')
  }

  return (
    <Card bg={cardBg} borderColor={borderColor} borderWidth="1px">
      <CardHeader pb={2}>
        <Heading size={{ base: "md", md: "lg" }}>
          Blog Posts
        </Heading>
      </CardHeader>
      
      <CardBody pb={2}>
        {isLoading ? (
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 6 }}>
            {[...Array(3)].map((_, index) => (
              <Card key={index} bg={cardBg} borderColor={borderColor}>
                <AspectRatio ratio={16/9}>
                  <Skeleton borderTopRadius="md" />
                </AspectRatio>
                <CardBody p={4}>
                  <VStack align="stretch" spacing={3}>
                    <Skeleton height="16px" width="100px" />
                    <Skeleton height="20px" width="100%" />
                    <Skeleton height="20px" width="75%" />
                    <HStack spacing={2} pt={1}>
                      <Skeleton height="16px" width="60px" />
                      <Skeleton height="16px" width="60px" />
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        ) : posts.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 6 }}>
            {posts.map((post) => (
              <BlogPostCard key={post.guid} post={post} />
            ))}
          </SimpleGrid>
        ) : (
          <Box 
            bg="gray.50"
            _dark={{ bg: "gray.700" }}
            rounded="lg" 
            p={8} 
            textAlign="center"
          >
            <Text color="gray.600" _dark={{ color: "gray.400" }}>
              No blog posts found. Check back soon!
            </Text>
          </Box>
        )}
      </CardBody>
      
      <CardFooter justifyContent="center" pt={4}>
        <Button
          variant="outline"
          size="sm"
          as={Link}
          href="/blog"
          onClick={handleViewAllArticlesClick}
          rightIcon={<ArrowRight size={14} />}
        >
          View All Articles
        </Button>
      </CardFooter>
    </Card>
  )
}

// YouTube Video interface and component
interface YouTubeVideo {
  title: string;
  link: string;
  videoId: string;
  publishedDate: string;
  thumbnailUrl: string;
  channelTitle: string;
}

function YouTubeVideoCard({ video }: { video: YouTubeVideo }) {
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const dateColor = useColorModeValue('gray.600', 'gray.400')
  const titleColor = useColorModeValue('gray.900', 'white')

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return format(date, 'MMMM d, yyyy')
    } catch {
      console.error('Error formatting date')
      return dateString
    }
  }

  const getEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}`
  }

  const handleVideoClick = () => {
    analytics.videoClick(video.title)
    analytics.externalLinkClick(video.link, 'YouTube Video')
  }

  const handleVideoView = () => {
    analytics.videoView(video.title)
  }
  
  return (
    <LinkBox 
      as={Card}
      height="100%"
      bg={cardBg}
      borderColor={borderColor}
      borderWidth="1px"
      _hover={{ 
        shadow: "md",
        transform: "translateY(-2px)"
      }}
      transition="all 0.3s"
      onMouseEnter={handleVideoView}
    >
      <AspectRatio ratio={16/9}>
        <Box borderTopRadius="md" overflow="hidden">
          <iframe 
            src={getEmbedUrl(video.videoId)}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: "100%", height: "100%", border: 0 }}
          />
        </Box>
      </AspectRatio>
      
      <CardBody p={4}>
        <VStack align="start" spacing={2}>
          <Text 
            fontSize="xs" 
            color={dateColor}
            fontFamily="mono"
            fontWeight="medium"
          >
            {formatDate(video.publishedDate)}
          </Text>
          
          <LinkOverlay
            as={NextLink}
            href={video.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleVideoClick}
          >
            <Heading
              as="h3"
              fontSize="md"
              fontWeight="medium"
              color={titleColor}
              noOfLines={2}
              _hover={{ color: "blue.600" }}
            >
              {video.title}
            </Heading>
          </LinkOverlay>
        </VStack>
      </CardBody>
    </LinkBox>
  )
}

// YouTube Videos section component
function YouTubeVideos() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch('/api/youtube')
        const data = await response.json()
        setVideos(data.slice(0, 3)) // Get the latest 3 videos
      } catch {
        console.error('Error fetching YouTube videos')
        analytics.error('Failed to fetch YouTube videos', 'Homepage')
      } finally {
        setIsLoading(false)
      }
    }
    fetchVideos()
  }, [])

  const handleViewAllVideosClick = () => {
    analytics.socialClick('YouTube Channel')
    analytics.externalLinkClick('https://www.youtube.com/@Bertomill1', 'View All Videos Button')
  }

  return (
    <Card bg={cardBg} borderColor={borderColor} borderWidth="1px">
      <CardHeader pb={2}>
        <Heading size={{ base: "md", md: "lg" }}>
          Latest Videos
        </Heading>
      </CardHeader>
      
      <CardBody pb={2}>
        {isLoading ? (
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 6 }}>
            {[...Array(3)].map((_, index) => (
              <Card key={index} bg={cardBg} borderColor={borderColor}>
                <AspectRatio ratio={16/9}>
                  <Skeleton borderTopRadius="md" />
                </AspectRatio>
                <CardBody p={4}>
                  <VStack align="stretch" spacing={3}>
                    <Skeleton height="16px" width="100px" />
                    <Skeleton height="20px" width="100%" />
                    <Skeleton height="20px" width="75%" />
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        ) : videos.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 6 }}>
            {videos.map((video) => (
              <YouTubeVideoCard key={video.videoId} video={video} />
            ))}
          </SimpleGrid>
        ) : (
          <Box 
            bg="gray.50"
            _dark={{ bg: "gray.700" }}
            rounded="lg" 
            p={8} 
            textAlign="center"
          >
            <Text color="gray.600" _dark={{ color: "gray.400" }}>
              No videos found. Check back soon!
            </Text>
          </Box>
        )}
      </CardBody>
      
      <CardFooter justifyContent="center" pt={4}>
        <Button
          variant="outline"
          size="sm"
          as={Link}
          href="https://www.youtube.com/@BertoVMill"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleViewAllVideosClick}
          rightIcon={<ArrowRight size={14} />}
        >
          View All Videos
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function Home() {
  const [showVideo, setShowVideo] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [projectsLoading, setProjectsLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest')
  const videoRef = useRef<HTMLVideoElement>(null)

  // Color mode values for the main component
  const featuredCardBg = useColorModeValue('white', 'gray.800')
  const featuredBorderColor = useColorModeValue('gray.200', 'gray.700')
  const skeletonCardBg = useColorModeValue('gray.50', 'gray.700')

  // Function to parse date strings into comparable Date objects
  // This handles formats like "July 2025", "June 2, 2025", "December 2024", etc.
  const parseProjectDate = (dateString: string): Date => {
    try {
      // Handle formats like "June 2, 2025" (with day)
      if (dateString.includes(',')) {
        return new Date(dateString)
      }
      
      // Handle formats like "July 2025" (month and year only)
      const [month, year] = dateString.split(' ')
      if (month && year) {
        // Set to first day of the month for consistent comparison
        return new Date(`${month} 1, ${year}`)
      }
      
      // Fallback: try to parse as-is
      return new Date(dateString)
    } catch {
      // If parsing fails, return a very old date so it appears last
      console.warn(`Failed to parse date: ${dateString}`)
      return new Date('1900-01-01')
    }
  }

  // Function to sort projects by date
  const sortProjectsByDate = (projectsToSort: Project[], sortOrder: 'newest' | 'oldest'): Project[] => {
    return [...projectsToSort].sort((a, b) => {
      const dateA = parseProjectDate(a.date)
      const dateB = parseProjectDate(b.date)
      
      if (sortOrder === 'newest') {
        return dateB.getTime() - dateA.getTime() // Newest first
      } else {
        return dateA.getTime() - dateB.getTime() // Oldest first
      }
    })
  }

  // Get sorted projects
  const sortedProjects = sortProjectsByDate(projects, sortBy)

  // Fetch featured projects
  useEffect(() => {
    async function fetchFeaturedProjects() {
      try {
        setProjectsLoading(true)
        const response = await fetch('/api/projects?featured=true')
        if (response.ok) {
          const data = await response.json()
          setProjects(data)
        }
      } catch {
        console.error('Error fetching projects')
        analytics.error('Failed to fetch featured projects', 'Homepage')
      } finally {
        setProjectsLoading(false)
      }
    }

    fetchFeaturedProjects()
  }, [])

  // Track performance
  useEffect(() => {
    const loadTime = performance.now()
    analytics.pageLoadTime(loadTime)
  }, [])

  // Toggle between image and video
  const toggleMedia = () => {
    setShowVideo(prev => {
      const newState = !prev
      // Play video when switching to video mode
      if (newState && videoRef.current) {
        videoRef.current.currentTime = 0
        videoRef.current.play().catch(e => console.error("Video play failed:", e))
        analytics.videoClick('Hero AI Conference Video')
      }
      return newState
    })
  }

  // Handler for when video ends
  const handleVideoEnded = () => {
    setShowVideo(false)
  }

  const handleAboutMeClick = () => {
    analytics.navClick('About Page')
  }

  const handleProjectsClick = () => {
    analytics.navClick('Projects Page')
  }

  return (
    <Box w="full" display="flex" justifyContent="center" position="relative" zIndex={1}>
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
          {/* Hero Section */}
          <Box w="full">
            <HStack
              align="center"
              justify="center"
              w="full"
              spacing={{ base: 4, md: 8 }}
              flexDirection={{ base: "column", md: "row" }}
            >
              <VStack 
                flex="1" 
                align={{ base: "center", md: "flex-start" }}
                textAlign={{ base: "center", md: "left" }}
                spacing={6}
              >
                <MotionDiv
                  style={useFloatingEffect(Math.PI / 4, 1.2)}
                >
                  <Box
                    position="relative"
                    maxW={{ base: "140px", sm: "175px", md: "200px", lg: "225px" }}
                    overflow="hidden"
                  >
                    <Image
                      src="/Berto-Mill-Marker.png"
                      alt="Berto Mill"
                      width={225}
                      height={100}
                      style={{
                        objectFit: "cover",
                        filter: "contrast(1.1) saturate(0.9)",
                        mixBlendMode: "multiply",
                        opacity: 0.85,
                        transform: "scale(1.4)",
                        transformOrigin: "center center"
                      }}
                    />
                  </Box>
                </MotionDiv>

                <Text 
                  fontSize={{ base: "md", sm: "lg", md: "xl" }}
                  lineHeight="tall"
                  color="gray.600"
                  _dark={{ color: "gray.400" }}
                >
                  I am a technology consultant and ML application developer based in Toronto, passionate about crafting intuitive user experiences to
                  help people and businesses solve problems.
                </Text>
                
                <Button
                  size="lg"
                  variant="outline"
                  borderRadius="full"
                  px={8}
                  transition="all 0.3s"
                  _hover={{
                    transform: "translateY(-2px)",
                    shadow: "md"
                  }}
                  onClick={() => {
                    const element = document.getElementById('featured-work');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  See my work
                </Button>
              </VStack>
              
              <Box 
                flexShrink={0}
                w={{ base: "200px", md: "300px" }}
                position="relative"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box
                    position="relative"
                    borderRadius="xl"
                    overflow="hidden" 
                    shadow="lg"
                    w="full"
                    pb="110%"
                  >
                    <AnimatePresence mode="wait">
                      {showVideo ? (
                        <motion.div
                          key="video"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%"
                          }}
                        >
                          <video
                            ref={videoRef}
                            src="/ai_conf_video.mp4"
                            onEnded={handleVideoEnded}
                            autoPlay
                            muted
                            playsInline
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: "center"
                            }}
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="image"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%"
                          }}
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
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Box>
                </motion.div>
                <Button
                  size="sm"
                  variant="solid"
                  borderRadius="full"
                  position="absolute"
                  bottom="5"
                  right="5"
                  zIndex="1"
                  shadow="md"
                  bg={showVideo ? "blackAlpha.600" : "whiteAlpha.900"}
                  color={showVideo ? "white" : "black"}
                  _hover={{
                    bg: showVideo ? "blackAlpha.700" : "whiteAlpha.800",
                    transform: "scale(1.05)"
                  }}
                  _active={{
                    transform: "scale(0.95)"
                  }}
                  transition="all 0.2s"
                  onClick={toggleMedia}
                  leftIcon={showVideo ? undefined : <Play size={14} />}
                >
                  {showVideo ? "Return" : "AI Video"}
                </Button>
              </Box>
            </HStack>
          </Box>

          {/* Watercolor Divider */}
          <WatercolorDivide />

          {/* Featured Work Section */}
          <MotionBox
            id="featured-work"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            w="full"
            style={useFloatingEffect(0, 2)}
          >
            <Card bg={featuredCardBg} borderColor={featuredBorderColor} borderWidth="1px">
              <CardHeader pb={2}>
                <HStack 
                  w="full" 
                  justify="space-between" 
                  align="center"
                  flexWrap="wrap"
                  gap={4}
                >
                  <Heading 
                    size={{ base: "md", md: "lg" }}
                    flex="1"
                    minW="fit-content"
                  >
                    Featured AI applications
                  </Heading>
                  
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
                    width="auto"
                    minW="140px"
                    size="sm"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </Select>
                </HStack>
              </CardHeader>
              
              <CardBody>
                {projectsLoading ? (
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 6 }}>
                    {[...Array(3)].map((_, index) => (
                      <Card 
                        key={index}
                        bg={skeletonCardBg}
                      >
                        <CardBody p={4}>
                          <VStack align="stretch" spacing={4}>
                            <AspectRatio ratio={16/9}>
                              <Skeleton borderRadius="md" />
                            </AspectRatio>
                            <VStack align="stretch" spacing={3}>
                              <Skeleton height="20px" width="75%" />
                              <Skeleton height="16px" width="100%" />
                              <Skeleton height="16px" width="100%" />
                              <HStack spacing={2}>
                                <Skeleton height="16px" width="60px" />
                                <Skeleton height="16px" width="60px" />
                              </HStack>
                            </VStack>
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                  </SimpleGrid>
                ) : sortedProjects.length > 0 ? (
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 6 }}>
                    {sortedProjects.map((project, index) => (
                      <ProjectCard key={project.id || index} {...project} />
                    ))}
                  </SimpleGrid>
                ) : (
                  <Box 
                    bg="gray.50"
                    _dark={{ bg: "gray.700" }}
                    rounded="lg" 
                    p={8} 
                    textAlign="center"
                  >
                    <Text color="gray.600" _dark={{ color: "gray.400" }}>
                      No projects found. Check back soon!
                    </Text>
                  </Box>
                )}
              </CardBody>
            </Card>
          </MotionBox>

          {/* Watercolor Divider */}
          <WatercolorDivide />

          {/* Blog Posts Section */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            w="full"
            style={useFloatingEffect(Math.PI / 3, 1.8)}
          >
            <BlogPosts />
          </MotionBox>

          {/* Watercolor Divider */}
          <WatercolorDivide />

          {/* Latest Videos Section */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            w="full"
            style={useFloatingEffect(Math.PI / 2, 1.5)}
          >
            <YouTubeVideos />
          </MotionBox>

          {/* Watercolor Divider */}
          <WatercolorDivide />

          {/* Call to Action Buttons */}
          <HStack 
            spacing={{ base: 2, sm: 3, md: 4 }} 
            flexDirection={{ base: 'column', sm: 'row' }}
            w={{ base: 'full', sm: 'auto' }}
          >
            <Button
              as={Link}
              href="/about"
              variant="solid"
              size={{ base: "md", md: "lg" }}
              width={{ base: 'full', sm: 'auto' }}
              onClick={handleAboutMeClick}
            >
              More About Me
            </Button>
            <Button
              as={Link}
              href="/projects"
              variant="outline"
              size={{ base: "md", md: "lg" }}
              width={{ base: 'full', sm: 'auto' }}
              onClick={handleProjectsClick}
            >
              View Projects
            </Button>
          </HStack>
        </VStack>
      </Container>
    </Box>
  )
}
