import { createUser, getUserByEmail } from "@/repositorio/user.repo.mjs";
import {authOptions} from "./auth/[...nextauth]"
import { getServerSession } from "next-auth/next"
import { getDepartments } from "@/repositorio/categ_ingresso.repo.mjs";
import { getProducts } from "@/repositorio/product.repo.mjs";

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    if (session) {
        console.log("session.user", session.user);
    }
    if (req.method === 'GET') {
        return handleGetProducts(req, res);
    }
    res.status(405).send({});
}

async function handleGetProducts(req, res) {
    try {
        let prods = await getProducts();
        res.status(200).send(prods);
    } catch(err) {
        console.error(err);
        res.status(500).send({message: err.message});
    }
}
