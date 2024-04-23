
import { PrismaClient } from "@prisma/client";
import {authOptions} from "./auth/[...nextauth]"
import { getServerSession } from "next-auth/next"


export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    if (session) {
        console.log("session.user", session.user);
    }
    if (req.method === 'GET') {
        return handleGetLote(req, res);
    }
    if (req.method === 'POST') {
        return handlePostLote(req, res);
    }
    res.status(405).send({});
}

async function handleGetLote(req, res) {
    const prisma = new PrismaClient()
    let lote_ingressos = await prisma.lote_Ingresso.findMany();
    res.status(201).send(lote_ingressos);
}

async function handlePostLote(req, res) {
    let prisma = new PrismaClient();
    let lote_Ingresso = await prisma.lote_Ingresso.create({data: req.body});
    res.status(201).send(lote_Ingresso);
}
