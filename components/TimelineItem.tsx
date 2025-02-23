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
  const bg = useColorModeValue('rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.2)')
  const textColor = useColorModeValue('gray.100', 'gray.100')
  const dateColor = useColorModeValue('gray.400', 'gray.400')

  return (
    <Box
      w="full"
      bg={bg}
      p={4}
      borderRadius="lg"
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-2px)',
        bg: 'rgba(255, 255, 255, 0.05)'
      }}
    >
      <VStack align="stretch" spacing={2}>
        <Text fontSize="xl" fontWeight="bold" color={textColor}>
          {title}
        </Text>
        <Text fontSize="md" color={textColor}>
          {company}
        </Text>
        <Text fontSize="sm" color={dateColor} fontFamily="mono">
          {date}
        </Text>
        <Text fontSize="md" color={textColor} mt={2}>
          {description}
        </Text>
      </VStack>
    </Box>
  )
}

export default TimelineItem 