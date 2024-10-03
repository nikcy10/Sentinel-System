/*
  Warnings:

  - Added the required column `address` to the `report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "report" ADD COLUMN     "address" TEXT NOT NULL;
