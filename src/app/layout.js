import { Geist, Geist_Mono } from "next/font/google";
import ReduxProvider from "../redux/provider";
import Footer from "./components/Footer";
import "./globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Next.js + Redux Saga Showcase",
  description: "A modern Next.js project with Redux Saga & Redux Persist architecture",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ReduxProvider>
          {children}
          {/* <Footer /> */}
        </ReduxProvider>
      </body>
    </html>
  );
}


