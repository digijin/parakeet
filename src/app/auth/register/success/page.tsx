"use client";

import { Card, CardBody, CardFooter, Button } from "@heroui/react";
import Link from "next/link";

export default function RegisterSuccessPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardBody className="gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-success">Registration Successful!</h1>
            <p>Your account has been created successfully.</p>
          </div>
        </CardBody>
        <CardFooter className="justify-center">
          <Button
            as={Link}
            href="/auth/login"
            variant="solid"
            color="success"
          >
            Continue to Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
