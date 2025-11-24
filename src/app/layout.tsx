import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConditionalNavigation from "@/components/ConditionalNavigation";
import ConditionalWrapper from "@/components/ConditionalWrapper";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FutureLens Rwanda | Health Analytics Platform",
  description:
    "28-Year Rwanda Health Transformation Analysis - Official NISR DHS Data Analytics Dashboard",
  keywords:
    "Rwanda, Health Analytics, DHS, NISR, Health Transformation, Data Visualization",
  icons: {
    icon: "/next.svg",
    shortcut: "/next.svg",
    apple: "/next.svg",
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
        className={`${inter.className} antialiased bg-gray-50`}
        suppressHydrationWarning={true}
      >
        <Providers>
          <ConditionalNavigation />
          <ConditionalWrapper>{children}</ConditionalWrapper>
        </Providers>
      </body>
    </html>
  );
}
