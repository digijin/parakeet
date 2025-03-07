"use client";

import { Card } from "@heroui/react";
import { ActionButtons } from "./components/ActionButtons";
import Link from "next/link";

export default function About() {
  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <Card className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">
          About Us
        </h1>
        <p>
          Welcome to the About page. Here you can learn more about our project.
        </p>
        <p>
          We are a small team who are passionate about creating innovative solutions for our clients to help solve marketing problems for small to medium sized businesses.
        </p>
        <p>
          We are currently looking for founding members to join our team. We are also looking for beta testers to help us test the platform. Also, we are looking for investors to help us grow.
        </p>
        <p>
          If you are interested in joining our team, please <Link href="/contact" className="text-primary hover:text-primary-500 font-medium underline">contact us</Link>.
        </p>
        <p>
            If you are interested in investing in our project, please <Link href="/investors" className="text-primary hover:text-primary-500 font-medium underline">contact us</Link>.
          </p>
        
        <ActionButtons />
      </Card>
    </div>
  );
}