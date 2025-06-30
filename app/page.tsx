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
  Flex,
} from '@chakra-ui/react'
import Link from 'next/link'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import GeometricBackground from '@/components/GeometricBackground'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { format } from 'date-fns'
import type { BlogPost } from '@/lib/getBlogPosts'
import { Project } from '@/lib/schema'

const MotionBox = motion(Box)

// Project Card component - now with architectural styling
function ProjectCard(project: Project) {
  const { title, description, tags, projectUrl, date, imageSrc } = project
  
  return (
    <MotionBox
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      w="full"
      className="world-class-card project-card-enhanced"
    >
      <Box
        as="article"
        p={6}
        borderRadius="6px"
        position="relative"
        transition="all 0.6s cubic-bezier(0.23, 1, 0.320, 1)"
        height="100%"
        className="glass-effect"
      >
        <VStack align="start" spacing={4}>
          {/* Project Image (if available) */}
          {imageSrc && (
            <NextLink href={projectUrl} passHref target="_blank" rel="noopener noreferrer">
              <Box 
                width="100%" 
                borderRadius="4px" 
                overflow="hidden" 
                mb={3}
                position="relative"
                transition="all 0.4s cubic-bezier(0.23, 1, 0.320, 1)"
                _hover={{
                  transform: 'scale(1.02)',
                  boxShadow: '0 12px 30px rgba(45, 41, 38, 0.1)'
                }}
                className="subtle-glow"
                border="1px solid rgba(212, 197, 169, 0.2)"
              >
                <Image 
                  src={imageSrc} 
                  alt={`${title} screenshot`} 
                  width="100%"
                  height="auto"
                  objectFit="cover"
                />
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  bg="linear-gradient(135deg, rgba(232, 220, 192, 0.1), rgba(212, 197, 169, 0.05))"
                  opacity="0"
                  transition="opacity 0.3s"
                  _groupHover={{ opacity: 1 }}
                  borderRadius="4px"
                />
              </Box>
            </NextLink>
          )}
          
          <VStack align="start" spacing={3} width="100%">
            <Heading 
              size="md" 
              className="architectural-heading"
              fontWeight="300"
              color="var(--charcoal)"
              letterSpacing="-0.02em"
            >
              {title}
            </Heading>
            <Text 
              fontSize="sm" 
              noOfLines={3} 
              className="architectural-text"
              fontWeight="300"
              lineHeight="1.6"
            >
              {description}
            </Text>
            <HStack spacing={2} flexWrap="wrap" gap={1}>
              {tags.map((tag: string, index: number) => (
                <Box
                  key={index}
                  className="minimal-tag"
                  fontSize="10px"
                  fontWeight="400"
                  letterSpacing="0.5px"
                  textTransform="uppercase"
                >
                  {tag}
                </Box>
              ))}
            </HStack>
            <Box mt={2}>
              <NextLink href={projectUrl} passHref target="_blank" rel="noopener noreferrer">
                <ChakraLink
                  color="var(--warm-gray)"
                  fontWeight="300"
                  fontSize="sm"
                  display="flex"
                  alignItems="center"
                  _hover={{ 
                    color: "var(--deep-beige)",
                    transform: 'translateX(2px)' 
                  }}
                  transition="all 0.3s ease"
                  letterSpacing="0.5px"
                >
                  View Project <ExternalLinkIcon mx="2px" />
                </ChakraLink>
              </NextLink>
            </Box>
            <Text 
              fontSize="xs" 
              color="var(--warm-gray)" 
              fontWeight="300"
              letterSpacing="0.5px"
              textTransform="uppercase"
            >
              {date}
            </Text>
          </VStack>
        </VStack>
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
      {/* Blog Post Image */}
      {post.imageUrl && (
        <Box position="relative" overflow="hidden">
          <AspectRatio ratio={16/9}>
            <Image
              src={post.imageUrl}
              alt={`Cover image for ${post.title}`}
              objectFit="cover"
              transition="transform 0.3s ease"
              _hover={{ transform: 'scale(1.05)' }}
            />
          </AspectRatio>
        </Box>
      )}
      
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
  const hoverBg = useColorModeValue('white', 'rgba(255, 255, 255, 0.05)')
  const bgColor = useColorModeValue('gray.50', 'transparent')
  const borderColor = useColorModeValue('gray.200', 'transparent')
  const dateFontColor = useColorModeValue('black', 'gray.400')
  const titleColor = useColorModeValue('black', 'white')

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return format(date, 'MMMM d, yyyy')
    } catch (error) {
      console.error('Error formatting date:', error)
      return dateString
    }
  }

  const getEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}`
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
      <AspectRatio ratio={16/9}>
        <iframe 
          src={getEmbedUrl(video.videoId)}
          title={video.title}
          allowFullScreen
          style={{ borderRadius: '0.75rem 0.75rem 0 0' }}
        />
      </AspectRatio>
      <Box p={4}>
        <VStack align="start" spacing={2}>
          <Text 
            fontSize={{ base: "xs", md: "sm" }}
            color={dateFontColor}
            fontWeight="medium"
            fontFamily="mono"
          >
            {formatDate(video.publishedDate)}
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
              href={video.link}
              target="_blank"
              rel="noopener noreferrer"
              isExternal
            >
              {video.title}
            </LinkOverlay>
          </Heading>
        </VStack>
      </Box>
    </LinkBox>
  )
}

// YouTube Videos section component
function YouTubeVideos() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const sectionBg = useColorModeValue('gray.50', 'rgba(255, 255, 255, 0.03)')
  const borderColor = useColorModeValue('gray.200', 'transparent')

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch('/api/youtube')
        const data = await response.json()
        setVideos(data.slice(0, 3)) // Get the latest 3 videos
      } catch (error) {
        console.error('Error fetching YouTube videos:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchVideos()
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
          Latest Videos
        </Heading>
        
        {isLoading ? (
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 6 }} w="full">
            {[...Array(3)].map((_, index) => (
              <Box 
                key={index}
                borderRadius="xl" 
                bg="gray.50"
                boxShadow="sm"
                borderWidth="1px"
                borderColor="gray.200"
                overflow="hidden"
              >
                <AspectRatio ratio={16/9}>
                  <Skeleton width="100%" height="100%" />
                </AspectRatio>
                <Box p={4}>
                  <VStack align="stretch" spacing={3}>
                    <Skeleton height="20px" width="100px" />
                    <Skeleton height="24px" width="100%" />
                  </VStack>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        ) : videos.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 6 }} w="full">
            {videos.map((video) => (
              <YouTubeVideoCard key={video.videoId} video={video} />
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
            <Text color="black" fontWeight="medium">No videos found. Check back soon!</Text>
          </Box>
        )}
        
        <Box alignSelf="center">
          <Button
            as={Link}
            href="https://www.youtube.com/@BertoVMill"
            variant="outline"
            size={{ base: "md", md: "md" }}
            rightIcon={<ExternalLinkIcon />}
            target="_blank"
            rel="noopener noreferrer"
          >
            View All Videos
          </Button>
        </Box>
      </VStack>
    </Box>
  )
}

export default function Home() {
  const lightSectionBg = useColorModeValue('gray.50', 'rgba(255, 255, 255, 0.03)')
  const [showVideo, setShowVideo] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [projectsLoading, setProjectsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

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
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setProjectsLoading(false)
      }
    }

    fetchFeaturedProjects()
  }, [])

  // Toggle between image and video
  const toggleMedia = () => {
    setShowVideo(prev => {
      const newState = !prev
      // Play video when switching to video mode
      if (newState && videoRef.current) {
        videoRef.current.currentTime = 0
        videoRef.current.play().catch(e => console.error("Video play failed:", e))
      }
      return newState
    })
  }

  // Handler for when video ends
  const handleVideoEnded = () => {
    setShowVideo(false)
  }

  return (
    <>
      <GeometricBackground />
      <Box w="full" display="flex" justifyContent="center" position="relative">
        <Container 
          maxW="container.xl" 
          pt={{ base: 20, sm: 24, md: 28, lg: 32 }}
          px={{ base: 4, sm: 6, md: 8 }}
          centerContent
        >
          <VStack 
            spacing={{ base: 8, sm: 10, md: 12, lg: 16 }} 
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
                mb={{ base: 4, md: 6 }}
                gap={{ base: 8, md: 12 }}
                position="relative"
              >
                {/* Enhanced Hero Content */}
                <VStack 
                  flex="1" 
                  alignItems={{ base: "center", md: "flex-start" }}
                  textAlign={{ base: "center", md: "left" }}
                  spacing={8}
                  position="relative"
                  zIndex={2}
                >
                  {/* Animated Badge */}
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Box
                      px={4}
                      py={2}
                      borderRadius="full"
                      className="glass-effect"
                      border="1px solid rgba(212, 197, 169, 0.3)"
                      mb={4}
                    >
                      <Text
                        fontSize="sm"
                        fontWeight="500"
                        color="var(--warm-gray)"
                        letterSpacing="0.5px"
                        textTransform="uppercase"
                      >
                        ✨ Available for Projects
                      </Text>
                    </Box>
                  </MotionBox>

                  {/* Main Heading with Enhanced Animation */}
                  <MotionBox
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <Heading 
                      as="h1" 
                      className="gradient-text-hero"
                      fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
                      fontWeight="300"
                      letterSpacing="-0.04em"
                      lineHeight={{ base: "1.2", md: "1.1" }}
                      mb={6}
                      position="relative"
                    >
                      Hi, I&apos;m{" "}
                      <Box as="span" position="relative" display="inline-block">
                        <Text as="span" className="gradient-text-hero">
                          Berto
                        </Text>
                        <MotionBox
                          initial={{ rotate: 0 }}
                          animate={{ rotate: [0, 15, -15, 0] }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                            ease: "easeInOut"
                          }}
                          display="inline-block"
                          ml={2}
                        >
                          👋
                        </MotionBox>
                      </Box>
                    </Heading>
                  </MotionBox>

                  {/* Enhanced Description */}
                  <MotionBox
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <VStack spacing={4} align={{ base: "center", md: "flex-start" }}>
                      <Text 
                        fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
                        lineHeight={{ base: "1.6", md: "1.5" }}
                        className="architectural-text"
                        maxW="650px"
                        fontWeight="300"
                        color="var(--charcoal)"
                      >
                        Technology consultant & ML application developer
                      </Text>
                      <Text 
                        fontSize={{ base: "lg", md: "xl" }}
                        lineHeight="1.7"
                        className="architectural-text"
                        maxW="600px"
                        fontWeight="300"
                        color="var(--warm-gray)"
                        opacity="0.9"
                      >
                        Based in Toronto, passionate about crafting intuitive user experiences to help people and businesses solve problems.
                      </Text>
                    </VStack>
                  </MotionBox>

                  {/* Enhanced CTA Buttons */}
                  <MotionBox
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    <HStack spacing={4} flexWrap="wrap" justify={{ base: "center", md: "flex-start" }}>
                      <Button
                        as={Link}
                        href="/projects"
                        size="lg"
                        className="world-class-button"
                        px={8}
                        py={6}
                        fontSize="md"
                        fontWeight="500"
                        letterSpacing="0.3px"
                        _hover={{
                          transform: "translateY(-2px) scale(1.02)",
                          boxShadow: "0 20px 40px rgba(45, 41, 38, 0.15)"
                        }}
                        transition="all 0.4s cubic-bezier(0.23, 1, 0.320, 1)"
                      >
                        View My Work
                      </Button>
                      <Button
                        as={Link}
                        href="/about"
                        variant="outline"
                        size="lg"
                        px={8}
                        py={6}
                        fontSize="md"
                        fontWeight="400"
                        letterSpacing="0.3px"
                        borderColor="rgba(212, 197, 169, 0.3)"
                        color="var(--warm-gray)"
                        _hover={{
                          transform: "translateY(-2px)",
                          borderColor: "var(--deep-beige)",
                          color: "var(--deep-beige)",
                          bg: "rgba(212, 197, 169, 0.05)"
                        }}
                        transition="all 0.4s cubic-bezier(0.23, 1, 0.320, 1)"
                      >
                        Learn More
                      </Button>
                    </HStack>
                  </MotionBox>
                </VStack>
                
                {/* Enhanced Image Container */}
                <MotionBox
                  flex="1"
                  maxW={{ base: "300px", md: "400px" }}
                  minW={{ base: "300px", md: "400px" }}
                  position="relative"
                  initial={{ opacity: 0, scale: 0.9, x: 50 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  <Box
                    position="relative"
                    borderRadius="12px"
                    overflow="hidden" 
                    boxShadow="0 25px 80px rgba(45, 41, 38, 0.15)"
                    width="100%"
                    paddingBottom="110%"
                    className="glass-effect subtle-glow"
                    border="1px solid rgba(212, 197, 169, 0.25)"
                    _before={{
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: "linear-gradient(135deg, rgba(232, 220, 192, 0.1), rgba(212, 197, 169, 0.05))",
                      borderRadius: "12px",
                      zIndex: 1,
                      pointerEvents: "none"
                    }}
                  >
                    {/* Floating Decorative Elements */}
                    <Box
                      position="absolute"
                      top="-10px"
                      right="-10px"
                      width="20px"
                      height="20px"
                      borderRadius="full"
                      bg="linear-gradient(135deg, var(--warm-gray), var(--deep-beige))"
                      opacity="0.6"
                      className="floating"
                      zIndex={3}
                    />
                    <Box
                      position="absolute"
                      bottom="-15px"
                      left="-15px"
                      width="30px"
                      height="30px"
                      borderRadius="full"
                      bg="linear-gradient(135deg, var(--deep-beige), var(--warm-gray))"
                      opacity="0.4"
                      className="floating"
                      style={{ animationDelay: "1s" }}
                      zIndex={3}
                    />

                    <AnimatePresence mode="wait">
                      {showVideo ? (
                        <motion.div
                          key="video"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            zIndex: 2
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
                              objectPosition: "center",
                              borderRadius: "12px"
                            }}
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="image"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            zIndex: 2
                          }}
                        >
                          <Image
                            src="/headshot.png"
                            alt="Robert Mill"
                            position="absolute"
                            top="0"
                            left="0"
                            width="100%"
                            height="100%"
                            objectFit="cover"
                            objectPosition="center"
                            borderRadius="12px"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Box>
                  
                  {/* Enhanced Video Button */}
                  <MotionBox
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                  >
                    <Button
                      size="md"
                      className="world-class-button"
                      leftIcon={showVideo ? undefined : <Text as="span" fontSize="sm">▶</Text>}
                      onClick={toggleMedia}
                      position="absolute"
                      bottom="8"
                      right="8"
                      zIndex="4"
                      fontSize="xs"
                      letterSpacing="0.5px"
                      textTransform="uppercase"
                      px={4}
                      py={2}
                      borderRadius="full"
                      _hover={{
                        transform: "scale(1.05)",
                        boxShadow: "0 10px 25px rgba(45, 41, 38, 0.2)"
                      }}
                    >
                      {showVideo ? "Photo" : "AI Video"}
                    </Button>
                  </MotionBox>
                </MotionBox>
              </Box>

              {/* Section Divider - reduced */}
              <Box className="section-divider" opacity="0.6" />

              {/* Featured Work Section */}
              <Box 
                w="full" 
                mt={{ base: 6, md: 8 }}
                p={{ base: 8, md: 12 }}
                borderRadius="8px"
                className="glass-effect"
                position="relative"
                overflow="hidden"
              >
                <VStack spacing={10}>
                  <Heading 
                    as="h2" 
                    className="architectural-heading"
                    size={{ base: "xl", md: "2xl" }}
                    fontWeight="300"
                    letterSpacing="-0.02em"
                    color="var(--charcoal)"
                  >
                    Featured AI Projects
                  </Heading>
                  
                  {projectsLoading ? (
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 8, md: 10 }} w="full">
                      {[...Array(3)].map((_, index) => (
                        <Box 
                          key={index}
                          p={8} 
                          borderRadius="6px" 
                          className="glass-effect"
                        >
                          <VStack align="stretch" spacing={4}>
                            <Box className="skeleton" height="24px" width="60%" />
                            <Box className="skeleton" height="60px" width="100%" />
                            <Box className="skeleton" height="20px" width="40%" />
                          </VStack>
                        </Box>
                      ))}
                    </SimpleGrid>
                  ) : projects.length > 0 ? (
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 8, md: 10 }} w="full">
                      {projects.map((project, index) => (
                        <MotionBox
                          key={index}
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.15 }}
                        >
                          <ProjectCard {...project} />
                        </MotionBox>
                      ))}
                    </SimpleGrid>
                  ) : (
                    <Box 
                      p={8} 
                      borderRadius="6px" 
                      className="glass-effect"
                      width="full"
                      textAlign="center"
                    >
                      <Text 
                        className="architectural-text" 
                        fontWeight="300" 
                        fontSize="lg"
                        color="var(--warm-gray)"
                      >
                        No projects found. Check back soon!
                      </Text>
                    </Box>
                  )}
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
                          <Flex justify="space-between" align="center">
                            <HStack align="start" spacing={4}>
                              <Image 
                                src="/ivey_logo.png" 
                                alt="Ivey Business School Logo" 
                                boxSize={{ base: "50px", md: "60px" }}
                                objectFit="contain"
                                borderRadius="md"
                              />
                              <VStack align="start" spacing={1}>
                                <Text fontSize="lg" fontWeight="bold" color="black">
                                  Ivey Business School
                                </Text>
                                <Text fontSize="md" fontWeight="medium" color="black">
                                  Masters of Science, Digital Management (MSc)
                                </Text>
                              </VStack>
                            </HStack>
                            <Text fontSize="sm" color="black" fontFamily="mono" textAlign="right">
                              2022 - 2023
                            </Text>
                          </Flex>
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
                          <Flex justify="space-between" align="center">
                            <HStack align="start" spacing={4}>
                              <Image 
                                src="/ivey_logo.png" 
                                alt="Ivey Business School Logo" 
                                boxSize={{ base: "50px", md: "60px" }}
                                objectFit="contain"
                                borderRadius="md"
                              />
                              <VStack align="start" spacing={1}>
                                <Text fontSize="lg" fontWeight="bold" color="black">
                                  Ivey Business School
                                </Text>
                                <Text fontSize="md" fontWeight="medium" color="black">
                                  Graduate Diploma in Business and Sustainability (GDip)
                                </Text>
                              </VStack>
                            </HStack>
                            <Text fontSize="sm" color="black" fontFamily="mono" textAlign="right">
                              2023
                            </Text>
                          </Flex>
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
                          <Flex justify="space-between" align="center">
                            <HStack align="start" spacing={4}>
                              <Image 
                                src="/western_logo.png" 
                                alt="Western University Logo" 
                                boxSize={{ base: "50px", md: "60px" }}
                                objectFit="contain"
                                borderRadius="md"
                              />
                              <VStack align="start" spacing={1}>
                                <Text fontSize="lg" fontWeight="bold" color="black">
                                  Western University
                                </Text>
                                <Text fontSize="md" fontWeight="medium" color="black">
                                  Bachelors of Arts, Management and Legal Studies (BA)
                                </Text>
                              </VStack>
                            </HStack>
                            <Text fontSize="sm" color="black" fontFamily="mono" textAlign="right">
                              2017 - 2021
                            </Text>
                          </Flex>
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

            {/* Latest Videos Section */}
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              w="full"
              className="world-class-card"
            >
              <YouTubeVideos />
            </MotionBox>

          </VStack>
        </Container>
      </Box>
    </>
  )
}
