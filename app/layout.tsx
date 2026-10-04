import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Free LLM Chat",
  description: "Free, open chat with LLMs via OpenRouter",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='%236366f1' d='M12 2l2 6.2L20 10l-6 1.8L12 18l-2-6.2L4 10l6-1.8z'/></svg>" />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}