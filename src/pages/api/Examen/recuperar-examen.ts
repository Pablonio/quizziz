// pages/api/examen/recuperar-examen.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { examenId } = req.body;

    try {
      const examen = await db.examen.findUnique({
        where: { id: Number(examenId) }, // Asegúrate de convertir examenId a número si es necesario
        include: {
          preguntas: {
            include: {
              respuestas: true,
            },
          },
        },
      });

      if (!examen) {
        return res.status(404).json({ error: 'Examen not found' });
      }

      res.status(200).json(examen);
    } catch (error) {
      console.error('Failed to fetch examen:', error);
      res.status(500).json({ error: 'Failed to fetch examen' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

