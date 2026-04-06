import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trimora - Personalized Weight Loss Solutions",
  description:
    "Start your weight loss journey with Trimora. Doctor-guided GLP-1 treatment plans, 24/7 support, and a weight loss guarantee. Starting at $149.",
};

export default function FunnelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
