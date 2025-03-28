import crypto from "crypto";
import jwt from "jsonwebtoken";
import { getPocketBaseInstance } from "../lib/pocketbase";

// TODO: Replace with your own secret, throw error if not set
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function authenticateUser(email: string, password: string) {
  try {
    const pb = await getPocketBaseInstance();

    // Fetch user by email to get the salt
    const user = await pb.collection("users").getFirstListItem(`email="${email}"`);
    if (!user) {
      console.error("User not found");
      return null;
    }

    // Concatenate salt with password and hash it
    const saltedPassword = user.salt + password;
    const hashedPassword = crypto.createHash("sha256").update(saltedPassword).digest("hex");

    // Check if the hashed password matches
    if (user.password === hashedPassword) {
      // Generate JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
      return { user, token };
    } else {
      console.error("Invalid credentials");
      return null;
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}

export async function registerUser(email: string, password: string, displayName: string) {
  try {
    const pb = await getPocketBaseInstance();

    // Check if email is already taken
    const existingUser = await pb.collection("users").getFirstListItem(`email="${email}"`).catch(() => null);
    if (existingUser) {
      throw new Error("Email is already taken");
    }

    // Generate salt and hash the password
    const salt = crypto.randomBytes(16).toString("hex");
    const saltedPassword = salt + password;
    const hashedPassword = crypto.createHash("sha256").update(saltedPassword).digest("hex");

    // Save the new user in the database
    const newUser = await pb.collection("users").create({
      email,
      password: hashedPassword,
      salt,
      displayName,
    });

    return newUser;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}
