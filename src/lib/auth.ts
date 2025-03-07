// filepath: /c:/Users/digijin/workspace/mkt/src/lib/auth.ts
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { getPocketBaseInstance } from "./pocketbase";

// Types
export interface User {
  id: string;
  email: string;
  displayName: string;
}

export interface DecodedToken {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

export interface AuthResult {
  user: User;
  token: string;
}

// Constants
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Token Management
export function verifyToken(token: string): DecodedToken | null {
  try {
    return jwt.verify(token, JWT_SECRET) as DecodedToken;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

export function generateToken(user: User): string {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
}

// Authentication
export async function authenticateUser(email: string, password: string): Promise<AuthResult | null> {
  try {
    const pb = await getPocketBaseInstance();

    // Fetch user by email to get the salt
    const user = await pb.collection("users").getFirstListItem(`email="${email}"`);
    if (!user) {
      console.error("User not found");
      return null;
    }

    // Concatenate salt with password and hash it
    const saltedPassword = user.salt + password;
    const hashedPassword = crypto.createHash("sha256").update(saltedPassword).digest("hex");

    // Check if the hashed password matches
    if (user.password === hashedPassword) {
      // Generate JWT token
      const token = generateToken({ id: user.id, email: user.email, displayName: user.displayName });
      return { 
        user: { id: user.id, email: user.email, displayName: user.displayName }, 
        token 
      };
    } else {
      console.error("Invalid credentials");
      return null;
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}

// Registration
export async function registerUser(email: string, password: string, displayName: string): Promise<User> {
  try {
    const pb = await getPocketBaseInstance();

    // Check if email is already taken
    const existingUser = await pb.collection("users").getFirstListItem(`email="${email}"`).catch(() => null);
    if (existingUser) {
      throw new Error("Email is already taken");
    }

    // Generate salt and hash the password
    const salt = crypto.randomBytes(16).toString("hex");
    const saltedPassword = salt + password;
    const hashedPassword = crypto.createHash("sha256").update(saltedPassword).digest("hex");

    // Save the new user in the database
    const newUser = await pb.collection("users").create({
      email,
      password: hashedPassword,
      salt,
      displayName,
    });

    return { id: newUser.id, email: newUser.email, displayName: newUser.displayName };
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

// Client-side Auth Management
export function getStoredToken(): string | null {
  return sessionStorage.getItem("token");
}

export function setStoredToken(token: string): void {
  sessionStorage.setItem("token", token);
}

export function removeStoredToken(): void {
  sessionStorage.removeItem("token");
}

export function createUserFromToken(decodedToken: DecodedToken): User {
  return {
    id: decodedToken.id,
    email: decodedToken.email,
    displayName: decodedToken.email.split('@')[0] // Use email prefix as display name
  };
}

// API Verification
export async function verifyTokenWithAPI(token: string): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const response = await fetch("/api/auth/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message };
    }
  } catch (error) {
    console.error("Token verification error:", error);
    return { success: false, error: "Token verification failed" };
  }
}