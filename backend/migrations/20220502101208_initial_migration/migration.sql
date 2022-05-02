-- CreateEnum
CREATE TYPE "InstitutionGenderType" AS ENUM ('mixed', 'f', 'm');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "email" TEXT NOT NULL DEFAULT E'',
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Institution" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "slug" TEXT NOT NULL DEFAULT E'',
    "owner" TEXT,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "gender" "InstitutionGenderType" NOT NULL,
    "ageFrom" INTEGER NOT NULL,
    "ageTo" INTEGER NOT NULL,
    "placesAvailable" INTEGER NOT NULL,
    "placesTotal" INTEGER NOT NULL,
    "street" TEXT NOT NULL DEFAULT E'',
    "streetNumber" TEXT NOT NULL DEFAULT E'',
    "zip" INTEGER NOT NULL,
    "city" TEXT NOT NULL DEFAULT E'',
    "positionLat" DOUBLE PRECISION,
    "positionLng" DOUBLE PRECISION,
    "homepage" TEXT NOT NULL DEFAULT E'',
    "email" TEXT NOT NULL DEFAULT E'',
    "phone" TEXT NOT NULL DEFAULT E'',
    "mobilePhone" TEXT NOT NULL DEFAULT E'',
    "description" JSONB NOT NULL DEFAULT E'[{"type":"paragraph","children":[{"text":""}]}]',
    "logo_filesize" INTEGER,
    "logo_extension" TEXT,
    "logo_width" INTEGER,
    "logo_height" INTEGER,
    "logo_mode" TEXT,
    "logo_id" TEXT,
    "photo_filesize" INTEGER,
    "photo_extension" TEXT,
    "photo_width" INTEGER,
    "photo_height" INTEGER,
    "photo_mode" TEXT,
    "photo_id" TEXT,

    CONSTRAINT "Institution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Institution_slug_key" ON "Institution"("slug");

-- CreateIndex
CREATE INDEX "Institution_owner_idx" ON "Institution"("owner");

-- AddForeignKey
ALTER TABLE "Institution" ADD CONSTRAINT "Institution_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
