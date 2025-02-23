'use client'

import {
  Container,
  Heading,
  Text,
  VStack,
  Box,
  SimpleGrid,
  Tag,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import TimelineItem from '@/components/TimelineItem'

const MotionBox = motion(Box)

export default function About() {
  const textColor = useColorModeValue('gray.100', 'gray.100')
  const sectionBg = useColorModeValue('rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.05)')
  const tagBg = useColorModeValue('whiteAlpha.200', 'whiteAlpha.200')

  const techStack = {
    'Frontend': ['TypeScript', 'Next.js'],
    'Machine Learning': ['Python', 'PyTorch'],
    'Database': ['PostgreSQL', 'MongoDB', 'Firebase', 'Supabase'],
    'Hosting': ['Vercel', 'AWS'],
    'AI/ML Tools': ['HuggingFace', 'LangChain'],
    'Vector Databases': ['Pinecone', 'ChromaDB']
  }

  return (
    <Container maxW="container.md" px={{ base: 4, md: 8 }}>
      <VStack 
        spacing={8} 
        alignItems="stretch" 
        pt={{ base: 16, md: 40 }} 
        pb={{ base: 16, md: 20 }}
      >
        <Heading 
          as="h1" 
          size={{ base: "xl", md: "2xl" }}
          mb={{ base: 6, md: 8 }} 
          textAlign="center"
        >
          About Me
        </Heading>
        
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          p={{ base: 4, md: 6 }}
          borderRadius="xl"
          bg={sectionBg}
        >
          <VStack spacing={4} align="stretch">
            <Text fontSize={{ base: "md", md: "lg" }} color={textColor}>
              I believe that AI can empower people and businesses to create 10X more value in one-tenth of the time, and I&apos;m on a mission to build applications that help make this happen.
            </Text>
            <Text fontSize={{ base: "md", md: "lg" }} color={textColor}>
              I&apos;m a Toronto-based technology consultant and application developer, combining my business education with technical expertise to deliver impactful solutions.
            </Text>
          </VStack>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Heading as="h2" size={{ base: "lg", md: "xl" }} mb={4}>
            Technology Stack
          </Heading>
          <SimpleGrid 
            columns={{ base: 1, md: 2 }} 
            spacing={6} 
            p={{ base: 4, md: 6 }}
            bg={sectionBg}
            borderRadius="xl"
          >
            {Object.entries(techStack).map(([category, technologies]) => (
              <Box key={category}>
                <Text fontSize="md" fontWeight="bold" mb={2} color={textColor}>
                  {category}
                </Text>
                <Box display="flex" flexWrap="wrap" gap={2}>
                  {technologies.map(tech => (
                    <Tag 
                      key={tech} 
                      bg={tagBg}
                      color="white"
                      size={{ base: "sm", md: "md" }}
                      borderRadius="full"
                    >
                      {tech}
                    </Tag>
                  ))}
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Heading as="h2" size={{ base: "lg", md: "xl" }} mb={4}>
            Career Experience
          </Heading>
          <VStack 
            spacing={4} 
            p={{ base: 4, md: 6 }}
            bg={sectionBg}
            borderRadius="xl"
          >
            <TimelineItem 
              title="Technology Consultant"
              company="CIBC"
              date="2023 - Present"
              description="Working on technology consulting projects to drive digital transformation initiatives."
            />
            <TimelineItem 
              title="Application Developer"
              company="Scelta Design & Build"
              date="2022 - 2023"
              description="Developed custom applications and digital solutions."
            />
            <TimelineItem 
              title="Videographer & Content Manager"
              company="Sideline Hustle"
              date="2021 - 2022"
              description="Managed content creation and digital media strategy."
            />
          </VStack>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Heading as="h2" size={{ base: "lg", md: "xl" }} mb={4}>
            Education
          </Heading>
          <VStack 
            spacing={4}
            p={{ base: 4, md: 6 }}
            bg={sectionBg}
            borderRadius="xl"
          >
            <TimelineItem 
              title="Master of Digital Management"
              company="Ivey Business School"
              date="2022 - 2023"
              description="Focused on digital transformation and technology management."
            />
            <TimelineItem 
              title="Bachelor's in Legal Studies"
              company="Western University"
              date="2017 - 2021"
              description="Foundation in legal principles and analytical thinking."
            />
          </VStack>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          p={{ base: 4, md: 6 }}
          bg={sectionBg}
          borderRadius="xl"
        >
          <Heading as="h2" size={{ base: "lg", md: "xl" }} mb={4}>
            Beyond Work
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} color={textColor}>
            Outside of technology, I&apos;m an active sports enthusiast, enjoying squash, football, running, yoga, golf, and biking. 
            I believe in maintaining a balanced lifestyle that combines professional growth with physical activity and continuous learning.
          </Text>
        </MotionBox>
      </VStack>
    </Container>
  )
} 