import type { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { placeId } = req.query;

    if (!placeId) {
      return res.status(400).json({ error: "placeId is required" });
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status !== "OK") {
        return res.status(500).json({ error: data.error_message });
      }

      const reviews = data.result.reviews || [];
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}