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

    validateDataToUpdate = async (id: number, total: any) => {

        const existingSession = await prisma.shoppingSession.findUnique({
            where: {id}
        })

        if(!existingSession){
            return {invalid: true, message: 'Não foi possível atualizar sessão de compras. Sessão não existe'}
        }

        if(isNaN(total)){
            return {invalid: true, message: 'Não foi possível atualizar sessão de compras. Valor total não é um número'}
        }

        return {invalid: false}
    }
}