"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const isPrototype = process.env.NEXT_PUBLIC_IS_PROTO === "true";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const warningDismissed = Cookies.get("warningDismissed");
    if (!warningDismissed && isPrototype) {
      setShowWarning(true);
    }
  }, []);

  interface HandleDismiss {
    (duration: number): void;
  }

  const handleDismiss: HandleDismiss = (duration) => {
    Cookies.set("warningDismissed", "true", { expires: duration });
    setShowWarning(false);
  };

  const handleDismissPermanently = () => {
    // no permo dismiss for now
    // Cookies.set("warningDismissed", "true", { expires: 365 }); // 1 year
    // cheeky redirect to investor page
    window.location.href = "/investors";
    setShowWarning(false);
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="bg-gray-800 p-4 flex items-center justify-between">
          <h1 className="text-white text-xl">Parakeet</h1>
          <div>
            <Link href="/" className="text-white mr-4 hover:underline">Home</Link>
            <Link href="/about" className="text-white mr-4 hover:underline">About</Link>
            <Link href="/ask" className="text-white mr-4 hover:underline">Ask</Link>
            <Link href="/login" className="text-white hover:underline">Login</Link>
          </div>
        </nav>
        {showWarning && (
          <div className="notification-warning">
            This is a prototype, for now there is no auth, any user can be logged in to. 
            <br></br>
            <strong> Do not enter any confidential information anywhere !!!</strong>
            <br />
            This prototype is intended for demonstration purposes and uses, use real data at your own risk.
            <br />
            <button onClick={() => handleDismiss(1 / 1440)} className="text-blue-500 underline ml-4">
              Dismiss for 1 minute
            </button>
            <button onClick={() => handleDismiss(1 / 24)} className="text-blue-500 underline ml-4">
              Dismiss for 1 hour
            </button>
            <button onClick={handleDismissPermanently} className="text-blue-500 underline ml-4">
              Dismiss permanently
            </button>
          </div>
        )}
        {children}
      </body>
    </html>
  );
}
