import { Geist, Geist_Mono } from "next/font/google";
import ReduxProvider from "../redux/provider";
import { RegisterModalProvider } from "@/context/RegisterModalContext";
import { loadYamlConfig } from "@/config/yamlConfigAccessor";
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
  let yamlConfig = null;
  try {
    yamlConfig = loadYamlConfig();
  } catch (err) {
    console.error("YAML Config Error in RootLayout:", err.message);
  }

  // Ensure private secrets are NEVER exposed to the client browser
  let clientSafeConfig = null;
  if (yamlConfig && yamlConfig.api) {
    const { apiSecret, ...safeApi } = yamlConfig.api;
    clientSafeConfig = {
      ...yamlConfig,
      api: safeApi,
    };
  }

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        {clientSafeConfig && (
          <script
            id="__YAML_CONFIG__"
            dangerouslySetInnerHTML={{
              __html: `window.__YAML_CONFIG__ = ${JSON.stringify(clientSafeConfig)};`,
            }}
          />
        )}
      </head>
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
