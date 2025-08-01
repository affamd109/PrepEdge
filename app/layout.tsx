import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

import { dark } from '@clerk/themes'

import { ClerkProvider } from '@clerk/nextjs'
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });


const inter = Inter({
  subsets: ["latin"]
});


// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "PrepEdge",
  description: "Generated by create next app",
};

export default function RootLayout({ children,}: Readonly<{ children: React.ReactNode; }>) {

  return (
    <ClerkProvider appearance={{
        baseTheme: dark,
      }} >
    <html lang="en" suppressHydrationWarning>
      <body
        className={` ${inter.className} `}  >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange >

          <Header/>

          <main className="min-h-screen" > {children}  </main>

          <Toaster richColors />


          <footer className="bg-black py-12" >
           <div className="container mx-auto px-4 text-center" > <p>&#169; PrepEdge </p> </div> 
            </footer>


        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
