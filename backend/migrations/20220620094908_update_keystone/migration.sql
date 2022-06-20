/*
  Warnings:

  - You are about to drop the column `logo_mode` on the `Institution` table. All the data in the column will be lost.
  - You are about to drop the column `photo_mode` on the `Institution` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Institution" DROP COLUMN "logo_mode",
DROP COLUMN "photo_mode";
