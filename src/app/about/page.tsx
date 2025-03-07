"use client";

import { Card } from "@heroui/react";
import { ActionButtons } from "./components/ActionButtons";

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
        <ActionButtons />
      </Card>
    </div>
  );
}