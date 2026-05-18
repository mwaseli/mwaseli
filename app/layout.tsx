import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MWASE AI - Free Image & Video Generator",
  description:
    "Free AI-powered image, video, and voice generation. Create stunning visuals with text-to-image, text-to-video, image-to-image, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-slate-950 text-white antialiased`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
