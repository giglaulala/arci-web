import type { Metadata } from "next";
import {
  Inter,
  Noto_Sans_Georgian,
  Noto_Serif_Georgian,
} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const georgian = Noto_Sans_Georgian({
  subsets: ["georgian"],
  variable: "--font-georgian",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const georgianSerif = Noto_Serif_Georgian({
  subsets: ["georgian"],
  variable: "--font-georgian-serif",
  display: "swap",
});

const titleFont = localFont({
  src: "./fonts/alk-sanet-97918679091.ttf",
  variable: "--font-title",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ARCI | Since 1989",
  description:
    "Georgian-language long-form biography website for ARCI, a Georgian architecture and design firm founded in 1989.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ka">
      <body
        className={`${georgian.variable} ${georgianSerif.variable} ${inter.variable} ${titleFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
