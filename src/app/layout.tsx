import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CERE | Cambodia Export Readiness Engine",
  description: "Export readiness, certification consulting, and compliance workflow infrastructure for Cambodia food exporters.",
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
