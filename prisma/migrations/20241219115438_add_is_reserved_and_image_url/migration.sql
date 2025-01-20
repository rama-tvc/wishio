/*
  Warnings:

  - You are about to drop the `_WishToWishlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_WishToWishlist_B_index";

-- DropIndex
DROP INDEX "_WishToWishlist_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_WishToWishlist";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Wish" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "wishlistId" TEXT,
    "isReserved" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Wish_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Wish_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Wishlist" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Wish" ("createdAt", "id", "title", "updatedAt", "userId", "wishlistId") SELECT "createdAt", "id", "title", "updatedAt", "userId", "wishlistId" FROM "Wish";
DROP TABLE "Wish";
ALTER TABLE "new_Wish" RENAME TO "Wish";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
