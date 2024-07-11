// pages/api/ExamenEstudiantes/guardar-respuestas.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { examenId, estudianteId, respuestas } = req.body;

    try {
      const examenEstudiante = await db.examenesEstudiantes.createMany({
        data: respuestas.map((respuesta: any) => ({
          examenId: Number(examenId),
          estudianteId: Number(estudianteId),
          respuestaId: respuesta.respuestaId,
          preguntaId: respuesta.preguntaId,
        })),
      });

      res.status(201).json({ message: 'Respuestas guardadas exitosamente', examenEstudiante });
    } catch (error) {
      console.error('Error al guardar respuestas:', error);
      res.status(500).json({ error: 'Error al guardar respuestas' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}



