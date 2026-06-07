import type { Metadata } from "next";
import RootLayoutClient from "./RootLayoutClient";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://colly.amadich.tn"),

  title: {
    default: "Colly - Find Your Tribe, Build Your Network",
    template: "%s | Colly",
  },

  description:
    "Colly is a student-focused platform that helps you connect with like-minded students, build meaningful friendships, discover communities, find study partners, and explore opportunities that shape your future.",

  keywords: [
    "students",
    "student community",
    "study partners",
    "friendship platform",
    "student networking",
    "student events",
    "college community",
    "university students",
    "student opportunities",
    "Colly",
  ],

  authors: [
    {
      name: "Colly",
    },
  ],

  creator: "Colly",
  publisher: "Colly",

  openGraph: {
    title: "Colly - Find Your Tribe, Build Your Network",
    description:
      "Connect with like-minded students, build friendships, discover communities, and unlock opportunities that shape your future.",
    url: "https://colly.amadich.tn",
    siteName: "Colly",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://colly.amadich.tn/logo.svg",
        width: 1200,
        height: 630,
        alt: "Colly Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Colly - Find Your Tribe, Build Your Network",
    description:
      "Connect with students, build friendships, discover communities, and explore opportunities with Colly.",
    images: ["https://colly.amadich.tn/logo.svg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({children,}: {children: React.ReactNode;}) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}