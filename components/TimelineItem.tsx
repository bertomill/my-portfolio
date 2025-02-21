'use client'

import {
  Box,
  VStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

interface TimelineItemProps {
  title: string
  company: string
  date: string
  description: string
}

const TimelineItem = ({ title, company, date, description }: TimelineItemProps) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.800', 'gray.100')

  return (
    <Box
      w="full"
      p={6}
      bg={bgColor}
      borderRadius="xl"
      borderWidth="1px"
      borderColor={borderColor}
    >
      <VStack align="start" spacing={2}>
        <Text fontWeight="bold" fontSize="lg" color={textColor}>
          {title}
        </Text>
        <Text color={textColor}>
          {company}
        </Text>
        <Text fontSize="sm" color="gray.500">
          {date}
        </Text>
        <Text color={textColor}>
          {description}
        </Text>
      </VStack>
    </Box>
  )
}

export default TimelineItem 