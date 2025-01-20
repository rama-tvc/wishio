"use client";

interface WishListData {
  title: string;
  description?: string;
  visibility: string;
}
const basePath = "/my-app";
const addUserWishList = async (data: WishListData) => {
  try {
    const response = await fetch(`${basePath}/api/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Ошибка при создании списка: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export default addUserWishList;
