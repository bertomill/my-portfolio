'use client'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Switch,
  VStack,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  Box,
  useToast,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { Project } from '@/lib/schema'

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: Project | null
  onSave: () => void
}

export default function ProjectModal({
  isOpen,
  onClose,
  project,
  onSave,
}: ProjectModalProps) {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: [] as string[],
    logoSrc: '',
    logoAlt: '',
    projectUrl: '',
    date: '',
    imageSrc: '',
    featured: false,
    sortOrder: 0,
  })
  const [newTag, setNewTag] = useState('')

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        tags: project.tags,
        logoSrc: project.logoSrc,
        logoAlt: project.logoAlt,
        projectUrl: project.projectUrl,
        date: project.date,
        imageSrc: project.imageSrc || '',
        featured: project.featured || false,
        sortOrder: project.sortOrder,
      })
    } else {
      setFormData({
        title: '',
        description: '',
        tags: [],
        logoSrc: '',
        logoAlt: '',
        projectUrl: '',
        date: '',
        imageSrc: '',
        featured: false,
        sortOrder: 0,
      })
    }
  }, [project])

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = project ? `/api/projects/${project.id}` : '/api/projects'
      const method = project ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: `Project ${project ? 'updated' : 'created'} successfully`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        onSave()
      } else {
        throw new Error(`Failed to ${project ? 'update' : 'create'} project`)
      }
    } catch (error) {
      console.error('Error saving project:', error)
      toast({
        title: 'Error',
        description: `Failed to ${project ? 'update' : 'create'} project`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {project ? 'Edit Project' : 'Add New Project'}
        </ModalHeader>
        <ModalCloseButton />

        <form onSubmit={handleSubmit}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Project title"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Project description"
                  rows={3}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Project URL</FormLabel>
                <Input
                  value={formData.projectUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectUrl: e.target.value }))}
                  placeholder="https://example.com"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Date</FormLabel>
                <Input
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  placeholder="e.g., January 2024"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Logo Source</FormLabel>
                <Input
                  value={formData.logoSrc}
                  onChange={(e) => setFormData(prev => ({ ...prev, logoSrc: e.target.value }))}
                  placeholder="/logo.svg"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Logo Alt Text</FormLabel>
                <Input
                  value={formData.logoAlt}
                  onChange={(e) => setFormData(prev => ({ ...prev, logoAlt: e.target.value }))}
                  placeholder="Logo description"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Image Source (Screenshot)</FormLabel>
                <Input
                  value={formData.imageSrc}
                  onChange={(e) => setFormData(prev => ({ ...prev, imageSrc: e.target.value }))}
                  placeholder="https://i.ibb.co/abc123/project-screenshot.png"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Sort Order</FormLabel>
                <Input
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => setFormData(prev => ({ ...prev, sortOrder: parseInt(e.target.value) || 0 }))}
                  placeholder="0"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Tags</FormLabel>
                <HStack>
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  />
                  <Button onClick={handleAddTag} size="sm">
                    Add
                  </Button>
                </HStack>
                <Box mt={2}>
                  <HStack wrap="wrap" spacing={2}>
                    {formData.tags.map((tag) => (
                      <Tag key={tag} size="md" borderRadius="full" variant="solid" colorScheme="blue">
                        <TagLabel>{tag}</TagLabel>
                        <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                      </Tag>
                    ))}
                  </HStack>
                </Box>
              </FormControl>

              <FormControl>
                <HStack justify="space-between">
                  <FormLabel mb="0">Featured Project</FormLabel>
                  <Switch
                    isChecked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  />
                </HStack>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              type="submit"
              isLoading={loading}
              loadingText={project ? 'Updating...' : 'Creating...'}
            >
              {project ? 'Update' : 'Create'} Project
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
} 