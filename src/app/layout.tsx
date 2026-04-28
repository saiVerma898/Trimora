import type { Metadata } from "next";
import "./globals.css";
import PostHogProvider from "@/components/PostHogProvider";

export const metadata: Metadata = {
  title: "Trimora - Personalized Telehealth Care",
  description:
    "Personalized telehealth care from Trimora. Clinician-guided solutions for weight loss, skincare, hair loss, men's health, and more.",
  openGraph: {
    title: "Trimora - Personalized Telehealth Care",
    description:
      "Personalized telehealth care from Trimora. Clinician-guided solutions for weight loss, skincare, hair loss, men's health, and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
