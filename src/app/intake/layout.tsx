import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trimora Intake Form - Medical Weight Loss Made Easy",
  description: "The journey to your dream body starts here! Complete your free online evaluation.",
  robots: "noindex, nofollow",
};

export default function IntakeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
