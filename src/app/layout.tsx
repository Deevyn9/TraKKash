import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TraKKash",
  description: "Know where your money goes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="h-screen">
          <Nav />
          <div className="flex justify-center items-center pt-24 h-screen bg-red-500">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
