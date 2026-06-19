import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { BlogPost } from '@/lib/models/BlogPost';
import { User } from '@/lib/models/User';
import { verifyAccessToken, sanitizeHtml, getCorsHeaders } from '@/lib/security';

export const revalidate = 3600; // Cache API responses for 1 hour

// Helper to check JWT auth in API routes
function getAuthenticatedUser(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  return verifyAccessToken(token);
}

// Helper to generate a URL-friendly slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove non-alphanumeric, spaces, or hyphens
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens
}

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
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    // Check if the requester is an admin/author (to allow draft viewing)
    const user = getAuthenticatedUser(request);
    
    // Public requests can ONLY see Published posts
    // Logged-in admin/author can see Drafts too if requested, or filter by status
    let query: Record<string, any> = { status: 'Published' };
    
    if (user) {
      const requestedStatus = searchParams.get('status');
      if (requestedStatus === 'all') {
        query = {}; // No status filter for admin
      } else if (requestedStatus === 'Draft' || requestedStatus === 'Published') {
        query = { status: requestedStatus };
      } else {
        query = {}; // Default admin view is all
      }
    }

    const posts = await BlogPost.find(query)
      .populate('author', 'username role')
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalCount = await BlogPost.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json(
      {
        posts,
        pagination: {
          currentPage: page,
          limit,
          totalCount,
          totalPages,
        },
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error('GET Blogs API Error:', error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message || error}` },
      { status: 500, headers: corsHeaders }
    );
  }
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

    await connectToDatabase();

    // 2. Parse request payload
    const body = await request.json();
    const { title, content, summary, status, featuredImage } = body;

    // 3. Validate inputs
    if (!title || !content || !summary || !featuredImage) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content, summary, and featuredImage are required' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (summary.length > 200) {
      return NextResponse.json(
        { error: 'Summary must be 200 characters or less' },
        { status: 400, headers: corsHeaders }
      );
    }

    // 4. Generate unique slug
    let slug = generateSlug(title);
    
    // Check if slug already exists, if so append unique timestamp/hash
    const existingPost = await BlogPost.findOne({ slug });
    if (existingPost) {
      slug = `${slug}-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    // 5. Sanitize HTML content to prevent XSS
    const sanitizedContent = sanitizeHtml(content);

    // 6. Create blog post
    const newPost = await BlogPost.create({
      title,
      slug,
      content: sanitizedContent,
      summary,
      status: status === 'Published' ? 'Published' : 'Draft',
      featuredImage,
      author: user.userId,
    });

    const populatedPost = await BlogPost.findById(newPost._id).populate('author', 'username role');

    return NextResponse.json(
      {
        message: 'Blog post created successfully',
        post: populatedPost,
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error('POST Blogs API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500, headers: corsHeaders }
    );
  }
}
