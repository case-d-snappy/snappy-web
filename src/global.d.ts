export declare global {
  interface Window {
    gtag: (type: 'set' | 'event', action: string, params?: Record<string, unknown>) => void;
    fbq: (
      type: 'track' | 'init' | 'trackCustom',
      action: 'Purchase' | string,
      params: {
        currency?: 'KRW' | 'USD';
        value?: number;
        content_type?: 'product';
        content_name?: string;
        content_ids?: number | string[];
        contents?: [
          {
            id?: string;
            quantity?: number;
            content_name?: string;
          },
        ];
        external_id?: string;
        action?: string;
      },
      eventData?: {
        eventID: string;
      }
    ) => void;
  }
}
