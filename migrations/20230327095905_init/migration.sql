/*
  Warnings:

  - Added the required column `sale` to the `Promocode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Promocode" ADD COLUMN     "sale" INTEGER NOT NULL;
