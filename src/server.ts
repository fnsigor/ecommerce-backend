import { fastifyCors } from '@fastify/cors';
import { createUser, login } from './controller/UserController';

export const app = require('fastify')()

app.register(require('@fastify/jwt'), {
    secret: process.env.SECRET_KEY
})

app.register(fastifyCors, {
    origin: '*' //url de onde vai vir a request, * recebe request de todo lugar
})


app.register(createUser)
app.register(login)


app.listen({
    port: 3333
}).then(() => console.log('Servidor rodando na porta 3333'))