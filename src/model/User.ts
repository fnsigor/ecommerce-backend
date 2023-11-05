import { prisma } from "../config/prisma";
import { ILogin } from "../interfaces/ILogin";
import { IUser } from "../interfaces/IUser";
import { app } from "../server";

export class User {

    login = async (data: ILogin): Promise<IModelFunctionReturn> => {
       try {
        const existingUser = await prisma.user.findUnique({
            where: {email: data.email}
        })

        if(!existingUser){
            return {status: 400, message: 'Erro ao fazer login. Verifique o email informado'}
        }

        if(existingUser.password != data.password){
            return {status: 400, message: 'Erro ao fazer login. Senha incorreta'}
        }

        const token = app.jwt.sign({ "username": existingUser.name, "email": existingUser.email })

        return {status: 200, message: 'Login efetuado com sucesso', data: {...existingUser, token}}
       } catch (error) {
        console.log(error)
        return {status: 500, message: 'Erro ao Fazer login. Tente novamente mais tarde'}
       }
   
    }

    create = async (user: IUser): Promise<IModelFunctionReturn> => {
        try {

            let data = user
            data.password = data.password.toString()

            const res = await prisma.user.create({data})
            return { status: 200, message: 'Usuário criado com sucesso', data: res }
        } catch (error) {
            console.log(error)
            return {status: 500, message: 'Erro ao criar usuário'}
        }
    }

}