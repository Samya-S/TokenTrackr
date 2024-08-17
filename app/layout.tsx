import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import MetamaskWrapper from "./MetamaskWrapper";

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
      <body className="bg-[#F4F4F5] px-3 py-2 md:py-3 lg:px-0 lg:max-w-screen-xl mx-auto">
        <MetamaskWrapper>
          <NavBar />
          {children}
        </MetamaskWrapper>
      </body>
    </html>
  );
}
