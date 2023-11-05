import { FastifyInstance } from "fastify";
import { prisma } from "../config/prisma";
import 'dotenv/config'
import { IUser } from "../interfaces/IUser";
import { User } from "../model/User";
import { ILogin } from "../interfaces/ILogin";


export const createUser = async (app: FastifyInstance) => {

    app.post('/createUser', async (req, res) => {

        try {
            const user = req.body as IUser;

            if (!user?.name || !user?.password || !user?.email) {
                return res.status(400).send({ message: 'Erro ao cadastrar usuário. Infome nome, senha e email' })
            }

            const model = new User()

            const response = await model.create(user)

            return res.status(response.status).send({ message: response.message, data: response.data ? response.data : null })
            
        } catch (error) {
            return res.status(400).send({ message: 'Erro ao cadastrar usuário. Tente novamente mais tarde' })
        }
    })

} 


export const login = async (app: FastifyInstance) => {

    app.post('/login', async (req, res) => {

        try {
            const user = req.body as ILogin;

            if (!user?.password || !user?.email) {
                return res.status(400).send({ message: 'Erro ao cadastrar usuário. Infome email e senha.' })
            }

            const model = new User()

            const response = await model.login(user)

            return res.status(response.status).send({ message: response.message, data: response.data ? response.data : null })
            
        } catch (error) {
            return res.status(400).send({ message: 'Erro ao Fazer login. Tente novamente mais tarde' })
        }
    })
    
} 
