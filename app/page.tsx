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
import GeometricBackground from '@/components/GeometricBackground'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { format } from 'date-fns'
import type { BlogPost } from '@/lib/getBlogPosts'
import { Project } from '@/lib/schema'
import { analytics } from '@/lib/analytics'

const MotionBox = motion(Box)

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
        width="100%"
        height="100%"
        objectFit="contain"
        objectPosition="center"
        opacity={0.7}
        filter="hue-rotate(10deg) saturate(0.8)"
      />
    </Box>
  )
}

// Project Card component - now with architectural styling
function ProjectCard(project: Project) {
  const { title, description, tags, projectUrl, date, imageSrc } = project
  
  const handleProjectClick = () => {
    analytics.projectClick(title, projectUrl)
    analytics.externalLinkClick(projectUrl, `Project: ${title}`)
  }

  const handleProjectView = () => {
    analytics.projectView(title)
  }

  return (
    <MotionBox
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      w="full"
      className="world-class-card project-card-enhanced"
      onMouseEnter={handleProjectView}
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
            <>
              {projectUrl && projectUrl !== "#" ? (
                <ChakraLink 
                  href={projectUrl} 
                  isExternal
                  onClick={() => {
                    console.log('Project image clicked:', title, projectUrl)
                    handleProjectClick()
                  }}
                  width="100%"
                >
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
                    cursor="pointer"
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
                </ChakraLink>
              ) : (
                <Box 
                  width="100%" 
                  borderRadius="4px" 
                  overflow="hidden" 
                  mb={3}
                  position="relative"
                  className="subtle-glow"
                  border="1px solid rgba(212, 197, 169, 0.2)"
                  opacity={0.8}
                >
                  <Image 
                    src={imageSrc} 
                    alt={`${title} screenshot`} 
                    width="100%"
                    height="auto"
                    objectFit="cover"
                  />
                </Box>
              )}
            </>
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
              {projectUrl && projectUrl !== "#" ? (
                <ChakraLink
                  href={projectUrl}
                  isExternal
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
                  onClick={() => {
                    console.log('Project clicked:', title, projectUrl)
                    handleProjectClick()
                  }}
                  cursor="pointer"
                  pointerEvents="auto"
                  zIndex={10}
                >
                  View Project <ExternalLinkIcon mx="2px" />
                </ChakraLink>
              ) : (
                <Text
                  color="var(--warm-gray)"
                  fontWeight="300"
                  fontSize="sm"
                  display="flex"
                  alignItems="center"
                  letterSpacing="0.5px"
                  opacity={0.6}
                >
                  Coming Soon
                </Text>
              )}
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

  const handleBlogPostClick = () => {
    analytics.blogPostClick(post.title)
    analytics.externalLinkClick(post.link, `Blog Post: ${post.title}`)
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
        <AspectRatio ratio={16/9}>
          <Image 
            src={post.imageUrl}
            alt={post.title}
            objectFit="cover"
            width="100%"
            height="100%"
            fallback={
              <Box 
                width="100%" 
                height="100%" 
                bg="gray.100" 
                display="flex" 
                alignItems="center" 
                justifyContent="center"
              >
                <Text fontSize="sm" color="gray.500">Image unavailable</Text>
              </Box>
            }
          />
        </AspectRatio>
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
              onClick={handleBlogPostClick}
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
            onClick={handleViewAllArticlesClick}
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

  const handleVideoClick = () => {
    analytics.videoClick(video.title)
    analytics.externalLinkClick(video.link, 'YouTube Video')
  }

  const handleVideoView = () => {
    analytics.videoView(video.title)
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
      onMouseEnter={handleVideoView}
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
              onClick={handleVideoClick}
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
            onClick={handleViewAllVideosClick}
          >
            View All Videos
          </Button>
        </Box>
      </VStack>
    </Box>
  )
}

export default function Home() {
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
    <>
      <GeometricBackground />
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
                    className="architectural-heading"
                  >
                    Hi, I&apos;m Berto 👋
                  </Heading>

                  <Text 
                    fontSize={{ base: "md", sm: "lg", md: "xl" }}
                    lineHeight={{ base: "tall", md: "taller" }}
                    className="architectural-text"
                  >
                    I am a technology consultant and ML application developer based in Toronto, passionate about crafting intuitive user experiences to
                    help people and businesses solve problems.
                  </Text>
                </VStack>
                
                <Box 
                  flex="1"
                  maxW={{ base: "200px", md: "300px" }}
                  minW={{ base: "200px", md: "300px" }}
                  position="relative"
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
                              position="absolute"
                              top="0"
                              left="0"
                              width="100%"
                              height="100%"
                              objectFit="cover"
                              objectPosition="center"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Box>
                  </MotionBox>
                  <Button
                    size="sm"
                    variant="ghost"
                    bgColor={showVideo ? "rgba(0, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.8)"}
                    color={showVideo ? "white" : "black"}
                    fontWeight="medium"
                    borderRadius="full"
                    leftIcon={showVideo ? undefined : <Text as="span" fontSize="xs">▶</Text>}
                    onClick={toggleMedia}
                    position="absolute"
                    bottom="5"
                    right="5"
                    zIndex="1"
                    boxShadow="md"
                    backdropFilter="blur(8px)"
                    _hover={{
                      bgColor: showVideo ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.9)",
                      transform: "scale(1.05)"
                    }}
                    _active={{
                      transform: "scale(0.95)"
                    }}
                    transition="all 0.2s"
                  >
                    {showVideo ? "Return" : "AI Video"}
                  </Button>
                </Box>
              </Box>

              {/* Watercolor Divider */}
              <WatercolorDivide />

              {/* Featured Work Section */}
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                w="full"
                className="world-class-card"
              >
                <Box 
                  w="full" 
                  p={{ base: 5, md: 6 }}
                  borderRadius="6px"
                  className="glass-effect"
                >
                  <VStack spacing={6}>
                    <Heading 
                      as="h2" 
                      size={{ base: "md", md: "lg" }}
                      mb={{ base: 1, md: 2 }}
                      className="architectural-heading"
                    >
                      Featured AI applications
                    </Heading>
                    
                    {projectsLoading ? (
                      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 6 }} w="full">
                        {[...Array(3)].map((_, index) => (
                          <Box 
                            key={index}
                            p={4} 
                            borderRadius="6px" 
                            bg="rgba(232, 220, 192, 0.08)"
                            boxShadow="sm"
                            border="1px solid rgba(212, 197, 169, 0.2)"
                          >
                            <VStack align="stretch" spacing={3}>
                              <Skeleton height="20px" width="100px" />
                              <Skeleton height="24px" width="100%" />
                              <Skeleton height="20px" width="200px" />
                            </VStack>
                          </Box>
                        ))}
                      </SimpleGrid>
                    ) : projects.length > 0 ? (
                      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 6 }} w="full">
                        {projects.map((project, index) => (
                          <Box key={index}>
                            <ProjectCard {...project} />
                          </Box>
                        ))}
                      </SimpleGrid>
                    ) : (
                      <Box 
                        p={4} 
                        borderRadius="6px" 
                        bg="rgba(232, 220, 192, 0.08)"
                        width="full"
                        textAlign="center"
                        border="1px solid rgba(212, 197, 169, 0.2)"
                      >
                        <Text className="architectural-text">No projects found. Check back soon!</Text>
                      </Box>
                    )}
                  </VStack>
                </Box>
              </MotionBox>

              {/* Watercolor Divider */}
              <WatercolorDivide />

              {/* Blog Posts Section */}
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                w="full"
                mt={{ base: 8, md: 12 }}
                className="world-class-card"
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
                className="world-class-card"
              >
                <YouTubeVideos />
              </MotionBox>

              {/* Watercolor Divider */}
              <WatercolorDivide />

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
              </Box>
            </Box>

          </VStack>
        </Container>
      </Box>
    </>
  )
}
