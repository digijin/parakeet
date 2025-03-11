"use client";

import { Card, CardBody, Button, Divider } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "No Agencies Required",
      description: "Take full control of your marketing at a fraction of the cost",
      icon: "/globe.svg",
    },
    {
      title: "See Where Every Dollar Goes",
      description: "Clear analytics to track ad performance in real-time",
      icon: "/file.svg",
    },
    {
      title: "Mobile-Friendly & Easy to Use",
      description: "Manage your marketing from anywhere, on any device",
      icon: "/window.svg",
    },
  ];

  const marketingFeatures = [
    "Post and manage ads across multiple platforms",
    "Track performance and measure ROI in real-time",
    "Build stunning webpages without coding",
    "Automate and optimize your campaigns with AI-driven insights"
  ];

  return (
    <main className="container mx-auto px-6 py-8 flex flex-col gap-16">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center gap-6 py-16">
        <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          The Ultimate Marketing Solution for Small Businesses
        </h1>
        <p className="text-xl text-default-500 max-w-2xl">
          Effortless Advertising, Smarter Tracking, and Easy Website Creation – All in One Place
        </p>
        <Card className="w-full max-w-2xl">
          <CardBody className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Marketing Made Simple</h2>
            <p className="text-default-500">Running a business is hard enough—marketing shouldn&apos;t be. Our all-in-one platform helps you:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {marketingFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-success">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </section>

      <Divider className="max-w-4xl mx-auto" />

      {/* Features Section */}
      <section className="py-8">
        <h2 className="text-3xl font-bold text-center mb-12">Why Small Businesses Love Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="p-4">
              <CardBody className="flex flex-col items-center text-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-default-500">{feature.description}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <Card className="bg-gradient-to-r from-primary to-secondary">
          <CardBody className="py-12">
            <div className="flex flex-col items-center text-center gap-6">
              <h2 className="text-3xl font-bold text-white">Grow Your Business with Just a Few Taps</h2>
              <p className="text-white/90 max-w-xl">
                From social media posts to digital ads and email campaigns, our platform simplifies it all. 
                Want to outsource? Our built-in marketplace connects you with vetted freelancers and agencies at rates you can afford.
              </p>
              <Button
                as={Link}
                href="/auth/register"
                variant="solid"
                size="lg"
                className="font-medium bg-white text-primary hover:bg-white/90"
              >
                Start Your Free Trial Today!
              </Button>
            </div>
          </CardBody>
        </Card>
      </section>

      <p>
        We&apos;re here to help you grow your business and reach your goals.
      </p>
    </main>
  );
}
