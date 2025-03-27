import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";


const IBMPLEX = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});


export const metadata: Metadata = {
  title: "PixAI",
  description: "AI powered image editor and generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider signInFallbackRedirectUrl='/'
    appearance={{
      variables:{
        colorPrimary:"#7856ff"
      }
    }}>
      <html lang="en">
        <body
          className={cn("font-IMBPLEX antialiased", IBMPLEX.variable)}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>

  );
}
