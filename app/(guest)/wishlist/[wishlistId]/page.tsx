export default async function GuestShowWishlist({
  params,
}: {
  params: Promise<{
    wishlistId: string;
  }>;
}) {
  const { wishlistId } = await params;
  // const wishlist = await fetchWishlist(wishlistId);
  return <div>{wishlistId}</div>;
}
