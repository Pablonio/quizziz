/*
  Warnings:

  - You are about to drop the column `examenId` on the `NotaFinal` table. All the data in the column will be lost.
  - You are about to drop the column `examenid` on the `NotaFinal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NotaFinal" DROP COLUMN "examenId",
DROP COLUMN "examenid";
