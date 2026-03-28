import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import Script from "next/script";
// import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://orchardcapitals.com"),
  title: {
    default: "Orchard Capitals - Copy Futures, Options & Contracts with Precision",
    template: "%s | Orchard Capitals",
  },
  description:
    "Mirror real-time stock and options trades from top-performing traders. Precision, flexibility, and transparency straight to your fingertips.",
  keywords: [
    "copy trading",
    "futures trading",
    "options trading",
    "stock trading",
    "trade copying",
    "Orchard Capitals",
  ],
  openGraph: {
    type: "website",
    url: "https://orchardcapitals.com",
    siteName: "Orchard Capitals",
    title: "Orchard Capitals - Copy Futures, Options & Contracts with Precision",
    description:
      "Mirror real-time stock and options trades from top-performing traders. Precision, flexibility, and transparency straight to your fingertips.",
    // og:image is generated automatically from app/opengraph-image.jpg
    // (Next.js reads actual dimensions from the file — no manual entry needed)
  },
  twitter: {
    card: "summary_large_image",
    title: "Orchard Capitals - Copy Futures, Options & Contracts with Precision",
    description:
      "Mirror real-time stock and options trades from top-performing traders. Precision, flexibility, and transparency straight to your fingertips.",
    // twitter:image is generated automatically from app/twitter-image.jpg
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body
        className={`${poppins.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>

        {/* LiveChat - Jovo */}

         <Script
          src="//code.jivosite.com/widget/kbBRyxbIhS"
          strategy="afterInteractive"
        /> 
      </body>
    </html>
  );
}



