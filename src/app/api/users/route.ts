import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/database/prisma';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true
            }
        });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

interface PutRequestBody {
    emailUsuario: string;
    senha: string;
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { emailUsuario, senha }: PutRequestBody = req.body;

        if (!emailUsuario || !senha) {
            return res.status(400).json({
                campo: 'input',
                message: 'E-mail e senha são obrigatórios.'
            });
        }

        const emailExists = await prisma.user.findUnique({
            where: { email: emailUsuario },
            select: { email: true }
        });

        if (emailExists) {
            return res.status(400).json({
                campo: 'emailUsuario',
                message: 'Este e-mail já está registrado.'
            });
        }

        if (senha.length < 8) {
            return res.status(400).json({
                campo: 'senha',
                message: 'A senha deve ter pelo menos 8 caracteres.'
            });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);

        const user = await prisma.user.create({
            data: {
                email: emailUsuario,
                password: hashedPassword
            },
            select: { id: true }
        });

        return res.status(201).json({ usuarioId: user.id });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
