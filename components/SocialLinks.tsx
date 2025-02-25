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

const MotionLink = motion(Link)

interface SocialLinkProps {
  href: string;
  label: string;
  icon: React.ElementType;
}

const SocialLink = ({ href, label, icon }: SocialLinkProps) => {
  const hoverColor = useColorModeValue('blue.500', 'blue.300')
  
  return (
    <Tooltip label={label} hasArrow placement="top">
      <MotionLink
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        transition="all 0.3s"
        _hover={{ color: hoverColor, transform: 'translateY(-2px)' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon as={icon} boxSize={{ base: 5, md: 6 }} />
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