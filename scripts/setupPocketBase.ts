import PocketBase from "pocketbase";
import dotenv from "dotenv";
import { reviewsSchema } from "../src/config/schema";

dotenv.config();

const pb = new PocketBase("http://127.0.0.1:8090");

async function setupPocketBase() {
  try {
    // Authenticate as admin
    const adminEmail = process.env.PB_ADMIN_EMAIL as string;
    const adminPassword = process.env.PB_ADMIN_PASSWORD as string;
    await pb.admins.authWithPassword(adminEmail, adminPassword);

    // Create the "reviews" collection
    const reviewsCollection = await pb.collections.create({
      name: "reviews",
      type: "base",
      schema: reviewsSchema,
    });

    console.log("Reviews collection created:", reviewsCollection);
  } catch (error) {
    console.error("Error setting up PocketBase:", error);
  }
}

setupPocketBase();