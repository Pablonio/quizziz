import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { examenEstudianteId, puntajeTotal } = req.body;

    try {
      const notaFinal = await db.notaFinal.create({
        data: {
          puntajeTotal,
          examenEstudianteId,
        }
      });
      res.status(201).json(notaFinal);
    } catch (error) {
      console.error('Error al crear nota final:', error);
      res.status(500).json({ error: 'Failed to create nota final' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

