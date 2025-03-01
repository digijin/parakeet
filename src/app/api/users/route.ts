import { NextResponse } from "next/server";
import { getUsers } from "../../../repositories/usersRepository";

export async function GET() {
  try {
    const users = await getUsers();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.error();
  }
}
