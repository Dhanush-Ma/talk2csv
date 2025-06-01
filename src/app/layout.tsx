import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppConfig } from "@/lib/config";
import { ThemeProvider } from "./theme-provider";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { Toaster } from "sonner";
import QueryProvider from "./query-provider";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: AppConfig.name,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <QueryProvider>
        <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {children}
            <NextTopLoader color="#6366f1" showSpinner={false} />
            <Toaster richColors />
          </body>
        </ThemeProvider>
      </QueryProvider>
    </html>
  );
}
