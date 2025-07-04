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

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        p={{ base: 5, md: 6 }}
        borderRadius="6px"
        position="relative"
        className="glass-effect"
        _hover={{
          transform: 'translateY(-2px)',
        }}
        transition="all 0.3s cubic-bezier(0.23, 1, 0.320, 1)"
      >

        <HStack spacing={6} align="start">
          <Image 
            src={project.imageSrc || logoSrc} 
            alt={logoAlt} 
            boxSize={{ base: "80px", md: "100px" }}
            objectFit="cover"
            borderRadius="md"
          />
          <VStack align="start" spacing={3}>
            <Heading size={{ base: "md", md: "lg" }} className="architectural-heading">{title}</Heading>
            <Text className="architectural-text">{description}</Text>
            <Text fontSize="sm" className="architectural-text" fontWeight="300" opacity={0.8}>
              {date}
            </Text>
            <HStack spacing={2} flexWrap="wrap" gap={2}>
              {tags.map((tag: string, index: number) => (
                <Tag 
                  key={index} 
                  size={{ base: "sm", md: "md" }} 
                  bg="rgba(160, 139, 115, 0.1)"
                  color="var(--warm-gray)"
                  borderRadius="full"
                  fontWeight="300"
                  border="1px solid rgba(160, 139, 115, 0.2)"
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
              color="var(--warm-gray)"
              fontWeight="300"
              rightIcon={<ExternalLinkIcon />}
              _hover={{ 
                color: "var(--deep-beige)",
                textDecoration: 'underline' 
              }}
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
          pt={{ base: 24, md: 32 }} 
          pb={{ base: 16, md: 20 }}
        >
        <Heading 
          as="h1" 
          size={{ base: "xl", md: "2xl" }}
          mb={{ base: 6, md: 8 }} 
          textAlign="center"
          className="architectural-heading"
        >
          Projects
        </Heading>

        {loading ? (
          <VStack spacing={6}>
            {[...Array(3)].map((_, index) => (
              <Box 
                key={index}
                p={{ base: 5, md: 6 }}
                borderRadius="6px"
                w="full"
                className="glass-effect"
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
            borderRadius="6px" 
            className="glass-effect"
            textAlign="center"
          >
            <Text className="architectural-text">No projects found. Check back soon!</Text>
          </Box>
        )}
      </VStack>
    </Container>
  )
} 