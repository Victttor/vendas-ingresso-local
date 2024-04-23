'use client'

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full extension-signer-activated">
        <Toaster />
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
