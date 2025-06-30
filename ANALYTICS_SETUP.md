# 📊 Website Analytics Setup Guide

This project includes comprehensive website analytics using Google Analytics 4 (GA4). Here's how to set it up:

## 🚀 Quick Setup

### 1. Create Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring"
4. Create a new account or use existing one
5. Create a new property specifically for your portfolio website

### 2. Get Your Measurement ID

1. In your GA4 property, go to **Admin** (gear icon)
2. In the Property column, click **Data Streams**
3. Click on your web data stream
4. Copy your **Measurement ID** (starts with `G-`)

### 3. Add Environment Variable

Add this to your `.env.local` file:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-BFVVJJB12Q
```

Replace `G-BFVVJJB12Q` with your actual Measurement ID from step 2.

### 4. For Production Deployment

Add the same environment variable to your hosting platform:

**For Vercel:**
1. Go to your project dashboard
2. Go to **Settings** → **Environment Variables**  
3. Add: `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `Your-Measurement-ID`

**For Netlify:**
1. Go to **Site settings** → **Environment variables**
2. Add: `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `Your-Measurement-ID`

## 📈 What Analytics Are Tracked

### Automatic Tracking
- **Page views** - Every page visit
- **Unique visitors** - Individual user sessions
- **Traffic sources** - Where visitors come from
- **Geographic data** - Countries and cities
- **Device information** - Desktop, mobile, tablet
- **Browser data** - Chrome, Safari, Firefox, etc.

### Custom Event Tracking
- **Project interactions**
  - Project card views (hover)
  - Project clicks
  - External project link clicks

- **YouTube video engagement**
  - Video card views
  - Video clicks
  - YouTube channel visits

- **Blog engagement**
  - Blog post clicks
  - "View All Articles" clicks

- **Navigation tracking**
  - Menu clicks
  - Button clicks (About, Projects)
  - Internal navigation

- **Social media clicks**
  - All social media link clicks

- **Newsletter interactions**
  - Subscription attempts
  - Successful subscriptions

- **Performance metrics**
  - Page load times
  - JavaScript errors

## 🔧 Custom Analytics Functions

The analytics system includes pre-built functions for common actions:

```typescript
import { analytics } from '@/lib/analytics'

// Track project interactions
analytics.projectView('Project Name')
analytics.projectClick('Project Name', 'https://project-url.com')

// Track YouTube videos
analytics.videoClick('Video Title')
analytics.videoView('Video Title')

// Track navigation
analytics.navClick('About Page')

// Track social media
analytics.socialClick('LinkedIn')

// Track newsletter
analytics.newsletterSubscribe('user@email.com')

// Track external links
analytics.externalLinkClick('https://external-site.com', 'Context')

// Track errors
analytics.error('Error message', 'Page Name')
```

## 🔒 Privacy & Compliance

### Features Included:
- **Do Not Track** respect - Analytics disabled if user has DNT enabled
- **Server-side rendering** safe - Only loads on client-side
- **Error handling** - Graceful degradation if analytics fails
- **Development mode** - Test mode in development environment

### GDPR/Privacy Considerations:
- Analytics only load if user hasn't set "Do Not Track"
- No personal data is collected beyond standard GA4 metrics
- You may want to add a cookie consent banner for EU compliance

## 📊 Viewing Your Analytics

### Google Analytics Dashboard:
1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property
3. View data in:
   - **Real-time** - Live visitor data
   - **Reports** - Detailed insights
   - **Explore** - Custom analysis

### Key Reports to Check:
- **Acquisition > Traffic acquisition** - Where visitors come from
- **Engagement > Pages and screens** - Most popular pages
- **Engagement > Events** - Custom event tracking
- **Demographics > Demographics detail** - Visitor locations
- **Tech > Tech details** - Browser and device data

## 🚨 Troubleshooting

### Analytics Not Working?

1. **Check Measurement ID**: Ensure it starts with `G-` and is correct
2. **Check Environment Variable**: Must be `NEXT_PUBLIC_GA_MEASUREMENT_ID`
3. **Check Browser**: Some ad blockers block Google Analytics
4. **Check Console**: Look for errors in browser developer tools
5. **Check Real-time**: View real-time reports in GA4 to test

### Debug Mode

In development, analytics runs in test mode. Check browser console for analytics events.

## 🔧 Advanced Configuration

### Adding New Custom Events

1. Add function to `lib/analytics.ts`:
```typescript
// In analytics object
customEvent: (eventName: string, details?: string) => {
  trackEvent('custom_action', 'Custom Category', `${eventName} - ${details}`)
}
```

2. Use in components:
```typescript
import { analytics } from '@/lib/analytics'

const handleCustomAction = () => {
  analytics.customEvent('Button Click', 'Header CTA')
}
```

### Disabling Analytics

To temporarily disable analytics, remove or comment out the `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment variable.

## 📱 What You'll See

Within 24-48 hours of setup, you'll start seeing:
- Real-time visitor data
- Page view statistics
- Popular content
- Traffic sources
- User behavior patterns
- Geographic visitor data

The analytics will help you understand:
- Which projects get the most attention
- What blog posts are popular
- Where your traffic comes from
- How users navigate your site
- What devices/browsers visitors use

---

**🎉 Congratulations!** Your website now has professional-grade analytics tracking every important user interaction. 