import {authOptions} from "./auth/[...nextauth]"
import { getServerSession } from "next-auth/next"

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    if (session) {
        console.log("session.user", session.user);
    }
    if (req.method === 'GET') {
        return handleGetLog(req, res);
    }
    res.status(405).send({});
}

async function handleGetLog(req, res) {
    try {
        let logs = await getLog();
        res.status(200).send(logs);
    } catch(err) {
        console.error(err);
        res.status(500).send({message: err.message});
    }
}
