/*
  Warnings:

  - Added the required column `user_id` to the `ShoppingSession` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ShoppingSession" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "total" DECIMAL NOT NULL DEFAULT 0.00,
    "user_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "ShoppingSession_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ShoppingSession" ("created_at", "id", "total", "updated_at") SELECT "created_at", "id", "total", "updated_at" FROM "ShoppingSession";
DROP TABLE "ShoppingSession";
ALTER TABLE "new_ShoppingSession" RENAME TO "ShoppingSession";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
