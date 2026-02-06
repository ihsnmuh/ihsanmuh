import { Inter, Poppins } from 'next/font/google';

import { cn } from '@/lib/utils';

import Footer from './Footer';
import Header from './Header';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${inter.className} ${inter.variable} ${poppins.variable}`}>
      <a
        href='#main-content'
        className={cn(
          'sr-only focus:not-sr-only',
          'fixed top-4 left-4 z-50 px-4 py-2',
          'bg-primary-500 text-white rounded',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        )}
      >
        Skip to content
      </a>
      <Header />
      <main id='main-content'>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
