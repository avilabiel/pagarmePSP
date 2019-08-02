const express = require('express')
const routes = express.Router()
const handler = require('express-async-handler')
const { celebrate, Joi, errors } = require('celebrate')

const version = '/v1'

const controllers = require('./controllers/')
const Routes404 = require('./classes/Routes404')
const ErroSimulacao = require('./controllers/ErroSimulacao')

routes.post(version + '/client', celebrate({
    body: Joi.object().keys({
        nome: Joi.string().min(3).required().error(new Error('Por favor, digite um nome válido')),
        email: Joi.string().email().required().error(new Error('Por favor, digite um e-mail válido')),
        senha: Joi.string().min(8).required().error(new Error('Por favor insira uma senha válida com no mínimo 8 caracteres'))
    })
}), handler(controllers.ClienteController.store))

routes.post(version + '/transaction', celebrate({
    body: Joi.object().keys({
        valorTransacao: Joi.number().required().error(new Error('Por favor, digite um valor transação válido!')),
        CVV: Joi.string().required().error(new Error('Por favor, digite um CVV válido!')),
    })
}), handler(async (req, res, next) => {
    res.send({teste: true})
}))

// Simular um erro ao Rollbar
routes.get(version + '/erro/simulacao/:tipo', handler(ErroSimulacao.simulacao))

// Evitar 404 padrao do Express para ocultar o uso do Express ao cliente
routes.get('*', Routes404.invalidRoute404)
routes.post('*', Routes404.invalidRoute404)
routes.put('*', Routes404.invalidRoute404)
routes.delete('*', Routes404.invalidRoute404)
routes.patch('*', Routes404.invalidRoute404)


routes.use(errors())
module.exports = routes