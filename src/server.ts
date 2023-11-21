import { fastifyCors } from '@fastify/cors';
import { createUser, login } from './controller/UserController';
import { createShoppingSession, updateShoppingSession } from './controller/ShoppingSessionController';
import { getAllProductCategories, getCategoryImage } from './controller/ProductCategoryController';

export const fastify = require('fastify')()

fastify.register(fastifyCors, {
    origin: '*' //url de onde vai vir a request, * recebe request de todo lugar
})


fastify.register(require('./middlewares/jwt'));

fastify.register(createUser)
fastify.register(login)
fastify.register(createShoppingSession)
fastify.register(updateShoppingSession)
fastify.register(getAllProductCategories)
fastify.register(getCategoryImage)


fastify.listen({
    port: 3333
}).then(() => console.log('Servidor rodando na porta 3333'))