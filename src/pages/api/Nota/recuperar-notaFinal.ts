// pages/api/nota-final/get.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const notasFinales = await db.notaFinal.findMany();
      res.status(200).json(notasFinales);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch notas finales' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
