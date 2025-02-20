'use client'

import {
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import TimelineItem from '@/components/TimelineItem'

export default function About() {
  const textColor = useColorModeValue('gray.800', 'gray.100')

  return (
    <Container maxW="container.lg" pt={20} pb={20}>
      <VStack spacing={8} alignItems="start">
        <Heading as="h1" size="2xl">
          About Me
        </Heading>
        
        <Text fontSize="lg" color={textColor}>
          I&apos;m a software developer with a passion for building intuitive and impactful applications.
        </Text>

        <Text fontSize="lg" color={textColor}>
          Throughout my career, I&apos;ve focused on creating solutions that make a real difference
          in people&apos;s lives and businesses.
        </Text>

        <TimelineItem 
          title="Senior Software Engineer"
          company="Tech Company"
          date="2023 - Present"
          description="Leading development of core platform features"
        />
      </VStack>
    </Container>
  )
} 