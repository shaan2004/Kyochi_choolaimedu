'use client';

export interface WhatsAppBookingData {
  name: string;
  phone: string;
  service: string;
  message?: string;
}

export function useWhatsApp() {
  const sendWhatsAppMessage = (data: WhatsAppBookingData) => {
    const prefix = 'Hello Kyochi Choolaimedu! 🌿\n\nI\'d like to book an appointment.\n\n';
    const fields = [
      `*Name:* ${data.name}`,
      `*Phone:* ${data.phone}`,
      `*Service:* ${data.service}`,
      data.message ? `*Message:* ${data.message}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    const suffix = '\n\nPlease confirm my booking. Thank you!';
    const fullText = `${prefix}${fields}${suffix}`;
    const encodedText = encodeURIComponent(fullText);
    
    // WhatsApp direct deep link to Kyochi Choolaimedu Front Desk
    const whatsappUrl = `https://wa.me/919566001066?text=${encodedText}`;
    
    if (typeof window !== 'undefined') {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return { sendWhatsAppMessage };
}
