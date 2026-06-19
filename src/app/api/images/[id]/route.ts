import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Image } from '@/lib/models/Image';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    if (!id) {
      return new NextResponse('Image ID required', { status: 400 });
    }

    const image = await Image.findById(id);

    if (!image) {
      return new NextResponse('Image not found', { status: 404 });
    }

    return new NextResponse(new Uint8Array(image.data), {
      status: 200,
      headers: {
        'Content-Type': image.contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
