// src/app/auth/status/page.tsx

"use client";

import { useEffect, useState } from "react";
import { verifyToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  displayName: string;
  // Add other user properties here as needed
}

interface DecodedToken {
  user: User;
  iat: number;
  exp: number;
}

export default function AuthStatusPage() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsLoading(true);
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (token) {
        const decodedToken = verifyToken(token) as DecodedToken | null;

        if (decodedToken) {
          setLoggedIn(true);
          setUser(decodedToken.user);
        } else {
          setLoggedIn(false);
        }
      } else {
        setLoggedIn(false);
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const handleLogout = () => {
    // Clear the token cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setLoggedIn(false);
    setUser(null);
    router.refresh();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Auth Status</h1>
      {loggedIn === null ? (
        <div>Checking...</div>
      ) : loggedIn ? (
        <div>
          <p>You are logged in!</p>
          {user && (
            <div>
              <p>Email: {user.email}</p>
              <p>Display Name: {user.displayName}</p>
            </div>
          )}
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
        </div>
      )}
    </div>
  );
}
