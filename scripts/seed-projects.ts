import { db } from '../lib/db'
import { projects } from '../lib/schema'

const projectData = [
  {
    title: "Daygo.live",
    description: "Journal your thoughts and intentions by leveraging community templates and AI to build your perfect journal prompt.",
    tags: ["Journalling", "Community"],
    logoSrc: "/favicon.svg",
    logoAlt: "Daygo.live Logo",
    projectUrl: "https://www.daygo.live",
    date: "May 2025",
    imageSrc: "/daygo.png",
    featured: true,
    sortOrder: 1
  },
  {
    title: "Tesla Booking",
    description: "An application that allows customers to book a Tesla for a specific time and date, operating out of Toronto, Ontario.",
    tags: ["Booking", "Automotive"],
    logoSrc: "/favicon.svg",
    logoAlt: "Tesla Booking Logo",
    projectUrl: "#",
    date: "April 2025",
    imageSrc: "/tesla-booking.png",
    featured: true,
    sortOrder: 2
  },
  {
    title: "Marble",
    description: "A modern development platform for building better applications faster.",
    tags: ["Development", "Platform"],
    logoSrc: "/marble-logo.svg",
    logoAlt: "Marble Logo",
    projectUrl: "https://www.marble.dev/",
    date: "March 2025",
    imageSrc: "/marble-dev.png",
    featured: true,
    sortOrder: 3
  },
  {
    title: "MarketStep",
    description: "A comprehensive platform for digital marketing analytics and strategy.",
    tags: ["Finance", "Analytics"],
    logoSrc: "/finance-icon.svg",
    logoAlt: "MarketStep Logo",
    projectUrl: "https://marketstep.vercel.app/",
    date: "February 2025",
    imageSrc: "/marketstep.png",
    featured: true,
    sortOrder: 4
  },
  {
    title: "Letter Forge",
    description: "Streamline your newsletter creation process with AI assistance.",
    tags: ["Newsletter", "AI"],
    logoSrc: "/letter-forge-logo.svg",
    logoAlt: "Letter Forge Logo",
    projectUrl: "https://letterpipe.vercel.app/",
    date: "December 2024",
    imageSrc: "/letterforge.png",
    featured: true,
    sortOrder: 5
  }
]

async function seedProjects() {
  try {
    console.log('Seeding projects...')
    
    // Clear existing projects
    await db.delete(projects)
    
    // Insert new projects
    const result = await db.insert(projects).values(projectData).returning()
    
    console.log(`Successfully seeded ${result.length} projects`)
    console.log('Projects seeded:', result.map(p => p.title))
    
    process.exit(0)
  } catch (error) {
    console.error('Error seeding projects:', error)
    process.exit(1)
  }
}

seedProjects() 