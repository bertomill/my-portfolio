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
  useToast,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { Book } from '@/lib/schema'

interface BookModalProps {
  isOpen: boolean
  onClose: () => void
  book: Book | null
  onSave: () => void
}

export default function BookModal({ isOpen, onClose, book, onSave }: BookModalProps) {
  const toast = useToast()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [whatILearned, setWhatILearned] = useState('')
  const [dateRead, setDateRead] = useState('')

  useEffect(() => {
    setTitle(book?.title || '')
    setDescription(book?.description || '')
    setWhatILearned(book?.what_i_learned || '')
    setDateRead(book?.date_read || '')
  }, [book, isOpen])

  const handleSubmit = async () => {
    const payload = {
      title,
      description,
      what_i_learned: whatILearned,
      date_read: dateRead,
    }

    try {
      const method = book ? 'PUT' : 'POST'
      const url = book ? `/api/books/${book.id}` : '/api/books'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        toast({
          title: 'Success',
          description: `Book ${book ? 'updated' : 'added'} successfully`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        onSave()
      } else {
        throw new Error('Failed to save book')
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Could not save book',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{book ? 'Edit Book' : 'Add Book'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={3}>
            <FormLabel>Title</FormLabel>
            <Input value={title} onChange={e => setTitle(e.target.value)} />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Description</FormLabel>
            <Textarea value={description} onChange={e => setDescription(e.target.value)} />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>What I Learned</FormLabel>
            <Textarea value={whatILearned} onChange={e => setWhatILearned(e.target.value)} />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Date Read</FormLabel>
            <Input type="date" value={dateRead} onChange={e => setDateRead(e.target.value)} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            {book ? 'Update' : 'Add'}
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}