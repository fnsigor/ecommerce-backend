
import { FastifyInstance } from "fastify";
const fp = require('fastify-plugin'); 7
import jwt from "jsonwebtoken";


module.exports = fp(async (fastify: FastifyInstance) => {

    fastify.register(require("@fastify/jwt"), {
        secret: process.env.SECRET_KEY
    })

    fastify.decorate('authenticate', async (req: any, res: any): Promise<any> => {
        try {

            const token = req.headers.authorization

            if(!token) {
                return res.status(401).send({ message: 'Faça login para realizar essa ação'})
            }

            jwt.verify(token, process.env.SECRET_KEY as string, async (error: any, decoded: any) => {
                if (error) {
                    console.log(error)
                    return res.status(401).send({ message: 'Faça login para realizar essa ação' })
                }
            });

        } catch (err) {
            console.log(err)
            return res.status(401).send({ message: 'Faça login para realizar essa ação' })
        }
    });
});