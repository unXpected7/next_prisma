import type { Metadata } from "next";
import { Inter } from "next/font/google";
 
import "./globals.css";
import Provider from "@/provider";
 
const inter = Inter({ subsets: ["latin"] });
 
export const metadata: Metadata = {
  title: "E-Shop Next",
  description: "E-Shop Next",
};
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}