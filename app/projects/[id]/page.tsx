'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Box, 
  Container, 
  VStack, 
  HStack, 
  Heading, 
  Text, 
  Button, 
  Tag, 
  AspectRatio,
  Card,
  CardBody,
  Skeleton,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

import type { Project } from '@/lib/schema'
import { analytics } from '@/lib/analytics'

const MotionBox = motion(Box)

export default function ProjectDetailPage() {
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  
  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await fetch(`/api/projects/${params.id}`)
        if (!response.ok) {
          throw new Error('Project not found')
        }
        const data = await response.json()
        setProject(data)
        analytics.projectView(data.title)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load project')
        analytics.error('Failed to fetch project details', 'Project Page')
      } finally {
        setLoading(false)
      }
    }
    
    if (params.id) {
      fetchProject()
    }
  }, [params.id])

  const handleProjectClick = () => {
    if (project) {
      analytics.projectClick(project.title, project.projectUrl)
      analytics.externalLinkClick(project.projectUrl, `Project Detail: ${project.title}`)
    }
  }

  const getYouTubeEmbedUrl = (url: string) => {
    // Extract video ID from various YouTube URL formats
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    const match = url.match(regex)
    return match ? `https://www.youtube.com/embed/${match[1]}` : url
  }

  if (loading) {
    return (
      <Container maxW="container.lg" py={8}>
        <VStack spacing={8} align="stretch">
          <HStack>
            <Skeleton height="40px" width="120px" />
          </HStack>
          <Card bg={cardBg} borderColor={borderColor} borderWidth="1px">
            <CardBody p={8}>
              <VStack spacing={6} align="stretch">
                <Skeleton height="40px" width="60%" />
                <Skeleton height="20px" width="100%" />
                <Skeleton height="20px" width="80%" />
                <AspectRatio ratio={16/9}>
                  <Skeleton />
                </AspectRatio>
                <HStack spacing={2}>
                  <Skeleton height="24px" width="60px" />
                  <Skeleton height="24px" width="80px" />
                </HStack>
                <Skeleton height="40px" width="140px" />
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    )
  }

  if (error || !project) {
    return (
      <Container maxW="container.lg" py={8}>
        <VStack spacing={8} align="stretch">
          <Button
            variant="ghost"
            leftIcon={<ArrowLeft size={20} />}
            as={Link}
            href="/"
            alignSelf="flex-start"
          >
            Back to Home
          </Button>
          
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Project Not Found</AlertTitle>
            <AlertDescription>
              {error || 'The project you are looking for does not exist.'}
            </AlertDescription>
          </Alert>
        </VStack>
      </Container>
    )
  }

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8} align="stretch">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            leftIcon={<ArrowLeft size={20} />}
            as={Link}
            href="/"
            alignSelf="flex-start"
          >
            Back to Home
          </Button>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card bg={cardBg} borderColor={borderColor} borderWidth="1px">
            <CardBody p={8}>
              <VStack spacing={6} align="stretch">
                <Heading size="xl">{project.title}</Heading>
                
                <Text fontSize="lg" color="gray.600" _dark={{ color: "gray.400" }}>
                  {project.description}
                </Text>

                {/* Project Image */}
                {project.imageSrc && (
                  <AspectRatio ratio={16/9}>
                    <Box borderRadius="md" overflow="hidden">
                      <Image
                        src={project.imageSrc}
                        alt={`${project.title} screenshot`}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                  </AspectRatio>
                )}

                {/* YouTube Video */}
                {project.youtubeUrl && (
                  <Box>
                    <Heading size="md" mb={4}>Project Walkthrough</Heading>
                    <AspectRatio ratio={16/9}>
                      <Box borderRadius="md" overflow="hidden">
                        <iframe
                          src={getYouTubeEmbedUrl(project.youtubeUrl)}
                          title={`${project.title} - Project Walkthrough`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{ width: "100%", height: "100%", border: 0 }}
                        />
                      </Box>
                    </AspectRatio>
                  </Box>
                )}

                {/* Show message if no YouTube URL */}
                {!project.youtubeUrl && (
                  <Box>
                    <Heading size="md" mb={4}>Project Walkthrough</Heading>
                    <Alert status="info">
                      <AlertIcon />
                      <AlertDescription>
                        Video walkthrough will be available soon. Please check back later or click "View Project" to explore the live application.
                      </AlertDescription>
                    </Alert>
                  </Box>
                )}

                <HStack spacing={2} flexWrap="wrap">
                  {project.tags.map((tag, index) => (
                    <Tag
                      key={index}
                      size="md"
                      colorScheme="blue"
                      variant="subtle"
                    >
                      {tag}
                    </Tag>
                  ))}
                </HStack>

                <HStack justify="space-between" align="center" pt={4}>
                  <Text fontSize="sm" color="gray.500">
                    {project.date}
                  </Text>
                  
                  {project.projectUrl && project.projectUrl !== "#" && (
                    <Button
                      variant="solid"
                      colorScheme="blue"
                      size="lg"
                      as={Link}
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      rightIcon={<ExternalLink size={16} />}
                      onClick={handleProjectClick}
                    >
                      View Project
                    </Button>
                  )}
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        </MotionBox>
      </VStack>
    </Container>
  )
}