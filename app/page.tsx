'use client'

import * as React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { format } from "date-fns"
import { ArrowRight } from "lucide-react"

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
import FlipCard from '@/components/FlipCard'
import { TracingBeam } from '@/components/ui/tracing-beam'

import type { BlogPost } from "@/lib/getBlogPosts"
import type { Project } from "@/lib/schema"
import { analytics } from "@/lib/analytics"

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
      height={{ base: "40px", md: "50px" }}
      my={{ base: 4, md: 6 }}
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

// Simple Project Card component
function ProjectCard({ project }: { project: Project }) {
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const titleColor = useColorModeValue('gray.900', 'white')
  const descriptionColor = useColorModeValue('gray.600', 'gray.400')

  const handleProjectClick = () => {
    analytics.projectClick(project.title, project.projectUrl)
    analytics.externalLinkClick(project.projectUrl, `Project: ${project.title}`)
  }

  const handleProjectView = () => {
    analytics.projectView(project.title)
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
      onMouseEnter={handleProjectView}
    >
      {/* Project Image */}
      {project.imageSrc && (
        <AspectRatio ratio={16/9}>
          <Box bg="gray.100" borderTopRadius="md">
            <Image 
              src={project.imageSrc}
              alt={`${project.title} screenshot`}
              fill
              style={{ objectFit: "cover" }}
            />
          </Box>
        </AspectRatio>
      )}
      
      <CardBody p={4}>
        <VStack align="start" spacing={3}>
          <Heading
            as="h3"
            fontSize="lg"
            fontWeight="semibold"
            color={titleColor}
            noOfLines={2}
          >
            {project.title}
          </Heading>
          
          <Text 
            fontSize="sm" 
            color={descriptionColor}
            noOfLines={3}
            lineHeight="tall"
          >
            {project.description}
          </Text>

          {/* Tags */}
          <HStack spacing={2} flexWrap="wrap">
            {project.tags.slice(0, 3).map((tag, index) => (
              <Tag
                key={index}
                size="sm"
                variant="outline"
                fontSize="xs"
              >
                {tag}
              </Tag>
            ))}
            {project.tags.length > 3 && (
              <Tag size="sm" variant="outline" fontSize="xs">
                +{project.tags.length - 3}
              </Tag>
            )}
          </HStack>

          {/* Date */}
          <HStack spacing={2}>
            <Text fontSize="xs" color={descriptionColor} fontFamily="mono">
              {project.date}
            </Text>
          </HStack>
        </VStack>
      </CardBody>
      
      <CardFooter pt={0}>
        {project.projectUrl && project.projectUrl !== "#" ? (
          <Button
            variant="outline"
            size="sm"
            width="full"
            as={Link}
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleProjectClick}
            rightIcon={<ArrowRight size={14} />}
          >
            View Project
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            width="full"
            disabled
            cursor="not-allowed"
          >
            Coming Soon
          </Button>
        )}
      </CardFooter>
    </Card>
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
  const [projects, setProjects] = useState<Project[]>([])
  const [projectsLoading, setProjectsLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest')

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



  const handleAboutMeClick = () => {
    analytics.navClick('About Page')
  }

  const handleProjectsClick = () => {
    analytics.navClick('Projects Page')
  }

  return (
    <Box className="min-h-screen">
      <Container 
        maxW="container.xl" 
        pt={{ base: 8, sm: 12, md: 40, lg: 44 }}
        px={{ base: 4, sm: 6, md: 8 }}
        centerContent
      >
        <TracingBeam>
          <VStack 
            spacing={{ base: 4, sm: 6, md: 8, lg: 10 }} 
            alignItems="center" 
            textAlign="center"
            w="full"
            maxW="container.lg"
            mt={{ base: 8, sm: 12, md: 16 }}
          >
          {/* Hero Section */}
          <Box w="full">
            {/* Side-by-side layout for desktop, stacked for mobile */}
            <SimpleGrid 
              columns={{ base: 1, lg: 2 }} 
              spacing={{ base: 8, lg: 12 }} 
              w="full" 
              alignItems="center"
              px={{ base: 4, md: 8 }}
            >
              {/* Left side - Interactive Flip Card */}
              <Box display="flex" justifyContent={{ base: "center", lg: "flex-end" }}>
                <FlipCard />
              </Box>

              {/* Right side - Text content */}
              <VStack 
                align={{ base: "center", lg: "flex-start" }}
                textAlign={{ base: "center", lg: "left" }}
                spacing={6}
                maxW="2xl"
              >
                <Text 
                  fontSize={{ base: "md", sm: "lg", md: "xl" }}
                  lineHeight="tall"
                  color="gray.600"
                  _dark={{ color: "gray.400" }}
                >
                  I&apos;m an AI consultant and engineer based in Toronto - and I&apos;m passionate about making AI simple and practical for all to improve their businesses, community and lives.
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
            </SimpleGrid>
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
                      <ProjectCard 
                        key={project.id || index} 
                        project={project}
                      />
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
            pb={{ base: 4, md: 6 }}
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
        </TracingBeam>
      </Container>
    </Box>
  )
}
