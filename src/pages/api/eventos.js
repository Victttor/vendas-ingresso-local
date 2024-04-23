import {authOptions} from "./auth/[...nextauth]"
import { getServerSession } from "next-auth/next"
import { PrismaClient } from "@prisma/client";
import Eventos from "@/app/admin/eventos/page";

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    if (session) {
        console.log("session.user", session.user);
    }
    if (req.method === 'GET') {
        return handleGetEventos(req, res);
    }
    if (req.method === 'POST') {
        return handleCreateEvento(req, res);
    }
    res.status(405).send({});
}

async function handleGetEventos(req, res) {
    const prisma = new PrismaClient()
    let eventos = await prisma.evento.findMany();
    res.status(201).send(eventos);
}

async function handleCreateEvento(req, res) {
    const prisma = new PrismaClient();
    try {
        // Obtenha a data e hora atual
        const dataEvento = new Date().toISOString();

        // Crie o evento no banco de dados usando o Prisma e inclua a dataEvento
        const evento = await prisma.evento.create({
            data: {
                ...req.body,
                dataEvento: dataEvento
            }
        });

        res.status(201).send(evento);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erro ao criar evento' });
    }
}
