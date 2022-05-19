/*
  Warnings:

  - Added the required column `type` to the `Institution` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InstitutionTypeType" AS ENUM ('p34', 'p35', 'p35a', 'p41', 'p42');

-- AlterTable
ALTER TABLE "Institution" ADD COLUMN "type" "InstitutionTypeType" NOT NULL DEFAULT 'p34';
ALTER TABLE "Institution" ALTER COLUMN "type" DROP DEFAULT;
