import { NextResponse } from 'next/server'
import { parseStringPromise } from 'xml2js'

export interface YouTubeVideo {
  title: string;
  link: string;
  videoId: string;
  publishedDate: string;
  thumbnailUrl: string;
  channelTitle: string;
}

interface YouTubeRSSItem {
  title: [string];
  link: [{
    $: { href: string };
  }];
  published: [string];
  'yt:videoId': [string];
  'media:group': [{
    'media:thumbnail': [{
      $: { url: string };
    }];
  }];
  author: [{
    name: [string];
  }];
}

interface YouTubeRSSFeed {
  feed: {
    entry: YouTubeRSSItem[];
  };
}

export async function GET() {
  try {
    const response = await fetch('https://www.youtube.com/feeds/videos.xml?channel_id=UCeISBs2HpAF6U2ZgTfwh2tA', {
      next: { revalidate: 3600 } // Cache for 1 hour
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch YouTube RSS feed')
    }
    
    const xmlData = await response.text()
    const result = await parseStringPromise(xmlData) as YouTubeRSSFeed
    
    const videos: YouTubeVideo[] = result.feed.entry?.map((item: YouTubeRSSItem) => ({
      title: item.title[0],
      link: item.link[0].$.href,
      videoId: item['yt:videoId'][0],
      publishedDate: item.published[0],
      thumbnailUrl: item['media:group'][0]['media:thumbnail'][0].$.url,
      channelTitle: item.author[0].name[0]
    })) || []

    return NextResponse.json(videos)
  } catch (error) {
    console.error('Error fetching YouTube videos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch YouTube videos' },
      { status: 500 }
    )
  }
} 