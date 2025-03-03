import { getPocketBaseInstance } from "@/lib/pocketbase";

export async function getUsers() {
  try {
    const pb = await getPocketBaseInstance();
    const usersList = await pb.collection("users").getFullList();
    return usersList;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
