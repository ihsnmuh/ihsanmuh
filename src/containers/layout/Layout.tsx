import { Poppins } from 'next/font/google';

import Footer from './Footer';
import Header from './Header';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className={poppins.className}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
