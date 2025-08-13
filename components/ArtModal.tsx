'use client'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Switch,
  Button,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { ArtPiece } from '@/lib/schema'

interface ArtModalProps {
  isOpen: boolean
  onClose: () => void
  artPiece?: ArtPiece | null
  onSave: () => void
}

export default function ArtModal({ isOpen, onClose, artPiece, onSave }: ArtModalProps) {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    src: '',
    href: '',
    featured: false,
  })

  useEffect(() => {
    if (artPiece) {
      setFormData({
        title: artPiece.title,
        description: artPiece.description || '',
        src: artPiece.src,
        href: artPiece.href || '',
        featured: !!artPiece.featured,
      })
    } else {
      setFormData({
        title: '',
        description: '',
        src: '',
        href: '',
        featured: false,
      })
    }
  }, [artPiece, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.src.trim()) {
      toast({
        title: 'Error',
        description: 'Title and image source are required',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setLoading(true)

    try {
      const url = artPiece ? `/api/art/${artPiece.id}` : '/api/art'
      const method = artPiece ? 'PUT' : 'POST'

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
          description: `Art piece ${artPiece ? 'updated' : 'created'} successfully`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        onSave()
      } else {
        const error = await response.json()
        throw new Error(error.error || 'Something went wrong')
      }
    } catch (error) {
      console.error('Error saving art piece:', error)
      toast({
        title: 'Error',
        description: `Failed to ${artPiece ? 'update' : 'create'} art piece`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }))
  }

  const handleSwitchChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.checked,
    }))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            {artPiece ? 'Edit Art Piece' : 'Add New Art Piece'}
          </ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  value={formData.title}
                  onChange={handleInputChange('title')}
                  placeholder="Enter art piece title"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={formData.description}
                  onChange={handleInputChange('description')}
                  placeholder="Enter description (optional)"
                  rows={3}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Image Source</FormLabel>
                <Input
                  value={formData.src}
                  onChange={handleInputChange('src')}
                  placeholder="/art/image.png or full URL"
                />
              </FormControl>

              <FormControl>
                <FormLabel>External Link (optional)</FormLabel>
                <Input
                  value={formData.href}
                  onChange={handleInputChange('href')}
                  placeholder="https://external-link.com"
                />
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel mb={0}>Featured</FormLabel>
                <Switch
                  isChecked={formData.featured}
                  onChange={handleSwitchChange('featured')}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              colorScheme="blue"
              isLoading={loading}
              loadingText={artPiece ? 'Updating...' : 'Creating...'}
            >
              {artPiece ? 'Update' : 'Create'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}