// pages/api/usuario/auth.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: 'JWT_SECRET not defined' });
  }

  const JWT_SECRET = process.env.JWT_SECRET;

  if (req.method === 'POST') {
    const { identificador, contrasena } = req.body;

    try {
      let user = await db.usuario.findFirst({
        where: {
          OR: [
            { correo: identificador },
            { userName: identificador },
          ],
        },
      });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const passwordMatch = await compare(contrasena, user.contrasena);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(200).json({ token });
    } catch (error) {
      console.error('Login failed:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  } else if (req.method === 'GET') {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token not provided' });
    }

    try {
      const decoded = verify(token, JWT_SECRET) as { userId: number };
      const user = await db.usuario.findUnique({ where: { id: decoded.userId } });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
