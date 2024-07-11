-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'Estudiante',

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Examen" (
    "id" SERIAL NOT NULL,
    "nombreExamen" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "estudiantesNotaid" INTEGER NOT NULL,
    "estado" TEXT NOT NULL,

    CONSTRAINT "Examen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pregunta" (
    "id" SERIAL NOT NULL,
    "pregunta" TEXT NOT NULL,
    "examenId" INTEGER NOT NULL,

    CONSTRAINT "Pregunta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Respuesta" (
    "id" SERIAL NOT NULL,
    "respuesta" TEXT NOT NULL,
    "puntucion" INTEGER NOT NULL,
    "preguntaId" INTEGER NOT NULL,
    "correcta" BOOLEAN NOT NULL,

    CONSTRAINT "Respuesta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamenesEstudiantes" (
    "id" SERIAL NOT NULL,
    "examenId" INTEGER NOT NULL,
    "estudianteId" INTEGER NOT NULL,
    "respuestaId" INTEGER NOT NULL,
    "preguntaId" INTEGER NOT NULL,

    CONSTRAINT "ExamenesEstudiantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotaFinal" (
    "id" SERIAL NOT NULL,
    "examenId" INTEGER NOT NULL,
    "puntajeTotal" DOUBLE PRECISION NOT NULL,
    "examenEstudianteId" INTEGER NOT NULL,
    "examenid" INTEGER NOT NULL,

    CONSTRAINT "NotaFinal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- AddForeignKey
ALTER TABLE "Examen" ADD CONSTRAINT "Examen_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Examen" ADD CONSTRAINT "Examen_estudiantesNotaid_fkey" FOREIGN KEY ("estudiantesNotaid") REFERENCES "NotaFinal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pregunta" ADD CONSTRAINT "Pregunta_examenId_fkey" FOREIGN KEY ("examenId") REFERENCES "Examen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Respuesta" ADD CONSTRAINT "Respuesta_preguntaId_fkey" FOREIGN KEY ("preguntaId") REFERENCES "Pregunta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamenesEstudiantes" ADD CONSTRAINT "ExamenesEstudiantes_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamenesEstudiantes" ADD CONSTRAINT "ExamenesEstudiantes_examenId_fkey" FOREIGN KEY ("examenId") REFERENCES "Examen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamenesEstudiantes" ADD CONSTRAINT "ExamenesEstudiantes_respuestaId_fkey" FOREIGN KEY ("respuestaId") REFERENCES "Respuesta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamenesEstudiantes" ADD CONSTRAINT "ExamenesEstudiantes_preguntaId_fkey" FOREIGN KEY ("preguntaId") REFERENCES "Pregunta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotaFinal" ADD CONSTRAINT "NotaFinal_examenEstudianteId_fkey" FOREIGN KEY ("examenEstudianteId") REFERENCES "ExamenesEstudiantes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
