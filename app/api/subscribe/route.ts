import mailchimp from '@mailchimp/mailchimp_marketing'
import { NextResponse } from 'next/server'

// Initialize Mailchimp with console logs for debugging
console.log('Initializing Mailchimp with:', {
  server: process.env.MAILCHIMP_API_SERVER,
  audienceId: process.env.MAILCHIMP_AUDIENCE_ID,
  hasApiKey: !!process.env.MAILCHIMP_API_KEY
})

type MailchimpError = {
  response: {
    body: {
      detail: string;
    };
  };
};

export async function POST(request: Request) {
  // Check for required environment variables
  if (!process.env.MAILCHIMP_API_KEY) {
    return NextResponse.json(
      { error: 'Mailchimp API key is not configured' },
      { status: 500 }
    )
  }

  if (!process.env.MAILCHIMP_API_SERVER) {
    return NextResponse.json(
      { error: 'Mailchimp API server is not configured' },
      { status: 500 }
    )
  }

  if (!process.env.MAILCHIMP_AUDIENCE_ID) {
    return NextResponse.json(
      { error: 'Mailchimp audience ID is not configured' },
      { status: 500 }
    )
  }

  // Configure Mailchimp only when the route is called
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY as string,
    server: process.env.MAILCHIMP_API_SERVER as string,
  })

  try {
    const { email } = await request.json()

    // Test connection
    const ping = await mailchimp.ping.get()
    console.log('Mailchimp connection:', ping.health_status)

    // Add member to list
    await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID as string,
      {
        email_address: email,
        status: 'subscribed',
      }
    )

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing!'
    })

  } catch (error: unknown) {
    const mailchimpError = error as MailchimpError
    if (mailchimpError.response?.body?.detail) {
      return NextResponse.json(
        { error: mailchimpError.response.body.detail },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
} 