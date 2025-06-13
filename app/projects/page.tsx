'use client'

import {
  VStack,
  Heading,
  Box,
  Text,
  Image,
  HStack,
  Tag,
  Container,
  useColorModeValue,
  Button,
  Skeleton,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import { Project } from '@/lib/schema'

const MotionBox = motion(Box)

// Project Card component for projects page
function ProjectCard(project: Project) {
  const { title, description, tags, logoSrc, logoAlt, projectUrl, date } = project
  const hoverBg = useColorModeValue('rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.05)')
  const tagBg = useColorModeValue('gray.200', 'whiteAlpha.200')
  const tagColor = useColorModeValue('black', 'white')

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        p={{ base: 4, md: 6 }}
        borderRadius="xl"
        position="relative"
        _hover={{
          bg: hoverBg,
          transform: 'translateY(-2px)',
        }}
        transition="all 0.2s"
      >
        <Box
          position="absolute"
          inset={0}
          borderRadius="xl"
          opacity={0}
          bg="linear-gradient(45deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)"
          transition="opacity 0.2s"
          _groupHover={{ opacity: 1 }}
        />

        <HStack spacing={6} align="start">
          <Image 
            src={project.imageSrc || logoSrc} 
            alt={logoAlt} 
            boxSize={{ base: "80px", md: "100px" }}
            objectFit="cover"
            borderRadius="md"
          />
          <VStack align="start" spacing={3}>
            <Heading size={{ base: "md", md: "lg" }}>{title}</Heading>
            <Text>{description}</Text>
            <Text fontSize="sm" color="gray.500" fontWeight="medium">
              {date}
            </Text>
            <HStack spacing={2} flexWrap="wrap" gap={2}>
              {tags.map((tag: string, index: number) => (
                <Tag 
                  key={index} 
                  size={{ base: "sm", md: "md" }} 
                  bg={tagBg} 
                  color={tagColor}
                >
                  {tag}
                </Tag>
              ))}
            </HStack>
            <Button 
              as="a"
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              variant="link"
              colorScheme="blue"
              fontWeight="medium"
              rightIcon={<ExternalLinkIcon />}
              _hover={{ textDecoration: 'underline' }}
            >
              Visit Project
            </Button>
          </VStack>
        </HStack>
      </Box>
    </MotionBox>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true)
        const response = await fetch('/api/projects')
        if (response.ok) {
          const data = await response.json()
          setProjects(data)
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <Container maxW="container.md" px={{ base: 4, md: 8 }}>
      <VStack 
        spacing={8} 
        alignItems="stretch" 
        pt={{ base: 16, md: 40 }} 
        pb={{ base: 16, md: 20 }}
      >
        <Heading 
          as="h1" 
          size={{ base: "xl", md: "2xl" }}
          mb={{ base: 6, md: 8 }} 
          textAlign="center"
        >
          Projects
        </Heading>

        {loading ? (
          <VStack spacing={6}>
            {[...Array(3)].map((_, index) => (
              <Box 
                key={index}
                p={{ base: 4, md: 6 }}
                borderRadius="xl"
                w="full"
                bg="gray.50"
                borderWidth="1px"
                borderColor="gray.200"
              >
                <HStack spacing={6} align="start">
                  <Skeleton boxSize={{ base: "80px", md: "100px" }} borderRadius="md" />
                  <VStack align="start" spacing={3} flex="1">
                    <Skeleton height="24px" width="200px" />
                    <Skeleton height="20px" width="100%" />
                    <Skeleton height="16px" width="100px" />
                    <HStack spacing={2}>
                      <Skeleton height="20px" width="60px" borderRadius="full" />
                      <Skeleton height="20px" width="80px" borderRadius="full" />
                    </HStack>
                    <Skeleton height="16px" width="100px" />
                  </VStack>
                </HStack>
              </Box>
            ))}
          </VStack>
        ) : projects.length > 0 ? (
          <VStack spacing={6}>
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </VStack>
        ) : (
          <Box 
            p={6} 
            borderRadius="xl" 
            bg="gray.50"
            textAlign="center"
          >
            <Text color="black" fontWeight="medium">No projects found. Check back soon!</Text>
          </Box>
        )}
      </VStack>
    </Container>
  )
} 