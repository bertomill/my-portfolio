declare module '@mailchimp/mailchimp_marketing' {
  interface MailchimpResponse {
    id: string;
    email_address: string;
    status: string;
    merge_fields: Record<string, unknown>;
    tags: string[];
    timestamp_signup: string;
    ip_signup: string;
    timestamp_opt: string;
    ip_opt: string;
    member_rating: number;
    last_changed: string;
    language: string;
    vip: boolean;
    email_client: string;
    location: {
      latitude: number;
      longitude: number;
      gmtoff: number;
      dstoff: number;
      country_code: string;
      timezone: string;
    };
    source: string;
    tags_count: number;
    list_id: string;
  }

  interface MailchimpClient {
    setConfig: (config: { apiKey: string; server: string }) => void;
    ping: {
      get: () => Promise<{ health_status: string }>;
    };
    lists: {
      addListMember: (
        listId: string,
        data: { email_address: string; status: string }
      ) => Promise<MailchimpResponse>;
    };
  }

  const mailchimp: MailchimpClient;
  export default mailchimp;
} 