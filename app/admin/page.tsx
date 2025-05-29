'use client'

import {
  Box,
  Button,
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  HStack,
  Text,
  Badge,
  IconButton,
  useDisclosure,
  Skeleton,
  Alert,
  AlertIcon,
  useToast,
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Project } from '@/lib/schema'
import ProjectModal from '@/components/ProjectModal'

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/admin/login')
      return
    }

    fetchProjects()
  }, [session, status, router])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch projects',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (project: Project) => {
    setSelectedProject(project)
    onOpen()
  }

  const handleAdd = () => {
    setSelectedProject(null)
    onOpen()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Project deleted successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        fetchProjects() // Refresh the list
      } else {
        throw new Error('Failed to delete project')
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete project',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleProjectSaved = () => {
    fetchProjects() // Refresh the list
    onClose()
  }

  if (status === 'loading') {
    return (
      <Container maxW="container.xl" py={8}>
        <VStack spacing={6}>
          <Skeleton height="40px" width="200px" />
          <Skeleton height="400px" width="100%" />
        </VStack>
      </Container>
    )
  }

  if (!session) {
    return null // Will redirect to login
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="stretch">
        <HStack justify="space-between">
          <Heading as="h1" size="lg">
            Admin Dashboard
          </Heading>
          <HStack>
            <Text fontSize="sm" color="gray.600">
              Welcome, {session.user?.name}
            </Text>
            <Button size="sm" variant="ghost" onClick={() => signOut()}>
              Sign Out
            </Button>
          </HStack>
        </HStack>

        <Box bg="white" p={6} borderRadius="xl" borderWidth="1px" borderColor="gray.200">
          <HStack justify="space-between" mb={4}>
            <Heading as="h2" size="md">
              Projects
            </Heading>
            <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={handleAdd}>
              Add Project
            </Button>
          </HStack>

          {loading ? (
            <VStack spacing={4}>
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} height="60px" width="100%" />
              ))}
            </VStack>
          ) : projects.length === 0 ? (
            <Alert status="info">
              <AlertIcon />
              No projects found. Add your first project!
            </Alert>
          ) : (
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Title</Th>
                    <Th>Description</Th>
                    <Th>Featured</Th>
                    <Th>Date</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {projects.map((project) => (
                    <Tr key={project.id}>
                      <Td>
                        <Text fontWeight="medium">{project.title}</Text>
                      </Td>
                      <Td>
                        <Text noOfLines={2} maxW="300px">
                          {project.description}
                        </Text>
                      </Td>
                      <Td>
                        <Badge colorScheme={project.featured ? 'green' : 'gray'}>
                          {project.featured ? 'Yes' : 'No'}
                        </Badge>
                      </Td>
                      <Td>
                        <Text fontSize="sm">{project.date}</Text>
                      </Td>
                      <Td>
                        <HStack spacing={2}>
                          <IconButton
                            aria-label="Edit project"
                            icon={<EditIcon />}
                            size="sm"
                            colorScheme="blue"
                            variant="ghost"
                            onClick={() => handleEdit(project)}
                          />
                          <IconButton
                            aria-label="Delete project"
                            icon={<DeleteIcon />}
                            size="sm"
                            colorScheme="red"
                            variant="ghost"
                            onClick={() => handleDelete(project.id)}
                          />
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )}
        </Box>
      </VStack>

      <ProjectModal
        isOpen={isOpen}
        onClose={onClose}
        project={selectedProject}
        onSave={handleProjectSaved}
      />
    </Container>
  )
} 