import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import LayoutProvider from "./LayoutProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import ContextProvider from "./ContextProvider";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Car Sales Boost WordPress and Facebook Automation",
  description:
    "Car Sales Boost is a SaaS Software that offers WordPress and Facebook Marketplace automation for car listings with ease.",
};

const LazyToastContainer = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  {
    ssr: false,
  }
);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@100..900&family=Poppins:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={inter.className}>
        <ClerkProvider>
          <ContextProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </ContextProvider>
        </ClerkProvider>
        <LazyToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          draggable
          pauseOnFocusLoss
          pauseOnHover
          theme="colored"
        />
      </body>
    </html>
  );
}
