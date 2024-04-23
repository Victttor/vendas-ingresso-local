
import { PrismaClient } from "@prisma/client";
import {authOptions} from "./auth/[...nextauth]"
import { getServerSession } from "next-auth/next"


export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    if (session) {
        console.log("session.user", session.user);
    }
    if (req.method === 'GET') {
        return handleGetIngressos(req, res);
    }
    if (req.method === 'POST') {
        return handlePostIngressos(req, res);
    }
    res.status(405).send({});
}

async function handleGetIngressos(req, res) {
    const prisma = new PrismaClient()
    let ingressos = await prisma.ingresso.findMany();
    res.status(201).send(ingressos);
}

async function handlePostIngressos(req, res) {
    let prisma = new PrismaClient();
    let ingresso = await prisma.ingresso.create({data: req.body});
    res.status(201).send(ingresso);
}
