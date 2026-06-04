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
  const { register, handleSubmit, formState: { errors } } = useForm<WhatsAppBookingData>({
    defaultValues: {
      name: '',
      phone: '',
      service: defaultService,
      message: '',
    },
  });

  const { sendWhatsAppMessage } = useWhatsApp();

  const onSubmit = (data: WhatsAppBookingData) => {
    sendWhatsAppMessage(data);
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-4", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${idPrefix}name`} className="block text-xs font-semibold uppercase tracking-widest text-text-primary/70 mb-2">
            Full Name
          </label>
          <input
            id={`${idPrefix}name`}
            type="text"
            placeholder="Your full name"
            {...register('name', {
              required: 'Name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
            })}
            suppressHydrationWarning
            className={cn(
              "w-full px-4.5 py-3.5 bg-[#1a1a1a] border border-gold-border/60 text-text-primary rounded-xl",
              "placeholder-text-primary/25 transition-all duration-300 text-sm md:text-base",
              "focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15"
            )}
          />
          {errors.name && (
            <p className="text-red-400 text-xs mt-1.5 font-medium">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor={`${idPrefix}phone`} className="block text-xs font-semibold uppercase tracking-widest text-text-primary/70 mb-2">
            Phone Number
          </label>
          <input
            id={`${idPrefix}phone`}
            type="tel"
            placeholder="9876543210"
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: 'Please enter a valid 10-digit Indian mobile number',
              },
            })}
            suppressHydrationWarning
            className={cn(
              "w-full px-4.5 py-3.5 bg-[#1a1a1a] border border-gold-border/60 text-text-primary rounded-xl",
              "placeholder-text-primary/25 transition-all duration-300 text-sm md:text-base",
              "focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15"
            )}
          />
          {errors.phone && (
            <p className="text-red-400 text-xs mt-1.5 font-medium">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor={`${idPrefix}service-select`} className="block text-xs font-semibold uppercase tracking-widest text-text-primary/70 mb-2">
          Select Therapy
        </label>
        <select
          id={`${idPrefix}service-select`}
          {...register('service', { required: 'Please select a service' })}
          suppressHydrationWarning
          className={cn(
            "w-full px-4.5 py-3.5 bg-[#1a1a1a] border border-gold-border/60 text-text-primary rounded-xl cursor-pointer",
            "transition-all duration-300 text-sm md:text-base appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23C9A84C%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:18px] bg-[right_1rem_center] bg-no-repeat",
            "focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15"
          )}
        >
          <option value="" disabled className="text-text-primary/20">Choose a therapy...</option>
          {SERVICES.map((service) => (
            <option key={service.id} value={service.title} className="bg-[#111] text-text-primary">
              {service.title} (₹{service.priceInr})
            </option>
          ))}
        </select>
        {errors.service && (
          <p className="text-red-400 text-xs mt-1.5 font-medium">{errors.service.message}</p>
        )}
      </div>

      <div>
        <label htmlFor={`${idPrefix}message`} className="block text-xs font-semibold uppercase tracking-widest text-text-primary/70 mb-2">
          Specific Concerns (Optional)
        </label>
        <textarea
          id={`${idPrefix}message`}
          placeholder="e.g. Plantar Fasciitis, foot fatigue, lower back pain, etc."
          rows={3}
          {...register('message')}
          suppressHydrationWarning
          className={cn(
            "w-full px-4.5 py-3.5 bg-[#1a1a1a] border border-gold-border/60 text-text-primary rounded-xl resize-none",
            "placeholder-text-primary/25 transition-all duration-300 text-sm md:text-base",
            "focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15"
          )}
        />
      </div>

      <GoldButton
        type="submit"
        ariaLabel="Confirm booking and redirect to WhatsApp"
        className="w-full mt-2 py-3.5 flex justify-center items-center gap-2 font-semibold"
      >
        <MessageCircle size={18} className="fill-gold stroke-none text-black" aria-hidden="true" />
        Book on WhatsApp
      </GoldButton>
    </form>
  );
};
