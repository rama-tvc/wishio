"use client";

import { getWishlists } from "@/actions/get-wishlists";
import { useEffect, useState } from "react";

export default function WishlistsPage() {
  const [wishlists, setWishlists] = useState([]);

  useEffect(() => {
    fetch("/api/wishlists?userId=1")
      .then((res) => res.json())
      .then((data) => {
        setWishlists(data);
      });

    // getWishlists("1").then((data) => {
    //   setWishlists(data);
    // });
  }, []);

  return <div>Wishlists Page</div>;
}
