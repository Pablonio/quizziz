// pages/api/pregunta/get.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const preguntas = await db.pregunta.findMany();
      res.status(200).json(preguntas);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch preguntas' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
