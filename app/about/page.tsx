'use client'

import {
  Container,
  Heading,
  Text,
  VStack,
  Box,
  SimpleGrid,
  Tag,
  Button,
  AspectRatio,
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import TimelineItem from '@/components/TimelineItem'
import { TracingBeam } from '@/components/ui/tracing-beam'
import { analytics } from '@/lib/analytics'

const MotionBox = motion(Box)

export default function About() {
  const [showVideo, setShowVideo] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Toggle between image and video
  const toggleMedia = () => {
    setShowVideo(prev => {
      const newState = !prev
      // Play video when switching to video mode
      if (newState && videoRef.current) {
        videoRef.current.currentTime = 0
        videoRef.current.play().catch(e => console.error("Video play failed:", e))
        analytics.videoClick('About Page AI Conference Video')
      }
      return newState
    })
  }

  // Handler for when video ends
  const handleVideoEnded = () => {
    setShowVideo(false)
  }

  const techStack = {
    'Frontend': ['TypeScript', 'Next.js'],
    'Machine Learning': ['Python', 'PyTorch'],
    'Database': ['PostgreSQL', 'MongoDB', 'Firebase', 'Supabase'],
    'Hosting': ['Vercel', 'AWS'],
    'AI/ML Tools': ['HuggingFace', 'LangChain'],
    'Vector Databases': ['Pinecone', 'ChromaDB']
  }

  return (
    <Container maxW="container.lg" px={{ base: 4, md: 8 }}>
      <TracingBeam>
        <VStack 
          spacing={8} 
          alignItems="stretch" 
          pt={{ base: 24, md: 32 }} 
          pb={{ base: 16, md: 20 }}
        >
        <Heading 
          as="h1" 
          size={{ base: "xl", md: "2xl" }}
          mb={{ base: 6, md: 8 }} 
          textAlign="center"
          className="architectural-heading"
        >
          About Me
        </Heading>
        
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          p={{ base: 5, md: 6 }}
          borderRadius="6px"
          className="glass-effect"
        >
          <VStack spacing={6} align="stretch">
            {/* Content with video/image */}
            <Box
              display="flex"
              flexDirection={{ base: "column", md: "row" }}
              gap={6}
              alignItems={{ base: "center", md: "flex-start" }}
            >
              {/* Text content */}
              <VStack spacing={4} align="stretch" flex="1">
                <Text fontSize={{ base: "md", md: "lg" }} className="architectural-text" fontWeight="300">
                  I come from a background of innovation design and implementation, when I first discovered ChatGPT in 2022, as many others, I became extremely curious in what AI could do for software development. From then on, my work has been a mixture of AI-software development, and consulting clients on how to integrate AI to solve practical problems for their businesses. My experience includes serving large financial and healthcare enterprises, as well as fast growing startups.
                </Text>
                <Text fontSize={{ base: "md", md: "lg" }} className="architectural-text" fontWeight="300">
                  My mission is to enable businesses to leverage the latest advancements in AI to streamline their businesses processes and provide outstanding value to their customers.
                </Text>
                <Text fontSize={{ base: "md", md: "lg" }} className="architectural-text" fontWeight="300">
                  Beyond working with AI, I am very passionate about healthy eating as a means to a better life, and have developed whiskin.vercel.app, which provides healthy meal ideas and practical tools to plan healthier eating into your day. I am also passionate about developing communities to help people learn and grow together. I am the founder of MakerLounge - a community of makers and entrepreneurs who are passionate about building and innovating.
                </Text>
                <Text fontSize={{ base: "md", md: "lg" }} className="architectural-text" fontWeight="300">
                  I am also passionate about fitness and wellness. Growing up I played all kinds of sports and am currently training for Hyrox competitions around the world. I firmly believe that investing in a robust physical and mental health is the foundation for serving others.
                </Text>
              </VStack>

              {/* Video/Image toggle */}
              <Box 
                position="relative"
                maxW={{ base: "300px", md: "250px" }}
                w="full"
                flexShrink={0}
              >
                <AspectRatio ratio={16/9}>
                  <Box
                    position="relative"
                    borderRadius="xl"
                    overflow="hidden"
                    shadow="lg"
                    w="full"
                    h="full"
                  >
                    <AnimatePresence mode="wait">
                      {showVideo ? (
                        <motion.div
                          key="video"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%"
                          }}
                        >
                          <video
                            ref={videoRef}
                            src="/ai_conf_video.mp4"
                            onEnded={handleVideoEnded}
                            autoPlay
                            muted
                            playsInline
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: "center"
                            }}
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="image"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%"
                          }}
                        >
                          <Image
                            src="/headshot.png"
                            alt="Berto Mill"
                            fill
                            style={{
                              objectFit: "cover",
                              objectPosition: "center"
                            }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Box>
                </AspectRatio>
                
                <Button
                  size="sm"
                  variant="solid"
                  borderRadius="full"
                  position="absolute"
                  bottom="3"
                  right="3"
                  zIndex="1"
                  shadow="md"
                  bg={showVideo ? "blackAlpha.600" : "whiteAlpha.900"}
                  color={showVideo ? "white" : "black"}
                  _hover={{
                    bg: showVideo ? "blackAlpha.700" : "whiteAlpha.800",
                    transform: "scale(1.05)"
                  }}
                  _active={{
                    transform: "scale(0.95)"
                  }}
                  transition="all 0.2s"
                  onClick={toggleMedia}
                  leftIcon={showVideo ? undefined : <Play size={14} />}
                >
                  {showVideo ? "Return" : "AI Video"}
                </Button>
              </Box>
            </Box>
          </VStack>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Heading as="h2" size={{ base: "lg", md: "xl" }} mb={4} className="architectural-heading">
            Technology Stack
          </Heading>
          <SimpleGrid 
            columns={{ base: 1, md: 2 }} 
            spacing={6} 
            p={{ base: 5, md: 6 }}
            className="glass-effect"
            borderRadius="6px"
          >
            {Object.entries(techStack).map(([category, technologies]) => (
              <Box key={category}>
                <Text fontSize="md" fontWeight="500" mb={2} className="architectural-text">
                  {category}
                </Text>
                <Box display="flex" flexWrap="wrap" gap={2}>
                  {technologies.map(tech => (
                    <Tag 
                      key={tech} 
                      bg="rgba(160, 139, 115, 0.1)"
                      color="var(--warm-gray)"
                      size={{ base: "sm", md: "md" }}
                      borderRadius="full"
                      fontWeight="300"
                      border="1px solid rgba(160, 139, 115, 0.2)"
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
          <Heading as="h2" size={{ base: "lg", md: "xl" }} mb={4} className="architectural-heading">
            Career Experience
          </Heading>
          <VStack 
            spacing={4} 
            p={{ base: 5, md: 6 }}
            className="glass-effect"
            borderRadius="6px"
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
          <Heading as="h2" size={{ base: "lg", md: "xl" }} mb={4} className="architectural-heading">
            Education
          </Heading>
          <VStack 
            spacing={4}
            p={{ base: 5, md: 6 }}
            className="glass-effect"
            borderRadius="6px"
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
          p={{ base: 5, md: 6 }}
          className="glass-effect"
          borderRadius="6px"
        >
        </MotionBox>
        </VStack>
      </TracingBeam>
    </Container>
  )
} 
