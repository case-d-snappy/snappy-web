const createRandomId = (): string => `${new Date().getTime()}_${Math.floor(Math.random() * 100000000)}`;

const gTag = {
  setUserData({ userId, phone = '', email = '' }: { userId: string; phone?: string; email?: string }) {
    window.gtag('set', 'user_data', { user_id: userId, phone_number: phone, email });
  },
  sendGaEvent(action: string, params?: Record<string, string | number | boolean | null>) {
    window.gtag('event', action, {
      ...params,
    });
  },
};

export const meataPixel = {
  setId(id: string) {
    window.fbq?.('init', '1728593368073487', {
      external_id: id,
    });
  },
  sendStandardEvent({
    action,
    params,
  }: {
    action: string;
    params: Record<string, string | number | boolean | string[] | number[]>;
  }) {
    const eventID = createRandomId();
    window.fbq?.('track', action, params, { eventID });
  },
  sendCustomEvent(action: string) {
    const eventID = createRandomId();
    window.fbq?.(
      'trackCustom',
      action,
      {
        action,
        content_name: action,
      },
      { eventID }
    );
  },
};

export const analyticsEvent = {
  setUser(id: string, { phone = '', email = '' }: { phone?: string; email?: string }) {
    gTag.setUserData({ userId: id, phone, email });
    meataPixel.setId(id);
  },
  viewSection(section: string) {
    gTag.sendGaEvent(`view_section_${section}`);
  },
  clickPreorderButton(position: 'top' | 'bottom') {
    gTag.sendGaEvent(`click_preorder_button`, { position });
  },
  submitPreorderForm(contactType: 'phone' | 'email', allowMarketing: boolean) {
    gTag.sendGaEvent(`submit_preorder_form`, {
      contact_type: contactType,
      allow_marketing: allowMarketing,
    });
  },
  clickDownloadPlandy() {
    gTag.sendGaEvent(`click_download_plandy`);
  },
};
