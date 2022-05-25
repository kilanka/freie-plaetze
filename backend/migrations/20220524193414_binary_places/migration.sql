/*
  Warnings:

  - You are about to drop the column `placesAvailable` on the `Institution` table. All the data in the column will be lost.
  - You are about to drop the column `placesTotal` on the `Institution` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Institution" DROP COLUMN "placesAvailable",
DROP COLUMN "placesTotal",
ADD COLUMN     "arePlacesAvailable" BOOLEAN NOT NULL DEFAULT false;
