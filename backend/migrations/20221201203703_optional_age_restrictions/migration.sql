-- AlterTable
ALTER TABLE "Institution" ALTER COLUMN "ageFrom" DROP NOT NULL,
ALTER COLUMN "ageTo" DROP NOT NULL;

UPDATE "Institution" SET
"ageFrom" = NullIf("ageFrom", 0),
"ageTo" = NullIf("ageTo", 99);
