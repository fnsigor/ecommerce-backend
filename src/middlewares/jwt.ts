const fp = require('fastify-plugin');
import 'dotenv/config'


module.exports = fp((fastify: any, opts: any, done: any) => {

    fastify.register(require('@fastify/jwt'), {
        secret: process.env.SECRET_KEY
    })

    fastify.decorate("authenticate", async (req: any, res: any) => {
        try {
            await req.jwtVerify()
        } catch (err) {
            console.log(err)
            res.status(500).send({ message: 'Usuário não autenticado. Faça login novamente' })
        }
    })

    done()
})