import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_12345';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret_key_54321';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kyochi.in';

// -------------------------------------------------------------
// JWT Token Utilities
// -------------------------------------------------------------
export interface TokenPayload {
  userId: string;
  username: string;
  role: string;
}

export function signAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
}

export function signRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

export function verifyAccessToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export function verifyRefreshToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

// -------------------------------------------------------------
// XSS Sanitizer Utility
// -------------------------------------------------------------
/**
 * Simple yet highly effective server-side HTML sanitizer to block XSS payloads
 * without requiring heavy browser DOM APIs.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return '';

  let sanitized = html;

  // 1. Remove script tags and their content
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // 2. Remove style tags (to avoid styling injection attacks, though less severe)
  sanitized = sanitized.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

  // 3. Remove iframe tags
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');

  // 4. Remove onload, onerror, onclick and other interactive event handlers
  // Handles onxxxxx="something" or onxxxxx='something' or onxxxxx=something
  sanitized = sanitized.replace(/\s+on\w+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, '');

  // 5. Remove javascript: link protocols
  sanitized = sanitized.replace(/(href|src|action)\s*=\s*(?:'javascript:[^']*'|"javascript:[^"]*"|javascript:[^\s>]+)/gi, '$1="#"');

  // 6. Remove data: text/html URIs
  sanitized = sanitized.replace(/(href|src)\s*=\s*(?:'data:text\/html[^']*'|"data:text\/html[^"]*"|data:text\/html[^\s>]+)/gi, '$1="#"');

  return sanitized;
}

// -------------------------------------------------------------
// In-Memory Rate Limiter Utility
// -------------------------------------------------------------
interface RateLimitRecord {
  timestamps: number[];
}

// Global store to persist across serverless warm requests in development
declare global {
  // eslint-disable-next-line no-var
  var rateLimitStore: Map<string, RateLimitRecord> | undefined;
}

const store = global.rateLimitStore || new Map<string, RateLimitRecord>();
if (!global.rateLimitStore) {
  global.rateLimitStore = store;
}

/**
 * Checks request limits for a given IP.
 * Defaults: Max 5 requests per 1 minute window for login.
 */
export function checkRateLimit(
  ip: string,
  limit = 5,
  windowMs = 60000
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = store.get(ip) || { timestamps: [] };

  // Filter timestamps to only keep ones within the current window
  record.timestamps = record.timestamps.filter((timestamp) => now - timestamp < windowMs);

  if (record.timestamps.length >= limit) {
    store.set(ip, record);
    return {
      allowed: false,
      remaining: 0,
    };
  }

  // Add current timestamp
  record.timestamps.push(now);
  store.set(ip, record);

  return {
    allowed: true,
    remaining: limit - record.timestamps.length,
  };
}

// -------------------------------------------------------------
// CORS Header Builder Utility
// -------------------------------------------------------------
const ALLOWED_ORIGINS = [
  SITE_URL,
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

export function getCorsHeaders(origin: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  };

  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  } else {
    // Default to site url as restriction
    headers['Access-Control-Allow-Origin'] = SITE_URL;
  }

  return headers;
}
