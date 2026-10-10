import { Geist, Geist_Mono } from "next/font/google";
import ReduxProvider from "../redux/provider";
import { RegisterModalProvider } from "@/context/RegisterModalContext";
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
  title: "DigitalRakshak APIs",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ReduxProvider>
          <RegisterModalProvider>
            {children}
            {/* <Footer /> */}
          </RegisterModalProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}


