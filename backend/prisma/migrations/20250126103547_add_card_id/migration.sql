/*
  Warnings:

  - Added the required column `cardID` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "party" TEXT NOT NULL,
    "cardID" TEXT NOT NULL
);
INSERT INTO "new_Vote" ("id", "party") SELECT "id", "party" FROM "Vote";
DROP TABLE "Vote";
ALTER TABLE "new_Vote" RENAME TO "Vote";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
