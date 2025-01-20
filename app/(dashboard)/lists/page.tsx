"use client";

import { createWishlist } from "@/actions/create-wishlist";
import getUserWishlists from "@/actions/get-wishlists";
import { Wishlist } from "@prisma/client";
import { FormEventHandler, useEffect, useState } from "react";

export default function WishlistsPage() {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);

  const fetchUserWishlists = async () => {
    const data = await getUserWishlists();

    setWishlists(data);
  };

  useEffect(() => {
    // fetch("/api/wishlists?userId=1")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setWishlists(data);
    //   });

    fetchUserWishlists();
  }, []);

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target as HTMLFormElement);

    const title = data.get("title");

    try {
      await createWishlist(title as string);

      fetchUserWishlists();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      Wishlists Page
      <ul>
        {wishlists.map((wishlist) => (
          <li key={wishlist.id}>{wishlist.title}</li>
        ))}
      </ul>
      <form onClick={onSubmit}>
        <input type="text" placeholder="Title" name="title" />

        <button>Create</button>
      </form>
    </div>
  );
}
