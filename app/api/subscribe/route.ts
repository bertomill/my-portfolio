import mailchimp from '@mailchimp/mailchimp_marketing'
import { NextResponse } from 'next/server'

// Initialize Mailchimp with console logs for debugging
console.log('Initializing Mailchimp with:', {
  server: process.env.MAILCHIMP_API_SERVER,
  audienceId: process.env.MAILCHIMP_AUDIENCE_ID,
  hasApiKey: !!process.env.MAILCHIMP_API_KEY
})

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER,
})

export async function POST(request: Request) {
  try {
    // Log the incoming request
    const { email } = await request.json()
    console.log('Attempting to subscribe:', email)

    // Test connection
    const ping = await mailchimp.ping.get()
    console.log('Mailchimp connection:', ping.health_status)

    // Add member to list
    const response = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID!,
      {
        email_address: email,
        status: 'subscribed',
      }
    )

    console.log('Successfully added contact:', response.id)

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing!'
    })

  } catch (error: any) {
    console.error('Subscription error:', error?.response?.body || error)
    return NextResponse.json(
      { 
        error: error?.response?.body?.detail || 'Failed to subscribe. Please try again.' 
      },
      { status: error?.response?.body ? 400 : 500 }
    )
  }
} 