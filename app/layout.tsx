import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MetamaskWrapper from "./MetamaskWrapper";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto-Portfolio App",
  description: "A simple crypto portfolio app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F4F4F5] mx-auto">
        <MetamaskWrapper>
          <NavBar />
          {children}
          <Footer />
        </MetamaskWrapper>
      </body>
    </html>
  );
}
