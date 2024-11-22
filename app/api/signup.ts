import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

const users: { id: number; username: string; password: string; salt: string }[] = [];

function hashPassword(password: string, salt: string): string {
  return crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body;

  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }


  const salt = crypto.randomBytes(16).toString("hex");
  const hashedPassword = hashPassword(password, salt);

  users.push({
    id: users.length + 1,
    username,
    password: hashedPassword,
    salt,
  });

  return res.status(201).json({ message: "User created successfully" });
}
 