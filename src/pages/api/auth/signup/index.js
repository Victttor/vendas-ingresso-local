import { createUser, getUserByEmail } from "@/repositorio/user.repo.mjs";

export default async function handler(req, res) {
    console.log("api/auth/signup");
    if (req.method === 'POST') {
        let { email, password, first_name, last_name } = req.body;
        if (!email || !password || !first_name || !last_name) {
            res.status(400).send({message: 'Campos obrigatorios nao foram preenchidos'});
            return;
        }

        let exists = await getUserByEmail(email);
        if (exists) {
            res.status(400).send({message: 'Usuario ja existe'});
            return;
        }
        
        let new_user = { email, password, first_name, last_name, is_admin: false};
        
        try {
            let created = await createUser(new_user);
            let {password, ...user} = created;
            res.status(201).send(user);
        } catch(err) {
            console.error(err);
            res.status(500).send({message: err.message});
            return;
        }

    } else {
        res.status(405).send({message: 'Method not allowed'});
    }
}