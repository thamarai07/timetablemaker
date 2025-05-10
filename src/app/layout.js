import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Timetable Maker | Create and Manage Timetables",
  description:
    "Create, manage, and customize your timetable with ease using our intuitive timetable maker.",
  keywords: [
    "timetable maker",
    "create timetable",
    "manage timetable",
    "student timetable",
    "teacher timetable",
  ],
  authors: [{ name: "tabletimeing" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  alternates: {
    canonical: "https://tabletimeing.netlify.app/",
  },
  openGraph: {
    title: "Timetable Maker | Create and Manage Timetables",
    description:
      "Easily create and manage your class schedules with our free Timetable Maker. Perfect for students and teachers.",
    url: "https://tabletimeing.netlify.app/",
    siteName: "Timetable Maker",
    images: [
      {
        url: "https://tabletimeing.netlify.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Timetable Maker Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Timetable Maker | Create and Manage Timetables",
    description:
      "Create and manage your timetable effortlessly with our free tool.",
    images: ["https://tabletimeing.netlify.app/twitter-image.jpg"],
    creator: "@tabletimeing",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Timetable Maker",
  description:
    "A free online tool to create and manage timetables for students and teachers.",
  url: "https://tabletimeing.netlify.app/",
  applicationCategory: "Education",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  creator: {
    "@type": "Organization",
    name: "tabletimeing",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Verification Tag */}
        <meta
          name="google-site-verification"
          content="e4pplODfxnOVfi3dL36asP0vCLm2xHNMMISDy-KzGfg"
        />

        {/* Favicon and Manifest */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}