import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { message } = req.body;

        try {

            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            model.generateContent("Write a story about a magic backpack.").then((result) => res.status(200).json(result.response.text()));

        } catch (error) {
            res.status(500).json({ error: error });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}