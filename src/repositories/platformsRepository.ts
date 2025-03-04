// src/repositories/platformsRepository.ts

import { getPocketBaseInstance } from "@/lib/pocketbase";

// Define an interface for the platform data
export interface Platform {
  id: string;
  name: string;
  url: string;
  // Add other fields here as needed, according to your PocketBase collection
  created: string;
  updated: string;
  // ... add other relevant fields from your collection
}


// NO CRUD OPERATIONS FOR PLATFORMS

export async function getPlatforms(): Promise<Platform[]> {
  try {
    const pb = await getPocketBaseInstance();
    const platformsList: Platform[] = await pb.collection("platforms").getFullList({
      sort: "-created", // You can adjust the sorting as needed
    });
    return platformsList;
  } catch (error) {
    console.error("Error fetching platforms:", error);
    return [];
  }
}

export async function getPlatformById(id: string): Promise<Platform | null> {
  try {
    const pb = await getPocketBaseInstance();
    const platform: Platform = await pb.collection("platforms").getOne(id);
    return platform;
  } catch (error) {
    console.error(`Error fetching platform with ID ${id}:`, error);
    return null;
  }
}
