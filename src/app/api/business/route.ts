// src/app/api/businesses/route.ts

import { NextResponse } from "next/server";
import { getBusinesses } from "@/repositories/businessesRepository";

export async function GET() {
  try {
    const businesses = await getBusinesses();

    // Return the list of businesses as JSON
    return NextResponse.json(businesses);
  } catch (error) {
    console.error("Error fetching businesses in api:", error);
    return NextResponse.json(
      { message: "Failed to fetch businesses" },
      { status: 500 }
    );
  }
}
