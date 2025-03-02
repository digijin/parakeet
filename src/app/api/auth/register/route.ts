import { NextResponse } from "next/server";
import { registerUser } from "@/repositories/authRepository";

export async function POST(request: Request) {
  try {
    const { email, password, displayName } = await request.json();
    const newUser = await registerUser(email, password, displayName);

    return NextResponse.json({ message: "Registration successful", user: newUser });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: "An unknown error occurred" }, { status: 400 });
  }
}
