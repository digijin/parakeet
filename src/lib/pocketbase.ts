import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.NEXT_PUBLIC_DB_URL);

async function authenticate() {
  const adminEmail = process.env.PB_ADMIN_EMAIL as string;
  const adminPassword = process.env.PB_ADMIN_PASSWORD as string;
  console.log("Authenticating as admin...");
  console.log("Admin email:", adminEmail);
  try {
    const authData = await pb.collection('_superusers').authWithPassword(adminEmail, adminPassword);
    console.log("Authentication successful:", authData);
  } catch (error) {
    console.error("Authentication failed:", error);
  }
}

export async function getPocketBaseInstance() {
  await authenticate();
  return pb;
}
