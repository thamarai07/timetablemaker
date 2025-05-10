import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head"; // Import Head for managing the head tags
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
  keywords:
    "timetable maker, create timetable, manage timetable, student timetable, teacher timetable",
  author: "Your Name", // Replace with your name or organization
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Basic SEO Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <link rel="canonical" href="https://tabletimeing.netlify.app/" />
        {/* Open Graph Tags for Social Media */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content="/path-to-image.jpg" />{" "}
        {/* Add your image URL */}
        <meta
          property="og:url"
          content="https://tabletimeing.netlify.app/"
        />{" "}
        {/* Update with your website */}
        <meta property="og:type" content="website" />
        <meta name="google-site-verification" content="e4pplODfxnOVfi3dL36asP0vCLm2xHNMMISDy-KzGfg" />
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="/path-to-image.jpg" />{" "}
        {/* Add your image URL */}
        {/* Structured Data with JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: metadata.title,
              description: metadata.description,
              url: "https://tabletimeing.netlify.app/", // Replace with actual URL
              publisher: {
                "@type": "Organization",
                name: "Your Organization", // Replace with your organization name
              },
            }),
          }}
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
