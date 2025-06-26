import { parseStringPromise } from 'xml2js'

export interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  categories: string[];
  creator: string;
  content: string;
  guid: string;
  imageUrl?: string;
}

interface RSSItem {
  title: [string];
  link: [string];
  pubDate: [string];
  category?: [string];
  'dc:creator'?: [string];
  'content:encoded'?: [string];
  guid: [{
    _: string;
  }];
}

interface RSSFeed {
  rss: {
    channel: [{
      item: RSSItem[];
    }];
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch('https://medium.com/@bertomill/feed', { 
      next: { revalidate: 3600 }
    })
    
    const xmlData = await response.text()
    const result = await parseStringPromise(xmlData) as RSSFeed
    const items = result.rss.channel[0].item

    // Helper function to extract first image URL from content
    const extractImageUrl = (content: string): string | undefined => {
      const imgRegex = /<img[^>]+src="([^"]+)"/i
      const match = content.match(imgRegex)
      return match ? match[1] : undefined
    }

    return items.map((item: RSSItem) => {
      const content = item['content:encoded']?.[0].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1') || ''
      
      return {
        title: item.title[0].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1'),
        link: item.link[0],
        pubDate: item.pubDate[0],
        categories: item.category?.map(cat => 
          cat.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1')
        ) || [],
        creator: item['dc:creator']?.[0].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1') || '',
        content,
        guid: item.guid[0]._,
        imageUrl: extractImageUrl(content)
      }
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
} 