// pages/api/auth/naver/save-user.ts
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

  const user = req.body;
  try {
    console.log("user:", user)
    res.status(201).json({ message: "User info saved successfully", user });
  } catch (error) {
    console.error("Error saving user info:", error);
    res.status(500).json({ error: "Failed to save user info" });
  }
};
