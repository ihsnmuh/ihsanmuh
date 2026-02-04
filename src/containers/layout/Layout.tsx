import dynamic from 'next/dynamic';
import { Inter, Poppins } from 'next/font/google';

const Header = dynamic(() => import('./Header'));

const Footer = dynamic(() => import('./Footer'));

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
      <Header />
      <main id='main-content'>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
