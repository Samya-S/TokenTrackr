import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MetamaskWrapper from "./MetamaskWrapper";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TokenTrackr",
  description: "A simple crypto portfolio app that simplifies tracking your assets.",
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
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Footer />
        </MetamaskWrapper>
      </body>
    </html>
  );
}
