/*
  Warnings:

  - You are about to drop the column `estudiantesNotaid` on the `Examen` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Examen" DROP CONSTRAINT "Examen_estudiantesNotaid_fkey";

-- AlterTable
ALTER TABLE "Examen" DROP COLUMN "estudiantesNotaid";
