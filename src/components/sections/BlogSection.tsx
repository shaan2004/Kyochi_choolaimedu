'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionTag } from '../ui/SectionTag';
import { AdminPanel } from '../ui/AdminPanel';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  featuredImage: string;
  publishedAt: string;
  createdAt: string;
}

export const BlogSection: React.FC = () => {
  const { ref, hasRevealed } = useScrollReveal(0.1, true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // 1. Detect ?admin_kycdu in URL on client side (to avoid SSR mismatch)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.has('admin_kycdu')) {
        setIsAdminOpen(true);
      }
    }
  }, []);

  // 2. Fetch published blogs
  const fetchPublishedBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      if (res.ok) {
        setPosts(data.posts || []);
      }
    } catch (err) {
      console.error('Failed to load public blog posts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPublishedBlogs();
  }, [isAdminOpen]); // Refetch when admin panel closes in case new posts were added/edited

  const featuredPost = posts[0];
  const scrollablePosts = posts.slice(1);

  return (
    <section
      id="blog"
      ref={ref as any}
      role="region"
      aria-label="Blog and Articles"
      className="py-20 md:py-28 bg-surface-dark/30 border-b border-gold-border/20 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
          <SectionTag text="Kyochi Choolaimedu Articles" className="mb-4" />
          <h2 className="font-display text-3xl md:text-[44px] font-bold tracking-tight text-text-primary leading-tight">
            Art of Healing <span className="gold-shimmer-text">Insights</span>
          </h2>
          <p className="text-text-primary/70 font-light text-sm md:text-base mt-3 leading-relaxed">
            Discover therapeutic reflexology advice, holistic wellness practices, and home care tips designed by our specialists.
          </p>
        </div>

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="py-20 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold mx-auto mb-4" />
            <p className="text-xs text-text-primary/50">Curating our latest logs...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="py-12 text-center text-text-primary/40 font-light text-sm">
            Insights articles are currently being prepared. Check back soon.
          </div>
        ) : (
          <div className="space-y-16">
            
            {/* ========================================================
               FEATURED POST (Centered below Title text)
               ======================================================== */}
            {featuredPost && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={hasRevealed ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="max-w-4xl mx-auto rounded-3xl overflow-hidden glass-panel border border-gold-border/40 shadow-xl bg-card-dark/40"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-0">
                  
                  {/* Left Column: Image */}
                  <div className="relative w-full h-[140px] sm:h-[220px] md:h-full md:min-h-[350px] md:col-span-6 overflow-hidden">
                    <Image
                      src={featuredPost.featuredImage}
                      alt={featuredPost.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 450px"
                    />
                    <div className="absolute top-3 left-3 bg-gold px-2.5 py-0.5 rounded-full text-[9px] font-bold text-black uppercase tracking-wider">
                      Featured
                    </div>
                  </div>

                  {/* Right Column: Title & details */}
                  <div className="p-4 sm:p-7 md:p-10 md:col-span-6 flex flex-col justify-center space-y-3 sm:space-y-4">
                    <span className="text-[8px] sm:text-[10px] text-text-primary/50 uppercase tracking-widest font-semibold">
                      {new Date(featuredPost.publishedAt || featuredPost.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                    
                    <h3 className="font-display text-base sm:text-2xl md:text-3xl font-bold text-text-primary leading-snug">
                      {featuredPost.title}
                    </h3>
                    
                    <p className="text-text-primary/70 font-light text-[11px] sm:text-sm leading-relaxed">
                      {featuredPost.summary}
                    </p>

                    <div className="pt-2">
                      <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gold text-black font-semibold text-xs hover:bg-gold-light hover:shadow-[0_4px_15px_rgba(201,168,76,0.3)] transition-all duration-300 cursor-pointer"
                      >
                        <span>View More</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
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

                </div>
              </motion.div>
            )}

            {/* ========================================================
               OTHER BLOGS (Horizontal scroll below Featured Post)
               ======================================================== */}
            {scrollablePosts.length > 0 && (
              <div className="space-y-6">
                
                {/* Horizontal Section Subheader */}
                <div className="max-w-5xl mx-auto flex items-center justify-between px-2">
                  <h3 className="font-display text-base sm:text-xl font-bold text-text-primary">
                    More Health Tips
                  </h3>
                  <div className="hidden md:flex items-center gap-1 text-[10px] text-text-primary/50 uppercase tracking-widest font-semibold animate-pulse">
                    <span>Scroll to view</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </div>
                </div>

                {/* Grid on Mobile, Scroll track on Tablet/Desktop */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={hasRevealed ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.25 }}
                  className="grid grid-cols-2 md:flex md:overflow-x-auto gap-2.5 sm:gap-6 pb-6 pt-2 md:snap-x md:snap-mandatory md:scroll-smooth md:scrollbar-thin max-w-5xl mx-auto px-1 sm:px-2"
                >
                  {scrollablePosts.map((post) => (
                    <div
                      key={post._id}
                      className="w-full md:w-[320px] shrink-0 md:snap-start glass-panel rounded-lg sm:rounded-3xl overflow-hidden border border-gold-border/20 shadow-sm hover:shadow-md hover:border-gold-border/40 hover:-translate-y-1 transition-all duration-300 flex flex-col bg-card-dark/25 group"
                    >
                      {/* Image header */}
                      <div className="relative w-full h-20 xs:h-24 sm:h-34 md:h-44 overflow-hidden">
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 160px, 320px"
                        />
                      </div>

                      {/* Content Card Body */}
                      <div className="p-2 sm:p-5 md:p-6 flex flex-col flex-grow justify-between space-y-2 sm:space-y-3.5">
                        <div className="space-y-0.5 sm:space-y-1.5">
                          <span className="text-[7px] sm:text-[10px] text-text-primary/50 uppercase tracking-wider block font-light">
                            {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                          
                          <h4 className="font-display text-[9px] sm:text-base md:text-lg font-bold text-text-primary leading-snug line-clamp-2 group-hover:text-gold transition-colors duration-300">
                            {post.title}
                          </h4>
                          
                          <p className="text-text-primary/60 font-light text-[8px] sm:text-xs leading-relaxed line-clamp-2">
                            {post.summary}
                          </p>
                        </div>

                        <div className="pt-1 sm:pt-2">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-1 px-2 py-1.5 sm:px-4 sm:py-2.5 rounded sm:rounded-lg border border-gold-border/40 text-text-primary hover:bg-gold hover:text-black font-semibold text-[8px] sm:text-xs transition-all duration-300 w-full justify-center cursor-pointer"
                          >
                            <span>View More</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="8"
                              height="8"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="sm:w-3 sm:h-3"
                            >
                              <path d="M5 12h14" />
                              <path d="m12 5 7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>

                    </div>
                  ))}
                </motion.div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Admin Panel Modal Overlay */}
      {isAdminOpen && (
        <AdminPanel onClose={() => {
          // Remove ?admin_kycdu from URL query string silently on close
          if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            url.searchParams.delete('admin_kycdu');
            window.history.pushState({}, '', url.toString());
          }
          setIsAdminOpen(false);
        }} />
      )}
    </section>
  );
};

export default BlogSection;
