import dynamic from 'next/dynamic';
import { Poppins } from 'next/font/google';

const Header = dynamic(() => import('./Header'));

const Footer = dynamic(() => import('./Footer'));

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main id='main-content' className={poppins.className}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
