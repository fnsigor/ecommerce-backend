import { prisma } from "../config/prisma"

export class ShoppingSessionDomain {
    validateDataToRegister = async (user_id: number) => {
        const existingUser = await prisma.user.findUnique({
            where: {id: user_id}
        })

        if(!existingUser){
            return {invalid: true, message: 'Não foi possível cadastrar sessão de compras. Usuário não existe'}
        }

        const existingSession = await prisma.shoppingSession.findFirst({
            where: {
                user_id
            }
        })

        if(existingSession){
            return {invalid: true, message: 'Não foi possível cadastrar sessão de compras. Usuário já possui sessão de compras.'}
        }


        return {invalid: false}
    }
}