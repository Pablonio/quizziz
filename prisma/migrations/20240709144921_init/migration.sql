/*
  Warnings:

  - Added the required column `estado` to the `Examen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Examen" ADD COLUMN     "estado" TEXT NOT NULL;
