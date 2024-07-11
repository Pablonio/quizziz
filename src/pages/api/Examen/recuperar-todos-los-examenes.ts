import { NextApiRequest, NextApiResponse } from 'next';
import {db} from '../../../lib/lib'; // Asegúrate de tener prisma configurado

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'Usuario ID es requerido' });
    }

    try {
      const examenes = await db.examen.findMany({
        where: {
          id: Number(userId),
        },
        include: {
          preguntas: {
            include: {
              respuestas: true,
            },
          },
        },
      });

      return res.status(200).json(examenes);
    } catch (error) {
      console.error('Error al recuperar exámenes:', error);
      return res.status(500).json({ error: 'Error al recuperar exámenes' });
    }
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
};

export default handler;
