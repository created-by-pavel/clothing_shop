/*
  Warnings:

  - You are about to drop the column `totalPrice` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `bDay` on the `User` table. All the data in the column will be lost.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `season` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('WAITING_FOR_DISPATCH', 'DISPATCHED', 'DELIVERED');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('S', 'M', 'L', 'XL');

-- CreateEnum
CREATE TYPE "Season" AS ENUM ('WINTER', 'SUMMER', 'SPRING', 'AUTUMN');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "totalPrice",
ADD COLUMN     "status" "Status" NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "season" "Season" NOT NULL,
ADD COLUMN     "size" "Size" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bDay",
ADD COLUMN     "DateOfBirth" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Promocode" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Promocode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Promocode_code_key" ON "Promocode"("code");

-- AddForeignKey
ALTER TABLE "Promocode" ADD CONSTRAINT "Promocode_id_fkey" FOREIGN KEY ("id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
