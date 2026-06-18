import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/lib/models/User';
import { seedAdminUser } from '@/lib/seed';
import {
  checkRateLimit,
  signAccessToken,
  signRefreshToken,
  getCorsHeaders,
} from '@/lib/security';

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

  // 1. Rate Limiting based on IP
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor ? forwardedFor.split(',')[0] : '127.0.0.1';
  
  const rateLimit = checkRateLimit(ip, 5, 60000); // 5 attempts per minute
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many login attempts. Please try again in 1 minute.' },
      { status: 429, headers: corsHeaders }
    );
  }

  try {
    // 2. Parse request body
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400, headers: corsHeaders }
      );
    }

    // 3. Connect to database and seed admin if first run
    await connectToDatabase();
    await seedAdminUser();

    // 4. Find user and verify password
    const user = await User.findOne({ username: username.toLowerCase().trim() });
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401, headers: corsHeaders }
      );
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401, headers: corsHeaders }
      );
    }

    // 5. Generate tokens
    const payload = {
      userId: user._id.toString(),
      username: user.username,
      role: user.role,
    };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    // 6. Set refresh token in HTTP-only cookie
    // Cookie expires in 7 days
    const cookieExpirySeconds = 7 * 24 * 60 * 60; 
    const isProduction = process.env.NODE_ENV === 'production';
    
    const cookieHeader = [
      `kyochi_refresh_token=${refreshToken}`,
      `Max-Age=${cookieExpirySeconds}`,
      'Path=/',
      'HttpOnly',
      'SameSite=Strict',
      isProduction ? 'Secure' : '',
    ].filter(Boolean).join('; ');

    const responseHeaders = {
      ...corsHeaders,
      'Set-Cookie': cookieHeader,
    };

    return NextResponse.json(
      {
        message: 'Login successful',
        accessToken,
        user: {
          username: user.username,
          role: user.role,
        },
      },
      { status: 200, headers: responseHeaders }
    );
  } catch (error: any) {
    console.error('Login API Error:', error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message || error}` },
      { status: 500, headers: corsHeaders }
    );
  }
}
