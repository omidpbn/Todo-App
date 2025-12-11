import type { Metadata, Viewport } from "next";
import ToastProvider from "../shared/components/atoms/toastProvider";
import Header from "../shared/components/organisms/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo-App",
  description: "",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" className="dark">
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white">
        <main>
          <Header />
          {children}
        </main>
        <ToastProvider />
      </body>
    </html>
  );
}
