import type { Metadata } from "next";
import "./globals.css";
import PageTransition from "@/components/transition/PageTransition";
import AuthProvider from "@/features/auth/providers/AuthProvider";

export const metadata: Metadata = {
  title: "Colly",
  description: "Colly Network With Us",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className="font-geist-sans antialiased">
      <body className="min-h-full flex flex-col">
        <PageTransition />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
