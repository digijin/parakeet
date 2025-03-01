import PocketBase from "pocketbase";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const pb = new PocketBase(process.env.NEXT_PUBLIC_DB_URL);

async function authenticate() {
  const adminEmail = process.env.NEXT_PUBLIC_DB_EMAIL as string;
  const adminPassword = process.env.NEXT_PUBLIC_DB_PASSWORD as string;
  console.log("Authenticating as admin...");
  console.log("Admin email:", adminEmail);
  console.log("Admin password:", adminPassword);

  try {
    const authData = await pb.collection('db_users').authWithPassword(adminEmail, adminPassword);
    console.log("Authentication successful:", authData);
  } catch (error) {
    console.error("Authentication failed:", error);
  }
}

export async function getPocketBaseInstance() {
  await authenticate();
  return pb;
}
