import { NextResponse } from 'next/server';
import { getCorsHeaders } from '@/lib/security';

export async function OPTIONS(request: Request) {
  const origin = request.headers.get('origin');
  return new NextResponse(null, {
    status: 200,
    headers: getCorsHeaders(origin),
  });
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  // Set the cookie expiry to 0 to clear it instantly
  const cookieHeader = [
    'kyochi_refresh_token=;',
    'Max-Age=0',
    'Path=/',
    'HttpOnly',
    'SameSite=Strict',
    process.env.NODE_ENV === 'production' ? 'Secure' : '',
  ].filter(Boolean).join('; ');

  const responseHeaders = {
    ...corsHeaders,
    'Set-Cookie': cookieHeader,
  };

  return NextResponse.json(
    { message: 'Logout successful' },
    { status: 200, headers: responseHeaders }
  );
}
