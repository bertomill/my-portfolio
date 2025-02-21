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

// Check for required environment variables
if (!process.env.MAILCHIMP_API_KEY) {
  throw new Error('MAILCHIMP_API_KEY is required')
}

if (!process.env.MAILCHIMP_API_SERVER) {
  throw new Error('MAILCHIMP_API_SERVER is required')
}

if (!process.env.MAILCHIMP_AUDIENCE_ID) {
  throw new Error('MAILCHIMP_AUDIENCE_ID is required')
}

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY as string,
  server: process.env.MAILCHIMP_API_SERVER as string,
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
      process.env.MAILCHIMP_AUDIENCE_ID as string,
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