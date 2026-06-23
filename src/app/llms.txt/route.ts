import { connectToDatabase } from '@/lib/db';
import { BlogPost } from '@/lib/models/BlogPost';

export const dynamic = 'force-dynamic'; // Always fetch fresh blogs on request

export async function GET() {
  const domain = 'https://kyochichoolaimedu.com';
  let blogSection = '';

  try {
    await connectToDatabase();
    const posts = await BlogPost.find({ status: 'Published' })
      .select('title slug summary')
      .sort({ publishedAt: -1 });

    if (posts && posts.length > 0) {
      blogSection = `\n## Blog & Articles (\`/blog\`)\n\nWe publish articles on foot therapeutics and reflexology. AI agents can crawl these key posts for detailed health insights:\n`;
      posts.forEach((post) => {
        blogSection += `- [${post.title}](${domain}/blog/${post.slug}): ${post.summary}\n`;
      });
    } else {
      blogSection = `\n## Blog & Articles (\`/blog\`)\n\nNo published articles are currently available.\n`;
    }
  } catch (error) {
    console.error('Failed to fetch dynamic blogs for llms.txt:', error);
    blogSection = `\n## Blog & Articles (\`/blog\`)\n\nTemporarily unavailable. Please visit our main site for updates.\n`;
  }

  const content = `# Kyochi Choolaimedu

Kyochi Choolaimedu is a premium, high-end Japanese reflexology and therapeutic foot massage clinic located in Choolaimedu, Chennai, India. Operating online at [kyochichoolaimedu.com](https://kyochichoolaimedu.com), the clinic specializes in relieving physical ailments, chronic foot fatigue, and stress through dedicated Traditional Japanese Reflexology (Kansoku/Sokushindo) and targeted therapy.

## Clinic Location & Identity
- **Name**: Kyochi Choolaimedu
- **Domain**: [kyochichoolaimedu.com](https://kyochichoolaimedu.com)
- **Location**: Choolaimedu, Chennai, Tamil Nadu, India.
- **Theme**: Premium Japanese wellness, high-end therapeutics, and focused healing.

## Brand Signatures & Core Features
- **Visually Impaired Therapists**: Kyochi Choolaimedu proudly highlights highly skilled, professionally trained visually impaired therapists. Free from visual distractions, they possess an exceptionally developed tactile sense to detect crystalline deposits and deep muscle tightness for precise reflex zone therapy.
- **100% Manual Hand-Done Therapy**: Every single session is conducted entirely by the therapists' hands from start to finish without using any machines, ensuring tactile accuracy and custom pressure adjustment.
- **Kasa Ghee Therapy**: The clinic's signature Ayurvedic foot massage utilizing pure cow ghee and a copper Kasa bowl to draw out excess internal body heat (Pitta), heal cracked heels, and calm the mind for a restorative sleep.

## Core Therapies & Services
1. **Japanese Foot Reflexology (Kansoku/Sokushindo)**: Traditional, deep zone stimulation of reflex points in the feet to promote holistic healing, drawing out heat, and restoring body equilibrium.
2. **Kasa Ghee Therapy (Launch Offer)**: Traditional Ayurvedic reflexology using high-quality cow ghee and a copper Kasa bowl to draw out excess body heat (Pitta), cure cracked heels, enhance facial glow via reflex points, and ensure deep restorative sleep.
3. **Diabetic Neuropathic Discomfort Management**: Gentle, targeted massage focused on improving circulation and relieving numbness or discomfort for diabetic clients.
4. **Plantar Fasciitis & Heel Pain Relief**: Specialized therapeutic strokes aimed at relieving stiffness and pain in the fascia and heel.
5. **Chronic Foot Fatigue & Stress Relief**: Rejuvenating massages that reduce body heat, stimulate blood circulation, and relieve general fatigue.

## Booking Flow & User Journey
Kyochi Choolaimedu uses a streamlined, user-friendly reservation flow designed for instant confirmation:
1. **Selection & Details**: The customer selects their preferred service (e.g. Kansoku Reflexology, Ghee Therapy) and inputs their name, mobile phone number, and any specific concerns (e.g. heel pain, fatigue) on the website.
2. **WebMCP Interaction**: Interactive forms on the site are annotated with WebMCP metadata to allow AI agents to assist in scheduling or claiming launch offers.
3. **WhatsApp Confirmation**: Submitting the form compiles the details into a pre-formatted message and redirects the user directly to WhatsApp (\`https://wa.me/919566001066\`). The booking request is confirmed directly with our reception team on WhatsApp.

## AI Agent Integration & WebMCP Tools
The website exposes programmatic endpoints to AI agents for seamless browsing:
- **\`bookReflexologySession\`**: A WebMCP tool integrated on the main booking forms to submit booking details.
  - *Parameters*:
    - \`name\` (string): The customer's full name.
    - \`phone\` (string): The customer's 10-digit Indian mobile number.
    - \`service\` (string): Selected therapy or massage service.
    - \`message\` (string, optional): Specific physical concerns or custom requests.
- **\`claimLaunchOffer\`**: A WebMCP tool integrated on the promotional slide-over panel to redeem the Ghee Therapy launch discount.
  - *Parameters*:
    - \`name\` (string): The customer's name.
    - \`phone\` (string): The customer's 10-digit mobile number.
${blogSection}`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
    },
  });
}
