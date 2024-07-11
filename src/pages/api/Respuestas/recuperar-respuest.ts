// pages/api/respuesta/get.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Obtener respuestaId desde el cuerpo de la solicitud
      const { respuestaId } = req.body;

      // Buscar la respuesta específica por respuestaId
      const respuesta = await db.respuesta.findUnique({
        where: {
          id: respuestaId,
        },
      });

      if (!respuesta) {
        return res.status(404).json({ error: 'Respuesta no encontrada' });
      }

      res.status(200).json(respuesta);
    } catch (error) {
      console.error('Error al buscar respuesta:', error);
      res.status(500).json({ error: 'Error al buscar respuesta' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}

