"use client";

import AddGift from "@/components/AddGift";
import WishlistPage from "./wishlist/[userId]/[wishlistId]/page";
import CreateWishlist from "./create-wishlist/page";
import Dashboard from "./dashboard/page";

// import Hero from "@/components/Hero";
// import Features from "@/components/Features";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <WishlistPage />
      </main>
    </div>
  );
}
