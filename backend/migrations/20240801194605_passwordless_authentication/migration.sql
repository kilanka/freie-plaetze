/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordResetIssuedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordResetRedeemedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordResetToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
DROP COLUMN "passwordResetIssuedAt",
DROP COLUMN "passwordResetRedeemedAt",
DROP COLUMN "passwordResetToken",
ADD COLUMN     "authToken" TEXT,
ADD COLUMN     "authTokenIssuedAt" TIMESTAMP(3),
ADD COLUMN     "authTokenRedeemed" BOOLEAN NOT NULL DEFAULT false;
