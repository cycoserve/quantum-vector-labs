import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackgroundLines from '@/components/layout/BackgroundLines';

/**
 * Main route group layout.
 * Provides the site-wide Header, Footer, and background decorations
 * for all standard pages (home, chat, learn, pricing, admin, etc.).
 */
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BackgroundLines />
      <Header />
      <div className="md:px-4">
        {children}
      </div>
      <Footer />
    </>
  );
}
