'use client'

import {
  HStack,
  Link,
  Icon,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaLinkedin, FaGithub, FaYoutube, FaInstagram, FaTwitter } from 'react-icons/fa'
import { analytics } from '@/lib/analytics'

const MotionLink = motion(Link)

interface SocialLinkProps {
  href: string;
  label: string;
  icon: React.ElementType;
}

function SocialLink({ href, label, icon }: SocialLinkProps) {
  const handleClick = () => {
    analytics.socialClick(label)
    analytics.externalLinkClick(href, `Social Media: ${label}`)
  }

  return (
    <Tooltip label={label} hasArrow>
      <MotionLink
        href={href}
        isExternal
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        onClick={handleClick}
      >
        <Icon 
          as={icon} 
          boxSize={{ base: 5, md: 6 }} 
          color={useColorModeValue('gray.600', 'gray.400')}
          _hover={{ 
            color: useColorModeValue('blue.500', 'blue.300'),
            transform: 'translateY(-2px)'
          }}
          transition="all 0.2s"
        />
      </MotionLink>
    </Tooltip>
  )
}

export default function SocialLinks() {
  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/bertomill/",
      label: "LinkedIn",
      icon: FaLinkedin,
    },
    {
      href: "https://github.com/bertomill",
      label: "GitHub",
      icon: FaGithub,
    },
    {
      href: "https://www.youtube.com/@BertoVMill",
      label: "YouTube",
      icon: FaYoutube,
    },
    {
      href: "https://www.instagram.com/bertomill/?hl=en",
      label: "Instagram",
      icon: FaInstagram,
    },
    {
      href: "https://x.com/mill_berto",
      label: "X (Twitter)",
      icon: FaTwitter,
    },
  ]

  return (
    <HStack spacing={{ base: 4, md: 6 }} justify="center">
      {socialLinks.map((link) => (
        <SocialLink
          key={link.label}
          href={link.href}
          label={link.label}
          icon={link.icon}
        />
      ))}
    </HStack>
  )
} 