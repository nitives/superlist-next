import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer, Navbar, SearchProvider, ThemeProvider } from "@/components";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Superlist",
  description:
    "The Ultimate List of the Internet, find any link for any task you might need.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicon.ico",
        href: "/favicon.ico",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/favicon-white.ico",
        href: "/favicon-white.ico",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="title" content="Superlist" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="application-name" content="Superlist" />
        <link rel="canonical" href="https://superlist.cc"></link>
        <link
          rel="apple-touch-icon"
          href="/images/meta/app.png"
          sizes="180x180"
        />
        <meta
          name="description"
          content="The Ultimate List of the Internet, find any link for any task you might need."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://superlist.cc/" />
        <meta property="og:title" content="Superlist - Find every tool" />
        <meta
          property="og:description"
          content="The Ultimate List of the Internet, find any link for any task you might need."
        />
        <meta property="og:image" content="/images/meta/meta-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://superlist.cc/" />
        <meta property="twitter:title" content="Superlist - Find every tool" />
        <meta
          property="twitter:description"
          content="The Ultimate List of the Internet, find any link for any task you might need."
        />
        <meta property="twitter:image" content="/images/meta/meta-image.png" />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="628" />
      </head>

      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SearchProvider>
            <Navbar />
            {children}
            <Footer className="footer w-full mt-20 px-8 py-12 border-t" />
          </SearchProvider>
        </ThemeProvider>
      </body>
      <Analytics />
      <SpeedInsights />
    </html>
  );
}
