const path = require('path')

require('dotenv').config({
    path: process.env.NODE_ENV === 'production'
    ? path.resolve(__dirname, '.env.production')
    : path.resolve(__dirname, '.env.development')
})

const express = require('express')
const helmet = require('helmet')
const bodyParser = require("body-parser")
const Rollbar = require('./libraries/Rollbar')
const Youch = require('youch')

class Server {

    constructor() {
        this.express = express()

        this.middlewares()
        this.routes()
        this.exception()

        this.express.listen(process.env.PORT)
        console.log(`Server rodando na porta ${process.env.PORT}`)
    }

    middlewares() {
        this.express.use(helmet())
        this.express.use(bodyParser.json())
        this.express.use(bodyParser.urlencoded({ extended: false }))
    }

    routes() {
        this.express.use(require('./routes'))
    }

    exception() {
        this.express.use(async (err, req, res, next) => {

            let message = 'Internal Server Error!'
            Rollbar.enviarLog(err)

            // o if ideal é: if (process.env.NODE_ENV !== 'production')
            // Coloquei este if abaixo apenas para termos a noção da simulação de resp para prod e dev
            if (process.env.NODE_ENV !== 'production' && err.message.indexOf('Erro simulação produção') === -1) {
                const youch = new Youch(err)
                message = await youch.toJSON()
            }

            return res.status(500).send({ message })
        })
    }

}

const server = new Server