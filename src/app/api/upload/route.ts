import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join, extname } from 'path';
import { verifyAccessToken, getCorsHeaders } from '@/lib/security';

function getAuthenticatedUser(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  return verifyAccessToken(token);
}

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

  try {
    // 1. Authenticate user
    const user = getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized. Valid access token required.' },
        { status: 401, headers: corsHeaders }
      );
    }

    // 2. Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400, headers: corsHeaders }
      );
    }

    // 3. Strict validation: Size must be strictly below 1MB (1,048,576 bytes)
    const MAX_SIZE_BYTES = 1024 * 1024; // 1MB
    if (file.size >= MAX_SIZE_BYTES) {
      const sizeInMb = (file.size / (1024 * 1024)).toFixed(2);
      return NextResponse.json(
        { error: `File size too large (${sizeInMb}MB). Must be strictly under 1MB.` },
        { status: 400, headers: corsHeaders }
      );
    }

    // 4. Mime Type validation: only allow images
    const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type (${file.type}). Only JPG, PNG, and WEBP images are allowed.` },
        { status: 400, headers: corsHeaders }
      );
    }

    // 5. Generate secure, unique filename
    const originalExt = extname(file.name).toLowerCase() || '.jpg';
    // Double check extensions to ensure no script files are uploaded
    const safeExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const finalExt = safeExtensions.includes(originalExt) ? originalExt : '.jpg';
    
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const sanitizedFilename = `blog_${Date.now()}_${randomSuffix}${finalExt}`;

    // 6. Read arrayBuffer and convert to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 7. Write to directory on disk
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    
    // Ensure upload directory exists
    await mkdir(uploadDir, { recursive: true });
    
    const filepath = join(uploadDir, sanitizedFilename);
    await writeFile(filepath, buffer);

    console.log(`[UPLOAD] Image saved successfully to ${filepath}`);

    return NextResponse.json(
      {
        message: 'File uploaded successfully',
        url: `/uploads/${sanitizedFilename}`,
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error('Upload API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500, headers: corsHeaders }
    );
  }
}
