import type { Metadata } from "next";
import "./globals.css";
import PageTransition from "@/components/transition/PageTransition";
import AuthProvider from "@/features/auth/providers/AuthProvider";
import DevToolsBlocker from "@/components/security/DevToolsBlocker";

export const metadata: Metadata = {
  title: "Colly",
  description: "Colly Network With Us",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className="font-geist-sans antialiased">
      <body className="min-h-full flex flex-col">
        <DevToolsBlocker>
          <PageTransition />
          <AuthProvider>{children}</AuthProvider>
        </DevToolsBlocker>
      </body>
    </html>
  );
}
