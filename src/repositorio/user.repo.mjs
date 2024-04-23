import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";

export async function createUser(user) {
  let {email, first_name, last_name, password, is_admin} = user;
  if (!email || !first_name || !last_name || !password) {
    throw new Error('Campos obrigatorios nao foram preenchidos')
  }

  password = await bcrypt.hash(password, 10);
  const prisma = new PrismaClient()
  return await prisma.user.create({ data: { email, first_name, last_name, password, is_admin }});
}

export async function getUserByEmail(email) {
  const prisma = new PrismaClient()
  let u = await prisma.user.findUnique({ where: { email } });
  return u;
}

export async function getUserById(id) {
  const prisma = new PrismaClient()
  return prisma.user.findUnique({ where: { id } });
}

export async function deleteUser(id) {
  const prisma = new PrismaClient()
  return prisma.user.delete({ where: { id } });
}

export async function updateUser(id, user) {
  const prisma = new PrismaClient()
  let {email, first_name, last_name, password, is_admin} = user;
  if (!email || !first_name || !last_name || !password) {
    throw new Error('Campos obrigatorios nao foram preenchidos')
  }
  password = await bcrypt.hash(password, 10);
  return prisma.user.update({ where: { id }, data: user });
}

export async function checkUserPassword(email, password) {
  const prisma = new PrismaClient()
  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return false;
  }
  return await bcrypt.compare(password, user.password);
}