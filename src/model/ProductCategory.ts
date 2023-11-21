import { prisma } from "../config/prisma"

export class ProductCategory {

    getAllProductCategories = async () => {
        try {
            const res = await prisma.productCategory.findMany()

            return { status: 200, data: res }

        } catch (error) {
            console.log(error)
            return { status: 500, message: 'Erro ao buscar categorias. Tente novamente mais tarde', data: null }
        }

    }
}