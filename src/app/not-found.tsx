import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center min-h-[70vh] bg-bg-dark px-6 text-center pt-28 pb-20">
        <h1 className="font-display text-8xl md:text-9xl font-bold text-gold mb-6">404</h1>
        <h2 className="font-display text-2xl md:text-4xl font-bold text-text-primary mb-4">
          Page Not Found
        </h2>
        <p className="text-text-primary/70 font-light mb-10 max-w-md mx-auto">
          We couldn't find the page you're looking for. It might have been moved, deleted, or perhaps the URL is incorrect.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gold text-black font-semibold hover:bg-gold-light hover:shadow-[0_4px_20px_rgba(201,168,76,0.3)] transition-all duration-300"
        >
          Return to Home
        </Link>
      </main>
      <Footer />
    </>
  );
}
