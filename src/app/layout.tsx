import type { Metadata } from "next";
import {
  Bebas_Neue,
  IBM_Plex_Sans,
  Inter,
  JetBrains_Mono,
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

const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
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
        className={`${georgian.variable} ${georgianSerif.variable} ${inter.variable} ${ibmPlex.variable} ${jetbrains.variable} ${bebas.variable} ${titleFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
