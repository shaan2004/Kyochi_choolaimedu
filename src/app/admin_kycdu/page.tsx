'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AdminPanel } from '@/components/ui/AdminPanel';

export default function AdminKycduPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-bg-dark relative w-full flex flex-col">
      {/* Background glow elements */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Admin Panel wrapper */}
      <div className="relative z-10 w-full flex-grow flex flex-col">
        <AdminPanel onClose={() => router.push('/')} />
      </div>
    </div>
  );
}
