import type { Metadata } from "next";
import "./globals.css";
import "remixicon/fonts/remixicon.css";
import UILibraryProvider from "@/providers/UILibraryProvider";
import { ClerkProvider } from "@clerk/nextjs";
// import { koKR } from "@/localizations/ko-KR";
import LayoutProvider from "@/providers/LayoutProvider";
// import { koKR } from "@clerk/localizations";

export const metadata: Metadata = {
  title: "KaiEvents",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      {/* <ClerkProvider localization={koKR}> */}
      <html lang="en">
        <body className="bg-gray-200 h-screen">
          <UILibraryProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </UILibraryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
