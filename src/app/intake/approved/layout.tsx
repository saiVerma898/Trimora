import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trimora - Your Prescription Plan is Approved!",
  description: "Congratulations! Your GLP-1 prescription plan has been approved. Choose your medication and complete your order.",
  robots: "noindex, nofollow",
};

export default function ApprovedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
