import { NextResponse } from "next/server";
import { getUsers } from "../../../repositories/usersRepository";

export async function GET() {
  try {
    const users = await getUsers();
    return NextResponse.json(users);
  } catch {
    return new Response(JSON.stringify({ message: "Failed to fetch users" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
