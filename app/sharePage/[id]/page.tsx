"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { getWishlistByToken } from "@/actions/wishlists/actions";
import { useEffect } from "react";

export default function LinkPage() {
  const params = useParams();
  const tokenId = Array.isArray(params?.id) ? params.id[0] : params?.id || "";
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL;

  useEffect(() => {
    const fetchShare = async () => {
      try {
        const response = await getWishlistByToken(tokenId);
        const id = response.id;
        router.push(`${API_BASE_URL}/wishlist/${id}`);
      } catch (e) {
        console.error(e);
      }
    };

    fetchShare();
  }, [tokenId, API_BASE_URL, router]);
}
