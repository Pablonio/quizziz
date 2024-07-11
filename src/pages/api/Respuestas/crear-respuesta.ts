// pages/api/respuesta/create.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { respuesta, puntucion, preguntaId, correcta } = req.body;

    try {
      const nuevaRespuesta = await db.respuesta.create({
        data: {
          respuesta,
          puntucion,
          preguntaId,
          correcta,
        },
      });
      res.status(201).json(nuevaRespuesta);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create respuesta' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
