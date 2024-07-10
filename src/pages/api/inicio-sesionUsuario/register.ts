// pages/api/auth/register.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import {db} from '../../../lib/lib';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { userName, correo, contrasena } = req.body;

        const hashedPassword = await hash(contrasena, 10);

        try {
        const user = await db.usuario.create({
            data: {
                rol: "Usuario",
                userName,
                correo,
                contrasena: hashedPassword,
            },
        });
        res.status(201).json(user);
        } catch (error) {
        res.status(500).json({ error: 'User creation failed'});
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }     
}
