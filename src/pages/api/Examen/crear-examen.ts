// pages/api/examen/create.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nombreExamen, usuarioId, estado } = req.body;

    try {
      const examen = await db.examen.create({
        data: {
          nombreExamen,
          estado,
          usuario: {
            connect: {
              id: usuarioId,
            },
          },
        },
      });
      res.status(201).json(examen);
    } catch (error) {
      console.error('Error al crear el examen:', error);
      res.status(500).json({ error: 'Error al crear el examen' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
