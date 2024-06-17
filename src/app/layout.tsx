import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer, Navbar, ThemeProvider } from "@/components";

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

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://superlist.cc/" />
        <meta property="twitter:title" content="Superlist - Find every tool" />
        <meta
          property="twitter:description"
          content="The Ultimate List of the Internet, find any link for any task you might need."
        />
        <meta property="twitter:image" content="/images/meta/meta-image.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer className="footer w-full mt-20 px-8 py-12 border-t" />
        </ThemeProvider>
      </body>
    </html>
  );
}
