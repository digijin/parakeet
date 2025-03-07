"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./globals.css";
import { 
  HeroUIProvider, 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider
} from "@heroui/react";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Ask", href: "/ask" },
  ];

  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <HeroUIProvider>
          <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
              <NavbarMenuToggle
                className="sm:hidden"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              />
              <NavbarBrand>
                <Link href="/" className="flex items-center gap-2">
                  <Image
                    src="/brand/logo.svg"
                    alt="Parakeet Logo"
                    width={32}
                    height={32}
                    className="h-8 w-auto"
                  />
                  <p className="font-bold text-inherit">Parakeet</p>
                </Link>
              </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
              {menuItems.map((item) => (
                <NavbarItem key={item.href}>
                  <Link href={item.href} className="hover:opacity-80">
                    {item.name}
                  </Link>
                </NavbarItem>
              ))}
            </NavbarContent>

            <NavbarContent justify="end">
              <NavbarItem>
                <Button 
                  as={Link}
                  href="/auth/login" 
                  variant="flat"
                  className="hover:opacity-80"
                >
                  Login
                </Button>
              </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
              {menuItems.map((item) => (
                <NavbarMenuItem key={item.href}>
                  <Link 
                    href={item.href}
                    className="w-full hover:opacity-80"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </NavbarMenuItem>
              ))}
              <NavbarMenuItem>
                <Link 
                  href="/login"
                  className="w-full hover:opacity-80"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </NavbarMenuItem>
            </NavbarMenu>
          </Navbar>

          {showWarning && (
            <Card className="m-4 border-warning bg-warning-50">
              <CardBody className="gap-2">
                <p className="font-bold text-warning">Prototype Warning</p>
                <p>This is a prototype, for now auth is insecure.</p>
                <p className="font-bold">Do not enter any confidential information anywhere!</p>
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
