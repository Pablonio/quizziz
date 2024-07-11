// pages/api/examenes/recuperar-todos.ts
import { NextApiRequest, NextApiResponse } from 'next';
import {db} from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const examenes = await db.examen.findMany();
      res.status(200).json(examenes);
    } catch (error) {
      console.error('Error al recuperar todos los exámenes:', error);
      res.status(500).json({ error: 'Error al recuperar los exámenes.' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
