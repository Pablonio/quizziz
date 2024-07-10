/*
  Warnings:

  - Added the required column `correcta` to the `Respuesta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Respuesta" ADD COLUMN     "correcta" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "NotaFinal" (
    "id" SERIAL NOT NULL,
    "examenId" INTEGER NOT NULL,
    "puntajeTotal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "NotaFinal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NotaFinal" ADD CONSTRAINT "NotaFinal_examenId_fkey" FOREIGN KEY ("examenId") REFERENCES "Examen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
