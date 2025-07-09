import { db } from '../lib/db'
import { projects } from '../lib/schema'

const projectData = [
  {
    title: "TopGradeResumeAssistant",
    description: "An AI-powered resume optimization tool that helps job seekers create compelling resumes tailored to specific job descriptions.",
    tags: ["AI", "Resume", "Job Search", "NLP", "Career"],
    logoSrc: "/topgrade.png",
    logoAlt: "TopGradeResumeAssistant Logo",
    projectUrl: "https://topgraderesumeassistant.com",
    date: "July 2025",
    imageSrc: "/topgrade.png",
    featured: true,
    sortOrder: 1
  },
  {
    title: "dollar$sense | City Budget AI Assistant",
    description: "Award-winning AI-powered application that allows citizens of Toronto to explore and understand the city budget through natural language queries. Winner at City of Windsor hackathon, featured on their official website for innovative civic technology.",
    tags: ["AI", "Civic Tech", "Natural Language", "Government", "Award Winner"],
    logoSrc: "/dollarsense-logo.svg",
    logoAlt: "dollar$sense Logo",
    projectUrl: "https://dollarsense.vercel.app/",
    date: "July 2024",
    imageSrc: "/dollar$ense.png",
    featured: true,
    sortOrder: 2
  },
  {
    title: "Adversarial Vulnerabilities in AI Judge Models | Martian x Apart Research Study",
    description: "Published research examining security vulnerabilities in AI judge models - critical components used to detect problematic behavior in LLM systems. Conducted 3,339 evaluations across 10 adversarial techniques, discovering a 33.7% overall success rate in manipulating judge evaluations, with 'Sentiment Flooding' proving most effective at 62%.",
    tags: ["AI Safety", "Security", "Research", "LLM", "Interpretability", "Apart Research"],
    logoSrc: "/martinan.png",
    logoAlt: "Martian x Apart Research Study",
    projectUrl: "https://apartresearch.com/project/adversarial-vulnerabilities-in-ai-judge-models-martian-x-apart-research-study-erjl",
    date: "June 2, 2025",
    imageSrc: "/martinan.png",
    featured: true,
    sortOrder: 3
  },
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
    sortOrder: 4
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
    sortOrder: 5
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
    sortOrder: 6
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
    sortOrder: 7
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
    sortOrder: 8
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