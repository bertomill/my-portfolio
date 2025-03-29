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
  const textColor = useColorModeValue('black', 'gray.100')
  const sectionBg = useColorModeValue('gray.50', 'rgba(255, 255, 255, 0.05)')
  const tagBg = useColorModeValue('gray.200', 'whiteAlpha.200')

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
          color="black"
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
          boxShadow="sm"
        >
          <VStack spacing={4} align="stretch">
            <Text fontSize={{ base: "md", md: "lg" }} color={textColor} fontWeight="medium">
              Experienced AI application developer who is passionate about building impactful products in fast-paced, innovative environments. My experience includes building applications for large enterprises such as CIBC and SickKids Hospital, as well as contributing to the growth of various startups.
            </Text>
            <Text fontSize={{ base: "md", md: "lg" }} color={textColor} fontWeight="medium">
              With a background in digital management, I specialize in leveraging design thinking and user journey mapping to craft impactful strategies and products. I stay at the forefront of emerging technologies, ensuring my solutions are innovative, intuitive, and customer-focused.
            </Text>
            <Text fontSize={{ base: "md", md: "lg" }} color={textColor} fontWeight="medium">
              Beyond work, I enjoy building businesses and creating enduring brands that resonate with people. Movement has always been a key part of my life, whether it&apos;s running, lifting weights, or playing sports with friends.
            </Text>
            <Text fontSize={{ base: "md", md: "lg" }} color={textColor} fontWeight="medium">
              I&apos;m passionate about designing products people love, and I&apos;m driven by opportunities to create meaningful, lasting impact through my work.
            </Text>
          </VStack>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Heading as="h2" size={{ base: "lg", md: "xl" }} mb={4} color="black">
            Technology Stack
          </Heading>
          <SimpleGrid 
            columns={{ base: 1, md: 2 }} 
            spacing={6} 
            p={{ base: 4, md: 6 }}
            bg={sectionBg}
            borderRadius="xl"
            boxShadow="sm"
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
                      color="black"
                      size={{ base: "sm", md: "md" }}
                      borderRadius="full"
                      fontWeight="medium"
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
          <Heading as="h2" size={{ base: "lg", md: "xl" }} mb={4} color="black">
            Career Experience
          </Heading>
          <VStack 
            spacing={4} 
            p={{ base: 4, md: 6 }}
            bg={sectionBg}
            borderRadius="xl"
            boxShadow="sm"
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
          <Heading as="h2" size={{ base: "lg", md: "xl" }} mb={4} color="black">
            Education
          </Heading>
          <VStack 
            spacing={4}
            p={{ base: 4, md: 6 }}
            bg={sectionBg}
            borderRadius="xl"
            boxShadow="sm"
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
          boxShadow="sm"
        >
          <Heading as="h2" size={{ base: "lg", md: "xl" }} mb={4} color="black">
            Beyond Work
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} color={textColor} fontWeight="medium">
            Outside of technology, I enjoy building businesses and creating enduring brands that resonate with people. Movement has always been a key part of my life, whether it&apos;s running, lifting weights, or playing sports with friends.
          </Text>
        </MotionBox>
      </VStack>
    </Container>
  )
} 