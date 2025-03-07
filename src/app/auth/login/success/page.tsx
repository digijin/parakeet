"use client";

import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardFooter, Button } from "@heroui/react";
import Link from "next/link";

interface User {
  id: string;
  email: string;
  displayName: string;
}

interface DecodedToken {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

const LoginSuccessPage: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      console.log("[LoginSuccess] Starting auth check");
      const token = sessionStorage.getItem("token");
      console.log("[LoginSuccess] Token from sessionStorage:", token ? "present" : "missing");

      if (token) {
        try {
          console.log("[LoginSuccess] Sending token to verify endpoint");
          const response = await fetch("/api/auth/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          });

          console.log("[LoginSuccess] Verify response status:", response.status);
          const data = await response.json();
          console.log("[LoginSuccess] Verify response data:", data);

          if (response.ok) {
            console.log("[LoginSuccess] Token verified, updating state");
            setToken(token);
            setDecodedToken(data.decoded);
            setError(null);
          } else {
            console.log("[LoginSuccess] Token verification failed");
            setError(data.message);
          }
        } catch (error) {
          console.error("[LoginSuccess] Token verification error:", error);
          setError("Token verification failed");
        }
      } else {
        console.log("[LoginSuccess] No token found");
        setError("No token found");
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-bold">Login Success</h1>
        </CardHeader>
        <CardBody>
          {error ? (
            <div className="text-danger">
              <p>Error: {error}</p>
              <pre className="mt-2 p-2 bg-content2 rounded text-sm overflow-auto">
                {JSON.stringify({ token, decodedToken, error }, null, 2)}
              </pre>
            </div>
          ) : (
            <div>
              <p className="text-success">Login successful!</p>
              <div className="mt-4">
                <h2 className="font-semibold mb-2">Debug Information:</h2>
                <pre className="p-2 bg-content2 rounded text-sm overflow-auto">
                  {JSON.stringify({ 
                    token, 
                    decodedToken,
                    user: decodedToken ? {
                      id: decodedToken.id,
                      email: decodedToken.email,
                      displayName: decodedToken.email.split('@')[0]
                    } : null 
                  }, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </CardBody>
        <CardFooter className="flex justify-end gap-2">
          <Button as={Link} href="/" variant="flat">
            Go to Home
          </Button>
          <Button as={Link} href="/about" variant="flat">
            Learn More
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginSuccessPage; 