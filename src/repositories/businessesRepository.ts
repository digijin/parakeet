import { getPocketBaseInstance } from "@/lib/pocketbase";

// Define an interface for the business data
export interface Business {
  id: string;
  name: string;
  // Add other fields here as needed, according to your PocketBase collection
  created: string;
  updated: string;
  // ... add other relevant fields from your collection
}

export async function getBusinesses(): Promise<Business[]> {
  try {
    const pb = await getPocketBaseInstance();
    const businessesList: Business[] = await pb.collection("businesses").getFullList({
      sort: "-created", // You can adjust the sorting as needed
    });
    return businessesList;
  } catch (error) {
    console.error("Error fetching businesses:", error);
    return [];
  }
}

export async function getBusinessById(id: string): Promise<Business | null> {
    try {
      const pb = await getPocketBaseInstance();
      const business: Business = await pb.collection("businesses").getOne(id);
      return business;
    } catch (error) {
      console.error(`Error fetching business with ID ${id}:`, error);
      return null;
    }
  }

export async function createBusiness(businessData: Partial<Business>): Promise<Business | null> {
  try {
    const pb = await getPocketBaseInstance();
    const newBusiness: Business = await pb.collection("businesses").create(businessData);
    return newBusiness;
  } catch (error) {
    console.error("Error creating business:", error);
    return null;
  }
}

export async function updateBusiness(id: string, businessData: Partial<Business>): Promise<Business | null> {
  try {
    const pb = await getPocketBaseInstance();
    const updatedBusiness: Business = await pb.collection("businesses").update(id, businessData);
    return updatedBusiness;
  } catch (error) {
    console.error(`Error updating business with ID ${id}:`, error);
    return null;
  }
}

export async function deleteBusiness(id: string): Promise<boolean> {
  try {
    const pb = await getPocketBaseInstance();
    await pb.collection("businesses").delete(id);
    return true;
  } catch (error) {
    console.error(`Error deleting business with ID ${id}:`, error);
    return false;
  }
}
