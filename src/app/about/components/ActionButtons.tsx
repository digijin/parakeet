"use client";

import { Button } from "@heroui/react";

export function ActionButtons() {
  return (
    <div className="flex gap-4">
      <Button 
        variant="solid"
        onPress={() => window.location.href = '/learn-more'}
      >
        Learn More
      </Button>
      <Button 
        variant="faded"
        onPress={() => window.location.href = '/contact'}
      >
        Contact Us
      </Button>
    </div>
  );
} 