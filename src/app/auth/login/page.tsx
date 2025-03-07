"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardFooter,
  Input,
  Button,
  Divider
} from "@heroui/react";
import { setStoredToken } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setStoredToken(data.token);
        console.log("[Login] Token stored successfully");
        // Redirect to success page after a short delay
        setTimeout(() => {
          router.push("/auth/login/success");
        }, 1000);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("[Login] Error:", err);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-bold">Login</h1>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardBody className="gap-4">
            <Input
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              isDisabled={isLoading}
            />
            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              isDisabled={isLoading}
            />
            {error && <p className="text-danger">{error}</p>}
            {message && <p className="text-success">{message}</p>}
          </CardBody>
          <Divider />
          <CardFooter className="flex flex-col gap-2">
            <Button 
              type="submit" 
              variant="solid"
              className="w-full"
              isLoading={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            <p className="text-center text-small">
              No account?{" "}
              <Link 
                href="/auth/register" 
                className="text-primary hover:opacity-80"
              >
                Register
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
