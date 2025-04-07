-- AlterTable
ALTER TABLE "User" ADD COLUMN     "countryId" INTEGER,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "photo" TEXT,
ADD COLUMN     "sex" TEXT NOT NULL DEFAULT 'Male';

-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "photo" TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;
