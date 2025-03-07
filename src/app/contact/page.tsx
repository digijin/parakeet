"use client";

import { Card, CardBody, Button } from "@heroui/react";
import Link from "next/link";

export default function Contact() {
  const contactLinks = [
    {
      name: "Twitter",
      href: "https://twitter.com/parakeet",
      icon: "𝕏",
      description: "Follow us for updates and announcements"
    },
    {
      name: "Bluesky",
      href: "https://bsky.app/profile/parakeet.bsky.social",
      icon: "🦋",
      description: "Join our Bluesky community"
    },
    {
      name: "Email",
      href: "mailto:hello@parakeet.ai",
      icon: "✉️",
      description: "Send us an email directly"
    }
  ];

  return (
    <div className="py-12 px-4 max-w-3xl mx-auto">
      <Card className="p-6">
        <CardBody className="gap-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <p className="text-default-500">
              Get in touch with us through any of these platforms
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            {contactLinks.map((link) => (
              <Card
                key={link.name}
                isPressable
                as={Link}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                className="hover:scale-[1.02] transition-transform"
              >
                <CardBody className="flex flex-row items-center gap-4 p-4">
                  <div className="text-2xl">{link.icon}</div>
                  <div>
                    <h2 className="text-lg font-semibold">{link.name}</h2>
                    <p className="text-default-500">{link.description}</p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="text-center text-small text-default-400 mt-4">
            <p>We typically respond within 24 hours during business days.</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
} 