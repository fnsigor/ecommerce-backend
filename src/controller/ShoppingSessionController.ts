import { IShoppingSession } from "../interfaces/IShoppingSession"
import { FastifyInstance } from "fastify";
import { ShoppingSession } from "../model/ShoppingSession";
import { ShoppingSessionDomain } from "../domain/ShoppingSessionDomain";
import { fastify } from "../server";


const model = new ShoppingSession()
const domain = new ShoppingSessionDomain()

export const createShoppingSession = async (app: FastifyInstance) => {

    app.post('/createShoppingSession',
        {
            onRequest: [fastify.authenticate]
        },
        async (req, res) => {
            try {

                const { user_id } = req.body as any

                if (!user_id) {
                    return res.status(400).send({ message: 'Erro ao cadastrar Sessão de compras. Usuário não informado' })
                }

                const validation = await domain.validateDataToRegister(user_id)

                if (validation.invalid) {
                    return res.status(400).send({ message: validation.message })
                }

                const response = await model.create(user_id)

                return res.status(response.status).send({ message: response.message, data: response.data ? response.data : null })

            } catch (error) {
                console.log(error)
                return res.status(400).send({ message: 'Erro ao cadastrar sessão de compras. Tente novamente mais tarde' })
            }
        })

} 
