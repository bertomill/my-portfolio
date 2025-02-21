declare module '@mailchimp/mailchimp_marketing' {
  interface MailchimpClient {
    setConfig: (config: { apiKey: string; server: string }) => void;
    ping: {
      get: () => Promise<{ health_status: string }>;
    };
    lists: {
      addListMember: (
        listId: string,
        data: { email_address: string; status: string }
      ) => Promise<any>;
    };
  }

  const mailchimp: MailchimpClient;
  export default mailchimp;
} 