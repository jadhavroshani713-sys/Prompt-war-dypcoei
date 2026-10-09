import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Chaos We Call Home — Exploring, Experiencing & Navigating",
  description:
    "An immersive interactive journey through Earth, Mind, and Domestic Sanctuary. Explore the turbulence, experience the ambient harmony, and navigate the beautiful chaos of belonging.",
  keywords: ["chaos", "home", "interactive", "three.js", "mindfulness", "exploration", "sanctuary"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Cinzel:wght@500;700;900&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#07090e] text-slate-100 font-sans antialiased selection:bg-amber-500 selection:text-black overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
