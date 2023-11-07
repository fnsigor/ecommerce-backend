import { prisma } from "../config/prisma";
import { fastify } from "../server";
import { ILogin } from "../interfaces/ILogin";
import { IUser } from "../interfaces/IUser";
import { IShoppingSession } from "../interfaces/IShoppingSession";

export class ShoppingSession {

    create = async (user_id: number) => {
        try {
            const res = await prisma.shoppingSession.create({ 
                data: {user_id}
             })

            return { status: 200, message: 'Sessão de compras criada com sucesso', data: res }

        } catch (error) {
            console.log(error)
            return { status: 500, message: 'Erro ao criar sessão de compras. Tente novamente mais tarde' }
        }

    }

    update = async (user: IUser): Promise<IModelFunctionReturn> => {
        try {

            let data = user
            data.password = data.password.toString()

            const res = await prisma.user.create({ data })
            return { status: 200, message: 'Usuário criado com sucesso', data: res }
        } catch (error) {
            console.log(error)
            return { status: 500, message: 'Erro ao criar usuário' }
        }
    }

}