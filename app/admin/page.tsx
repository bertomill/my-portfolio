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
import { Project, ArtPiece, Book } from '@/lib/schema'
import ProjectModal from '@/components/ProjectModal'
import ArtModal from '@/components/ArtModal'
import BookModal from '@/components/BookModal'

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const toast = useToast()
  const { isOpen: isProjectModalOpen, onOpen: onProjectModalOpen, onClose: onProjectModalClose } = useDisclosure()
  const { isOpen: isArtModalOpen, onOpen: onArtModalOpen, onClose: onArtModalClose } = useDisclosure()
  const { isOpen: isBookModalOpen, onOpen: onBookModalOpen, onClose: onBookModalClose } = useDisclosure()
  
  const [projects, setProjects] = useState<Project[]>([])
  const [artPieces, setArtPieces] = useState<ArtPiece[]>([])
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [artLoading, setArtLoading] = useState(true)
  const [booksLoading, setBooksLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedArtPiece, setSelectedArtPiece] = useState<ArtPiece | null>(null)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/admin/login')
      return
    }

    fetchProjects()
    fetchArtPieces()
    fetchBooks()
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

  const fetchArtPieces = async () => {
    try {
      setArtLoading(true)
      const response = await fetch('/api/art')
      if (response.ok) {
        const data = await response.json()
        setArtPieces(data)
      }
    } catch (error) {
      console.error('Error fetching art pieces:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch art pieces',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setArtLoading(false)
    }
  }

  const fetchBooks = async () => {
    try {
      setBooksLoading(true)
      const response = await fetch('/api/books')
      if (response.ok) {
        const data = await response.json()
        setBooks(data)
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch books',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setBooksLoading(false)
    }
  }

  const handleEdit = (project: Project) => {
    setSelectedProject(project)
    onProjectModalOpen()
  }

  const handleAdd = () => {
    setSelectedProject(null)
    onProjectModalOpen()
  }

  const handleEditArt = (artPiece: ArtPiece) => {
    setSelectedArtPiece(artPiece)
    onArtModalOpen()
  }

  const handleAddArt = () => {
    setSelectedArtPiece(null)
    onArtModalOpen()
  }

  const handleEditBook = (book: Book) => {
    setSelectedBook(book)
    onBookModalOpen()
  }

  const handleAddBook = () => {
    setSelectedBook(null)
    onBookModalOpen()
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

  const handleDeleteArt = async (id: number) => {
    if (!confirm('Are you sure you want to delete this art piece?')) return

    try {
      const response = await fetch(`/api/art/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Art piece deleted successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        fetchArtPieces() // Refresh the list
      } else {
        throw new Error('Failed to delete art piece')
      }
    } catch (error) {
      console.error('Error deleting art piece:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete art piece',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleDeleteBook = async (id: number) => {
    if (!confirm('Are you sure you want to delete this book?')) return

    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Book deleted successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        fetchBooks() // Refresh the list
      } else {
        throw new Error('Failed to delete book')
      }
    } catch (error) {
      console.error('Error deleting book:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete book',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleProjectSaved = () => {
    fetchProjects() // Refresh the list
    onProjectModalClose()
  }

  const handleArtSaved = () => {
    fetchArtPieces() // Refresh the list
    onArtModalClose()
  }

  const handleBookSaved = () => {
    fetchBooks() // Refresh the list
    onBookModalClose()
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
      <VStack spacing={6} align="stretch" mt={10}>
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

        <Box bg="white" p={6} borderRadius="xl" borderWidth="1px" borderColor="gray.200">
          <HStack justify="space-between" mb={4}>
            <Heading as="h2" size="md">
              Art Pieces
            </Heading>
            <Button leftIcon={<AddIcon />} colorScheme="green" onClick={handleAddArt}>
              Add Art Piece
            </Button>
          </HStack>

          {artLoading ? (
            <VStack spacing={4}>
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} height="60px" width="100%" />
              ))}
            </VStack>
          ) : artPieces.length === 0 ? (
            <Alert status="info">
              <AlertIcon />
              No art pieces found. Add your first art piece!
            </Alert>
          ) : (
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Title</Th>
                    <Th>Description</Th>
                    <Th>Source</Th>
                    <Th>Featured</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {artPieces.map((artPiece) => (
                    <Tr key={artPiece.id}>
                      <Td>
                        <Text fontWeight="medium">{artPiece.title}</Text>
                      </Td>
                      <Td>
                        <Text noOfLines={2} maxW="300px">
                          {artPiece.description || 'No description'}
                        </Text>
                      </Td>
                      <Td>
                        <Text fontSize="sm" noOfLines={1} maxW="200px">
                          {artPiece.src}
                        </Text>
                      </Td>
                      <Td>
                        <Badge colorScheme={artPiece.featured ? 'green' : 'gray'}>
                          {artPiece.featured ? 'Yes' : 'No'}
                        </Badge>
                      </Td>
                      <Td>
                        <HStack spacing={2}>
                          <IconButton
                            aria-label="Edit art piece"
                            icon={<EditIcon />}
                            size="sm"
                            colorScheme="blue"
                            variant="ghost"
                            onClick={() => handleEditArt(artPiece)}
                          />
                          <IconButton
                            aria-label="Delete art piece"
                            icon={<DeleteIcon />}
                            size="sm"
                            colorScheme="red"
                            variant="ghost"
                            onClick={() => handleDeleteArt(artPiece.id)}
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

        <Box bg="white" p={6} borderRadius="xl" borderWidth="1px" borderColor="gray.200">
          <HStack justify="space-between" mb={4}>
            <Heading as="h2" size="md">
              Books
            </Heading>
            <Button leftIcon={<AddIcon />} colorScheme="purple" onClick={() => { setSelectedBook(null); onBookModalOpen(); }}>
              Add Book
            </Button>
          </HStack>

          {booksLoading ? (
            <VStack spacing={4}>
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} height="60px" width="100%" />
              ))}
            </VStack>
          ) : books.length === 0 ? (
            <Alert status="info">
              <AlertIcon />
              No books found. Add your first book!
            </Alert>
          ) : (
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Title</Th>
                    <Th>Description</Th>
                    <Th>What I Learned</Th>
                    <Th>Date Read</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {books.map((book) => (
                    <Tr key={book.id}>
                      <Td>
                        <Text fontWeight="medium">{book.title}</Text>
                      </Td>
                      <Td>
                        <Text noOfLines={2} maxW="300px">
                          {book.description}
                        </Text>
                      </Td>
                      <Td>
                        <Text noOfLines={2} maxW="300px">
                          {book.what_i_learned}
                        </Text>
                      </Td>
                      <Td>
                        <Text fontSize="sm">{book.date_read}</Text>
                      </Td>
                      <Td>
                        <HStack spacing={2}>
                          <IconButton
                            aria-label="Edit book"
                            icon={<EditIcon />}
                            size="sm"
                            colorScheme="blue"
                            variant="ghost"
                            onClick={() => { setSelectedBook(book); onBookModalOpen(); }}
                          />
                          {/* Add delete logic if needed */}
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
        isOpen={isProjectModalOpen}
        onClose={onProjectModalClose}
        project={selectedProject}
        onSave={handleProjectSaved}
      />
      
      <ArtModal
        isOpen={isArtModalOpen}
        onClose={onArtModalClose}
        artPiece={selectedArtPiece}
        onSave={handleArtSaved}
      />

      <BookModal
        isOpen={isBookModalOpen}
        onClose={onBookModalClose}
        book={selectedBook}
        onSave={handleBookSaved}
      />
    </Container>
  )
}