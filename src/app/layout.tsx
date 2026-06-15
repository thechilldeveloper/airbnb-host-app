import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Goa Stay — Guest Portal",
  description: "Sun, sand & seamless stays — your complete Goa guest experience",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full bg-[#F0FDFF]">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              borderRadius: "14px",
              fontSize: "14px",
              background: "#0C4A6E",
              color: "#fff",
              boxShadow: "0 8px 24px rgba(8,145,178,0.25)",
            },
          }}
        />
      </body>
    </html>
  );
}
