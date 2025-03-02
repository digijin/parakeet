import PocketBase from "pocketbase";
import dotenv from "dotenv";
import schemas from "../src/config/schema/index";

dotenv.config({path: ".env.local"});

const pb = new PocketBase("http://127.0.0.1:8090");

async function setupPocketBase() {
  try {
    // Authenticate as admin
    const adminEmail = process.env.PB_ADMIN_EMAIL as string;
    const adminPassword = process.env.PB_ADMIN_PASSWORD as string;
    await pb.collection("_superusers").authWithPassword(adminEmail, adminPassword);

    // Iterate over all schemas and create or update collections
    for (const schema of schemas) {
      const existingCollection = await pb.collections.getOne(schema.name).catch(() => null);

      if (existingCollection) {
        const updatedCollection = await pb.collections.update(existingCollection.id, {
          schema: schema.schema,
        });
        console.log(`${schema.name} collection updated:`, updatedCollection);
      } else {
        const newCollection = await pb.collections.create({
          name: schema.name,
          type: "base",
          schema: schema.schema,
        });
        console.log(`${schema.name} collection created:`, newCollection);
      }
    }
  } catch (error) {
    console.error("Error setting up PocketBase:", error);
  }
}

//setupPocketBase();
console.log("deprecated, use migrations instead");