import { MetadataRoute } from 'next';
import { connectToDatabase } from '@/lib/db';
import { BlogPost } from '@/lib/models/BlogPost';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kyochi.in';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  try {
    await connectToDatabase();
    // Fetch only published posts, selecting just the fields needed for the sitemap
    const posts = await BlogPost.find({ status: 'Published' }).select('slug updatedAt publishedAt createdAt');

    posts.forEach((post) => {
      routes.push({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: post.updatedAt || post.publishedAt || post.createdAt || new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    });
  } catch (error) {
    console.error('Failed to generate dynamic sitemap:', error);
  }

  return routes;
}
