import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { BlogPost } from '@/lib/models/BlogPost';
import { User } from '@/lib/models/User';
import { verifyAccessToken, sanitizeHtml, getCorsHeaders } from '@/lib/security';

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

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const origin = request.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);
  const { slug } = await context.params;

  try {
    await connectToDatabase();

    const post = await BlogPost.findOne({ slug }).populate('author', 'username role');
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404, headers: corsHeaders }
      );
    }

    // Security check: If it's a Draft, only logged-in user can view it
    if (post.status === 'Draft') {
      const user = getAuthenticatedUser(request);
      if (!user) {
        return NextResponse.json(
          { error: 'Blog post not found' },
          { status: 404, headers: corsHeaders }
        );
      }
    }

    return NextResponse.json(post, { status: 200, headers: corsHeaders });
  } catch (error: any) {
    console.error('GET Single Blog API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const origin = request.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);
  const { slug } = await context.params;

  try {
    const user = getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized. Valid access token required.' },
        { status: 401, headers: corsHeaders }
      );
    }

    await connectToDatabase();

    const post = await BlogPost.findOne({ slug });
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404, headers: corsHeaders }
      );
    }

    // RBAC: Only Admin or the Author who created the post can edit it
    if (user.role !== 'Admin' && post.author.toString() !== user.userId) {
      return NextResponse.json(
        { error: 'Forbidden. You do not have permission to edit this post.' },
        { status: 403, headers: corsHeaders }
      );
    }

    const body = await request.json();
    const { title, content, summary, status, featuredImage } = body;

    // Validate inputs
    if (summary && summary.length > 200) {
      return NextResponse.json(
        { error: 'Summary must be 200 characters or less' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Update fields
    if (title) post.title = title;
    if (summary) post.summary = summary;
    if (featuredImage) post.featuredImage = featuredImage;
    if (status) post.status = status;
    if (content) {
      post.content = sanitizeHtml(content);
    }

    await post.save();

    const updatedPost = await BlogPost.findById(post._id).populate('author', 'username role');

    return NextResponse.json(
      {
        message: 'Blog post updated successfully',
        post: updatedPost,
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error('PUT Blog API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const origin = request.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);
  const { slug } = await context.params;

  try {
    const user = getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized. Valid access token required.' },
        { status: 401, headers: corsHeaders }
      );
    }

    await connectToDatabase();

    const post = await BlogPost.findOne({ slug });
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404, headers: corsHeaders }
      );
    }

    // RBAC: Only Admin or the Author who created the post can delete it
    if (user.role !== 'Admin' && post.author.toString() !== user.userId) {
      return NextResponse.json(
        { error: 'Forbidden. You do not have permission to delete this post.' },
        { status: 403, headers: corsHeaders }
      );
    }

    await BlogPost.deleteOne({ _id: post._id });

    return NextResponse.json(
      { message: 'Blog post deleted successfully' },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error('DELETE Blog API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500, headers: corsHeaders }
    );
  }
}
