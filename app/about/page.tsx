'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  useColorModeValue,
} from '@chakra-ui/react'
import { TimelineItem } from '@/components/TimelineItem'

export default function About() {
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const textColor = useColorModeValue('gray.600', 'gray.300')

  return (
    <Container maxW="container.lg" pt={{ base: 20, md: 28 }} pb={20}>
      <VStack spacing={12} align="start">
        {/* Hero Section */}
        <Box w="full">
          <Heading 
            as="h1" 
            fontSize={{ base: '3xl', md: '4xl' }}
            mb={6}
          >
            About Me
          </Heading>
          
          <HStack
            spacing={{ base: 4, md: 10 }}
            align="start"
            direction={{ base: 'column', md: 'row' }}
            display={{ base: 'flex', md: 'flex' }}
          >
            {/* Image Column */}
            <Box 
              flexShrink={0} 
              w={{ base: "full", md: "300px" }}
              mb={{ base: 6, md: 0 }}
            >
              <Image
                src="/profile.png"
                alt="Robert Mill"
                borderRadius="2xl"
                w="full"
                h="auto"
                objectFit="cover"
                shadow="lg"
              />
            </Box>

            {/* Text Column */}
            <VStack spacing={6} align="start">
              <Text fontSize="xl" fontWeight="medium">
                Leveraging AI to create value for individuals and businesses
              </Text>
              <Text color={textColor} fontSize="lg" lineHeight="tall">
                With over 5 years of experience in software development, I've dedicated 
                my career to creating intuitive and impactful applications. My journey 
                in technology began as an independent landscaper in high school, where 
                I discovered the power of digital marketing and web development to grow 
                a business. This early experience sparked my passion for leveraging 
                technology to solve real-world problems.
              </Text>
              <Text color={textColor} fontSize="lg" lineHeight="tall">
                I'm particularly fascinated by the emergence of AI and its potential 
                to revolutionize software development. Working across multiple businesses 
                has shown me how crucial effective data management and organization are 
                for resource planning and execution. I specialize in full-stack development 
                using TypeScript and Next.js for frontend, Firebase/MongoDB for databases, 
                and Python for machine learning workflows.
              </Text>
              <Text color={textColor} fontSize="lg" lineHeight="tall">
                Beyond coding, I maintain a balanced lifestyle through fitness and athletics. 
                As a former competitive football and squash player, I now focus on personal 
                strength, endurance, and flexibility goals. I find inspiration in stories 
                of great heroes overcoming odds, whether in books or movies. When not working, 
                you'll find me exploring new communities, trying local cuisine, and discovering 
                natural landmarks - I believe these experiences fuel creativity and bring fresh 
                perspectives to problem-solving in software development.
              </Text>
            </VStack>
          </HStack>
        </Box>

        {/* Work Experience Section */}
        <Box w="full" pt={16}>
          <Heading 
            as="h2" 
            fontSize={{ base: '2xl', md: '3xl' }}
            mb={8}
          >
            Work Experience
          </Heading>

          <VStack spacing={8} align="start" w="full">
            <TimelineItem
              title="Technology Consultant"
              company="CIBC"
              period="Sept 2023-Present"
              achievements={[
                "Architected and deployed enterprise-grade AI solutions in secure and critical infrastructure, implementing sophisticated RAG systems for document processing while maintaining strict compliance standards",
                "Engineered minimal-dependency microservices architecture optimized for low-resource environments, reducing infrastructure costs by 25% while improving system performance",
                "Productionized state-of-the-art models and techniques, resulting in 40% improvement in processing efficiency"
              ]}
            />

            <TimelineItem
              title="Software Engineer"
              company="Scelta Inc"
              period="Sept 2021-Aug 2023"
              achievements={[
                "Deployed performant client and server-side RAG applications serving 2K+ users, with sub-100ms response times",
                "Developed sophisticated agentic applications using frontier models, improving content discovery efficiency by 40%",
                "Engineered robust, min-dependency solutions using Docker and Kubernetes in resource-constrained environments"
              ]}
            />

            <TimelineItem
              title="Frontend Developer"
              company="John Metras Sports Museum"
              period="Jan 2020-Aug 2021"
              achievements={[
                "Architected and deployed extremely performant client-side applications serving 100K monthly users, achieving sub-50ms render times through sophisticated front-end optimization techniques",
                "Engineered robust, minimal-dependency frontend architecture using vanilla JavaScript, HTML5, and CSS3, ensuring optimal performance in low-resource environments",
                "Collaborated with database architects to implement efficient client-side caching and state management, reducing server load by 40%"
              ]}
            />
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
} 