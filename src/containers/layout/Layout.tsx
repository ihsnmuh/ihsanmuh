import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
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
