import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://musings.tobyb.dev"),
  title: "Toby's musings",
  description:
    "A place for my thoughts, project updates and other general shenanigans.",
  openGraph: {
    images: "/meta.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`px-4 ${inter.className} grid justify-center place-items-center`}
      >
        {children}
      </body>
    </html>
  );
}
