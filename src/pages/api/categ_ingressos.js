
import { PrismaClient } from "@prisma/client";
import {authOptions} from "./auth/[...nextauth]"
import { getServerSession } from "next-auth/next"


export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    if (session) {
        console.log("session.user", session.user);
    }
    if (req.method === 'GET') {
        return handleGetCategoria(req, res);
    }
    if (req.method === 'POST') {
        return handlePostCategoria(req, res);
    }
    res.status(405).send({});
}

async function handleGetCategoria(req, res) {
    const prisma = new PrismaClient()
    let categ_ingressos = await prisma.categ_Ingresso.findMany();
    res.status(201).send(categ_ingressos);
}

async function handlePostCategoria(req, res) {
    let prisma = new PrismaClient();
    let categ_Ingresso = await prisma.categ_Ingresso.create({data: req.body});
    res.status(201).send(categ_Ingresso);
}
