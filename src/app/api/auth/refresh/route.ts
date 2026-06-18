import { NextResponse } from 'next/server';
import { verifyRefreshToken, signAccessToken, getCorsHeaders } from '@/lib/security';

export async function OPTIONS(request: Request) {
  const origin = request.headers.get('origin');
  return new NextResponse(null, {
    status: 200,
    headers: getCorsHeaders(origin),
  });
}

export async function GET(request: Request) {
  const origin = request.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  try {
    // 1. Extract refresh token from cookies
    const cookieHeader = request.headers.get('cookie') || '';
    const cookies = Object.fromEntries(
      cookieHeader.split(';').map((c) => {
        const [k, v] = c.trim().split('=');
        return [k, v];
      })
    );
    
    const refreshToken = cookies['kyochi_refresh_token'];

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Refresh token not found' },
        { status: 401, headers: corsHeaders }
      );
    }

    // 2. Verify token
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid or expired refresh token' },
        { status: 401, headers: corsHeaders }
      );
    }

    // 3. Issue new access token
    const newAccessToken = signAccessToken({
      userId: decoded.userId,
      username: decoded.username,
      role: decoded.role,
    });

    return NextResponse.json(
      {
        accessToken: newAccessToken,
        user: {
          username: decoded.username,
          role: decoded.role,
        },
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error('Token Refresh Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500, headers: corsHeaders }
    );
  }
}
