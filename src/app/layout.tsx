import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cashew Export Readiness Platform",
  description: "Internal export readiness, certification, and compliance workbench for cashew factories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
