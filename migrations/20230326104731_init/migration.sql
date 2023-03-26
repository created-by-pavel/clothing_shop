/*
  Warnings:

  - You are about to drop the column `season` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "season",
ADD COLUMN     "collectionId" INTEGER;

-- AlterTable
ALTER TABLE "Promocode" ADD COLUMN     "expiredDate" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Collection" (
    "id" SERIAL NOT NULL,
    "year" TIMESTAMP(3) NOT NULL,
    "season" "Season" NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
