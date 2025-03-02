import { NextResponse } from "next/server";
import { authenticateUser } from "@/repositories/authRepository";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const authResult = await authenticateUser(email, password);

    if (authResult) {
      const { user, token } = authResult;
      return NextResponse.json({ message: "Login successful", user, token });
    } else {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.error();
  }
}
