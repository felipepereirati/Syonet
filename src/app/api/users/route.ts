import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/database/prisma';

// In this file, we can define any type of request as follows:
// export async function GET(Request) {}
// export async function HEAD(Request) {}
// export async function POST(Request) {}
// export async function PUT(Request) {}
// export async function DELETE(Request) {}
//  A simple GET Example

export async function GET(Request: NextApiRequest) {
    return new Response('This is a new API route');
}

export async function PUT(request: Request, response: NextApiResponse) {
    const { emailUsuario, senha } = await request.json();

    const emailExists = await prisma.user.findUnique({
        where: {
            email: emailUsuario
        },
        select: { email: true }
    });

    if (emailExists) {
        return RetornarError('emailUsuario', 'O email já está cadastrado');
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const userId = await prisma.user.create({
        data: {
            email: emailUsuario,
            password: hashedPassword
        },
        select: { id: true }
    });

    return new Response(JSON.stringify({ usuarioId: userId }));
}

const RetornarError = (campo: string, message: string) =>
    new Response(
        JSON.stringify({
            campo: campo,
            message: message
        }),
        {
            status: 400
        }
    );
