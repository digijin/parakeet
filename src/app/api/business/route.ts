// src/app/api/businesses/route.ts

import { NextResponse } from "next/server";
import { getBusinesses, createBusiness, deleteBusiness, updateBusiness } from "@/repositories/businessesRepository";

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

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    const newBusiness = await createBusiness({ name });

    if (newBusiness) {
      return NextResponse.json(newBusiness, { status: 201 });
    } else {
      return NextResponse.json({ message: "Failed to create business" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error creating business in api:", error);
    return NextResponse.json({ message: "Failed to create business" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json({ message: "Business ID is required" }, { status: 400 });
    }

    const success = await deleteBusiness(id);
    return success ? NextResponse.json({ message: "Business deleted successfully" }) : NextResponse.json({ message: "Failed to delete business" }, { status: 500 });
  } catch (error) {
    console.error("Error deleting business in api:", error);
    return NextResponse.json({ message: "Failed to delete business" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const { name } = await request.json();

    if (!id) {
      return NextResponse.json({ message: "Business ID is required" }, { status: 400 });
    }

    const updatedBusiness = await updateBusiness(id, { name });
    if (updatedBusiness) {
      return NextResponse.json(updatedBusiness);
    } else {
      return NextResponse.json({ message: "Failed to update business" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Failed to update business" }, { status: 500 });
  }
}

