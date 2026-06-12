'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { MessageCircle } from 'lucide-react';
import { SERVICES } from '@/lib/data';
import { useWhatsApp, WhatsAppBookingData } from '@/hooks/useWhatsApp';
import { GoldButton } from './GoldButton';
import { cn } from '@/lib/utils';

interface BookingFormProps {
  defaultService?: string;
  onSuccess?: () => void;
  className?: string;
  idPrefix?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  defaultService = '',
  onSuccess,
  className,
  idPrefix = 'booking-',
}) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<WhatsAppBookingData>({
    defaultValues: {
      name: '',
      phone: '',
      service: defaultService,
      message: '',
    },
  });

  const { sendWhatsAppMessage } = useWhatsApp();
  const [submitted, setSubmitted] = React.useState(false);

  const onSubmit = (data: WhatsAppBookingData) => {
    sendWhatsAppMessage(data);
    setSubmitted(true);
    if (onSuccess) {
      onSuccess();
    }
    // Reset confirmation message after 8 seconds
    setTimeout(() => setSubmitted(false), 8000);
  };

  if (submitted) {
    return (
      <div className={cn("flex flex-col items-center justify-center gap-4 py-10 text-center", className)}>
        <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
          <MessageCircle size={28} className="text-emerald-500" />
        </div>
        <h4 className="font-display text-xl font-semibold text-text-primary">Message Sent!</h4>
        <p className="text-sm text-text-primary/70 max-w-xs leading-relaxed">
          Your booking request has been sent via WhatsApp. Our team will confirm your appointment shortly.
        </p>
        <p className="text-xs text-gold font-medium">Please check your WhatsApp for our reply.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-3 md:space-y-4", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        <div>
          <label htmlFor={`${idPrefix}name`} className="block text-[10px] md:text-xs font-semibold uppercase tracking-widest text-text-primary/70 mb-1.5 md:mb-2">
            Full Name
          </label>
          <input
            id={`${idPrefix}name`}
            type="text"
            placeholder="Your full name"
            autoComplete="name"
            {...register('name', {
              required: 'Name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
            })}
            suppressHydrationWarning
            className={cn(
              "w-full px-3.5 py-2.5 md:px-4.5 md:py-3.5 bg-bg-dark border border-gold-border/60 text-text-primary rounded-xl",
              "placeholder-text-primary/25 transition-all duration-300 text-xs md:text-base",
              "focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15"
            )}
          />
          {errors.name && (
            <p className="text-red-400 text-[10px] md:text-xs mt-1.5 font-medium">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor={`${idPrefix}phone`} className="block text-[10px] md:text-xs font-semibold uppercase tracking-widest text-text-primary/70 mb-1.5 md:mb-2">
            Phone Number
          </label>
          <input
            id={`${idPrefix}phone`}
            type="tel"
            placeholder="9876543210"
            autoComplete="tel"
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: 'Please enter a valid 10-digit Indian mobile number',
              },
            })}
            suppressHydrationWarning
            className={cn(
              "w-full px-3.5 py-2.5 md:px-4.5 md:py-3.5 bg-bg-dark border border-gold-border/60 text-text-primary rounded-xl",
              "placeholder-text-primary/25 transition-all duration-300 text-xs md:text-base",
              "focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15"
            )}
          />
          {errors.phone && (
            <p className="text-red-400 text-[10px] md:text-xs mt-1.5 font-medium">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor={`${idPrefix}service-select`} className="block text-[10px] md:text-xs font-semibold uppercase tracking-widest text-text-primary/70 mb-1.5 md:mb-2">
          Select Therapy
        </label>
        <select
          id={`${idPrefix}service-select`}
          {...register('service', { required: 'Please select a service' })}
          suppressHydrationWarning
          className={cn(
            "w-full px-3.5 py-2.5 md:px-4.5 md:py-3.5 bg-bg-dark border border-gold-border/60 text-text-primary rounded-xl cursor-pointer",
            "transition-all duration-300 text-xs md:text-base appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23C9A84C%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:14px_14px] md:bg-[length:18px_18px] bg-[right_0.75rem_center] md:bg-[right_1rem_center] bg-no-repeat",
            "focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15"
          )}
        >
          <option value="" disabled className="text-text-primary/20">Choose a therapy...</option>
          {SERVICES.map((service) => (
            <option key={service.id} value={service.title} className="bg-surface-dark text-text-primary">
              {service.title} (₹{service.priceInr})
            </option>
          ))}
        </select>
        {errors.service && (
          <p className="text-red-400 text-[10px] md:text-xs mt-1.5 font-medium">{errors.service.message}</p>
        )}
      </div>

      <div>
        <label htmlFor={`${idPrefix}message`} className="block text-[10px] md:text-xs font-semibold uppercase tracking-widest text-text-primary/70 mb-1.5 md:mb-2">
          Specific Concerns (Optional)
        </label>
        <textarea
          id={`${idPrefix}message`}
          placeholder="e.g. Plantar Fasciitis, foot fatigue, lower back pain, etc."
          rows={2}
          {...register('message')}
          suppressHydrationWarning
          className={cn(
            "w-full px-3.5 py-2.5 md:px-4.5 md:py-3.5 bg-bg-dark border border-gold-border/60 text-text-primary rounded-xl resize-none",
            "placeholder-text-primary/25 transition-all duration-300 text-xs md:text-base",
            "focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15"
          )}
        />
      </div>

      <GoldButton
        type="submit"
        ariaLabel="Confirm booking and redirect to WhatsApp"
        className="w-full mt-1.5 py-2.5 md:py-3.5 flex justify-center items-center gap-2 font-semibold text-xs md:text-sm"
      >
        <MessageCircle size={16} className="fill-gold stroke-none text-black md:size-[18px]" aria-hidden="true" />
        Book on WhatsApp
      </GoldButton>
    </form>
  );
};
