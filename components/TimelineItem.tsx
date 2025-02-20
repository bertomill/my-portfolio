'use client'

import {
  Box,
  VStack,
  HStack,
  Text,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

interface TimelineItemProps {
  title: string
  company: string
  period: string
  achievements: string[]
}

export const TimelineItem = ({ title, company, period, achievements }: TimelineItemProps) => {
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const bgColor = useColorModeValue('white', 'gray.800')
  const titleColor = useColorModeValue('gray.900', 'white')
  const textColor = useColorModeValue('gray.600', 'gray.300')

  return (
    <Box
      w="full"
      borderLeft="2px"
      borderColor={borderColor}
      pl={6}
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        left: '-4px',
        top: '0',
        width: '6px',
        height: '6px',
        borderRadius: 'full',
        bg: useColorModeValue('green.500', 'green.200'),
      }}
    >
      <Box
        bg={bgColor}
        p={6}
        borderRadius="lg"
        boxShadow="sm"
        border="1px"
        borderColor={borderColor}
      >
        <VStack align="start" spacing={3}>
          <HStack justify="space-between" w="full">
            <Text fontSize="xl" fontWeight="bold" color={titleColor}>
              {title}
            </Text>
            <Text fontSize="sm" color={textColor}>
              {period}
            </Text>
          </HStack>
          
          <Text fontSize="md" fontWeight="medium" color={titleColor}>
            {company}
          </Text>

          <List spacing={2}>
            {achievements.map((achievement, index) => (
              <ListItem 
                key={index} 
                display="flex" 
                alignItems="flex-start"
                color={textColor}
              >
                <ListIcon 
                  as={ChevronRightIcon} 
                  color={useColorModeValue('green.500', 'green.200')} 
                  mt={1}
                />
                <Text fontSize="md">{achievement}</Text>
              </ListItem>
            ))}
          </List>
        </VStack>
      </Box>
    </Box>
  )
} 