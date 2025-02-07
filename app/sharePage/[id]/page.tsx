"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

export default function LinkPage() {
  const { data: session } = useSession();
  const [routingId, setRountingId] = useState("");
  const params = useParams();
  const router = useRouter();
  const tokenId = Array.isArray(params?.id) ? params.id[0] : params?.id || "";
  useEffect(() => {
    const fetchLinking = async () => {
      try {
        const response = await fetch(`/api/wishlists/token/${tokenId}`);
        if (!response.ok) {
          throw new Error("Ошибка загрузки списка желаемого");
        }

        const data = await response.json();
        console.log(data);
        setRountingId(data.id);
        console.log(routingId);
        router.push(`/wishlist/${routingId}`);
      } catch (error) {
        console.error("Ошибка при загрузке:", error);
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить список желаемого",
        });
      }
    };

    fetchLinking();
  }, [session, routingId]);

  return <div>Перенаправление</div>;
}
