"use server";
import { prisma } from "@/lib/prisma";

const setUserReserve = async (
    wishId: string,
    isReserved: boolean
  ) => {
    try {
      const updatedWish = await prisma.wish.update({
        where: {
          id: wishId,
        },
        data: {
          isReserved,
        },
      });
      return updatedWish;
    } catch (e) {
      console.error("Error:", e);
      throw new Error("Failed to update");
    }
  };
  export default setUserReserve;