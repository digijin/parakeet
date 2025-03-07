import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    console.log("[verify] Starting token verification");
    const { token } = await request.json();
    console.log("[verify] Received token:", token ? "present" : "missing");
    
    if (!token) {
      console.log("[verify] No token provided");
      return NextResponse.json({ message: "No token provided" }, { status: 400 });
    }

    console.log("[verify] Attempting to verify token");
    const decodedToken = verifyToken(token);
    console.log("[verify] Decoded token:", decodedToken ? "valid" : "invalid");
    
    if (!decodedToken) {
      console.log("[verify] Token verification failed");
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    console.log("[verify] Token verified successfully");
    return NextResponse.json({ 
      message: "Token verified", 
      decoded: decodedToken 
    });
  } catch (error) {
    console.error("[verify] Token verification error:", error);
    return NextResponse.json({ 
      message: "Token verification failed",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 401 });
  }
} 