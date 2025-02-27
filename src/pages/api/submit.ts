import type { NextApiRequest, NextApiResponse } from "next";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, email } = req.body;

    try {
      const record = await pb.collection("your_collection_name").create({
        name,
        email,
      });
      res.status(200).json({ success: true, record });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, error: error.message });
      } else {
        res.status(500).json({ success: false, error: "An unknown error occurred" });
      }
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}