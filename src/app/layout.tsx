"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./globals.css";
import { 
  HeroUIProvider,
  Card,
  CardBody,
  CardFooter,
  Button,
  Divider
} from "@heroui/react";
import { Navigation } from "@/components/Navigation";

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

  const handleDismiss = (duration: number) => {
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
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <HeroUIProvider>
          <Navigation />
          
          {showWarning && (
            <Card className="m-4 border-warning bg-warning-50">
              <CardBody className="gap-2">
                <p className="font-bold text-warning">Prototype Warning</p>
                <p>This prototype is intended for demonstration purposes and uses, use real data at your own risk.</p>
              </CardBody>
              <Divider />
              <CardFooter className="gap-2 justify-end">
                <Button
                  variant="flat"
                  color="warning"
                  size="sm"
                  onPress={() => handleDismiss(1 / 1440)}
                >
                  Dismiss for 1 minute
                </Button>
                <Button
                  variant="flat"
                  color="warning"
                  size="sm"
                  onPress={() => handleDismiss(1 / 24)}
                >
                  Dismiss for 1 hour
                </Button>
                <Button
                  variant="solid"
                  color="warning"
                  size="sm"
                  onPress={handleDismissPermanently}
                >
                  Dismiss permanently
                </Button>
              </CardFooter>
            </Card>
          )}
          {children}
        </HeroUIProvider>
      </body>
    </html>
  );
}
