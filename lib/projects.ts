import { Project } from './schema'

export async function getProjects(featured?: boolean): Promise<Project[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const url = featured 
    ? `${baseUrl}/api/projects?featured=true`
    : `${baseUrl}/api/projects`

  try {
    const response = await fetch(url, {
      cache: 'no-store', // Always fetch fresh data
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch projects')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return getProjects(true)
}

export async function getAllProjects(): Promise<Project[]> {
  return getProjects()
} 