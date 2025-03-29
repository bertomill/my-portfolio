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
  const bg = useColorModeValue('white', 'rgba(0, 0, 0, 0.2)')
  const textColor = useColorModeValue('black', 'gray.100')
  const companyColor = useColorModeValue('black', 'gray.200')
  const dateColor = useColorModeValue('gray.700', 'gray.400')
  const borderColor = useColorModeValue('gray.200', 'transparent')

  return (
    <Box
      w="full"
      bg={bg}
      p={4}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      transition="all 0.2s"
      boxShadow="sm"
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: 'md',
      }}
    >
      <VStack align="stretch" spacing={2}>
        <Text fontSize="xl" fontWeight="bold" color={textColor}>
          {title}
        </Text>
        <Text fontSize="md" fontWeight="medium" color={companyColor}>
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