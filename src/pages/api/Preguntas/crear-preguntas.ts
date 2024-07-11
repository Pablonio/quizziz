// pages/api/pregunta/create.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { pregunta, examenId } = req.body;

    try {
      const nuevaPregunta = await db.pregunta.create({
        data: {
          pregunta,
          examenId,
        },
      });
      res.status(201).json(nuevaPregunta);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create pregunta' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
