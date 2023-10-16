import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "@/lib/auth";
import { Navbar } from "@/components/Navigator";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VChat",
  description: "VChat is a platform for chatting...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Navbar className="h-14 w-full fixed" />
          <main className="pt-14 h-full">{children}</main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
