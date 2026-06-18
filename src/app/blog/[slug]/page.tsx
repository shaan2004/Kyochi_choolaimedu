import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { connectToDatabase } from '@/lib/db';
import { BlogPost } from '@/lib/models/BlogPost';
import { User } from '@/lib/models/User';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

// -------------------------------------------------------------
// Dynamic SEO Metadata Generation
// -------------------------------------------------------------
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    await connectToDatabase();
    const post = await BlogPost.findOne({ slug, status: 'Published' });
    
    if (!post) {
      return {
        title: 'Blog Post Not Found | Kyochi Art of Healing',
      };
    }

    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kyochi.in';
    const postUrl = `${SITE_URL}/blog/${slug}`;

    return {
      title: `${post.title} | Kyochi Reflexology Blog`,
      description: post.summary,
      alternates: {
        canonical: postUrl,
      },
      openGraph: {
        title: post.title,
        description: post.summary,
        url: postUrl,
        type: 'article',
        publishedTime: post.publishedAt || post.createdAt,
        images: [{ url: post.featuredImage, width: 800, height: 600, alt: post.title }],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.summary,
        images: [post.featuredImage],
      },
    };
  } catch (e) {
    return {
      title: 'Kyochi Reflexology Blog',
    };
  }
}

// Helper to calculate reading time
function calculateReadingTime(text: string): number {
  const wordsPerMinute = 225;
  const noOfWords = text.split(/\s+/).length;
  return Math.ceil(noOfWords / wordsPerMinute);
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;

  await connectToDatabase();
  
  // Find published post
  const post = await BlogPost.findOne({ slug, status: 'Published' })
    .populate('author', 'username role');

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content);
  const formattedDate = post.publishedAt 
    ? new Date(post.publishedAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : new Date(post.createdAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

  return (
    <>
      <Navbar />
      
      <main id="main-content" className="flex-grow pt-28 pb-20 bg-bg-dark">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Back Button */}
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold hover:text-gold-light mb-8 transition-colors duration-300 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transform group-hover:-translate-x-1 transition-transform duration-300"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span>Back to Home</span>
          </Link>

          {/* Article Header */}
          <header className="mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-gold/10 border border-gold-border/20 text-gold text-xs font-semibold tracking-wider uppercase mb-4">
              Wellness & Healing
            </span>
            
            <h1 className="font-display text-3xl md:text-5xl font-bold text-text-primary leading-tight mb-6">
              {post.title}
            </h1>

            {/* Author and Date Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-text-primary/70 border-y border-gold-border/10 py-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center font-bold text-gold border border-gold-border/20">
                  {post.author?.username?.charAt(0).toUpperCase() || 'K'}
                </div>
                <div>
                  <p className="font-semibold text-text-primary text-xs">
                    By {post.author?.username || 'Kyochi Specialist'}
                  </p>
                  <p className="text-[10px] text-text-primary/50 uppercase tracking-widest font-light">
                    {post.author?.role || 'Author'}
                  </p>
                </div>
              </div>
              
              <div className="h-4 w-px bg-gold-border/20 hidden sm:block" />
              
              <div className="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gold"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
                <span>{formattedDate}</span>
              </div>

              <div className="h-4 w-px bg-gold-border/20 hidden sm:block" />

              <div className="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gold"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{readingTime} min read</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative w-full h-[250px] sm:h-[450px] rounded-3xl overflow-hidden mb-12 border border-gold-border/30 shadow-[0_15px_40px_rgba(0,0,0,0.15)]">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-w-4xl) 100vw, 896px"
            />
          </div>

          {/* Article Content */}
          <article className="prose-container">
            <div 
              className="blog-content text-text-primary/90 font-light text-base md:text-lg leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Bottom Divider / CTA */}
          <div className="mt-16 pt-8 border-t border-gold-border/20 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-display text-xl font-bold text-text-primary">
                Experience Kyochi Healing
              </h4>
              <p className="text-sm text-text-primary/70 font-light mt-1">
                Book a professional reflexology session in Chennai today.
              </p>
            </div>
            
            <Link
              href="/#booking"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gold text-black font-semibold text-sm hover:bg-gold-light hover:shadow-[0_4px_20px_rgba(201,168,76,0.3)] transition-all duration-300 cursor-pointer"
            >
              <span>Book Appointment</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>

        </div>
      </main>

      {/* Styled rich text helper css classes embedded within the page context */}
      <style>{`
        #main-content, #main-content * {
          caret-color: #2C1E0F !important;
        }
        .blog-content {
          color: #2C1E0F;
        }
        .blog-content h2 {
          font-family: var(--font-display), Georgia, serif;
          font-size: 1.75rem;
          font-weight: 700;
          color: #2C1E0F;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        @media (min-width: 768px) {
          .blog-content h2 {
            font-size: 2.25rem;
          }
        }
        .blog-content h3 {
          font-family: var(--font-display), Georgia, serif;
          font-size: 1.35rem;
          font-weight: 600;
          color: #2C1E0F;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .blog-content p {
          margin-bottom: 1.5rem;
          font-family: var(--font-body), sans-serif;
          font-weight: 300;
        }
        .blog-content strong {
          font-weight: 700;
          color: #2C1E0F;
        }
        .blog-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
          space-y: 0.5rem;
        }
        .blog-content ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
          space-y: 0.5rem;
        }
        .blog-content li {
          margin-bottom: 0.5rem;
          font-weight: 300;
        }
        .blog-content blockquote {
          border-left: 4px solid #C59B27;
          padding-left: 1.5rem;
          font-style: italic;
          color: #2C1E0F/80;
          margin: 2rem 0;
          font-size: 1.15rem;
        }
      `}</style>
      
      <Footer />
    </>
  );
}
