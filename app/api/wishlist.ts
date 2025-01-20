import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma"; // Убедитесь, что путь правильный

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { title, description, visibility } = req.body;

      console.log("Received data:", { title, description, visibility });

      if (!title || !visibility) {
        return res.status(400).json({ message: "Заполните обязательные поля." });
      }

      const wishList = await prisma.wishlist.create({
        data: {
          title,
          description: description || null,
          visibility,
        },
      });

      console.log("Wishlist created:", wishList);

      return res.status(200).json(wishList);
    } catch (error) {
      console.error("Error in API handler:", error);
      res.status(500).json({ message: "Ошибка обработки запроса." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Метод ${req.method} не разрешён`);
  }
}
