import { PrismaClient } from '@prisma/client'

export async function createCliente(cliente) {
    const prisma = new PrismaClient()
    return await prisma.cliente.create({ data: cliente });
}

export async function getClientes() {
    const prisma = new PrismaClient()
    return await prisma.cliente.findMany();
}

export async function getClienteById(id) {
    const prisma = new PrismaClient()
    return await prisma.cliente.findUnique({ where: { id } });
}

export async function getClienteByEmail(email) {
    const prisma = new PrismaClient()
    let user = await prisma.user.findUnique({ where: { email } });
    return await prisma.cliente.findFirst({ where: { user_id: user.id } });
}
