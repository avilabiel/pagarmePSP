const express = require('express')
const routes = express.Router()
const handler = require('express-async-handler')

// Para evitar parameter injection
const { celebrate, Joi, errors } = require('celebrate')

const version = '/v1'

const controllers = require('./controllers/')
const Routes404 = require('./classes/Routes404')

routes.post(version + '/client', celebrate({
    body: Joi.object().keys({
        nome: Joi.string().min(3).required().error(new Error('Por favor, digite um nome válido')),
        email: Joi.string().email().required().error(new Error('Por favor, digite um e-mail válido')),
        senha: Joi.string().min(8).required().error(new Error('Por favor insira uma senha válida com no mínimo 8 caracteres'))
    })
}), handler(controllers.Cliente.gravarNovoCliente))

routes.get(version + '/client', celebrate({
    query: Joi.object().keys({
        email: Joi.string().email().required().error(new Error('Por favor, digite um e-mail válido')),
    })
}), handler(controllers.Cliente.buscarDados))

routes.post(version + '/client/transactions', celebrate({
    body: Joi.object().keys({
        valorTransacao: Joi.number().required().error(new Error('Por favor, insira um valor transação válido!')),
        descricaoTransacao: Joi.string().min(3).required().error(new Error('Por favor, insira uma descrição válida')),
        metodoPagamento: Joi.string().valid('debit_card', 'credit_card').required().error(new Error('Por favor, insira um método válido')),
        nroCartao: Joi.string().length(16).required().error(new Error('Insira um número de cartão válido')),
        nomePortadorCartao: Joi.string().required().error(new Error('Insira o nome do portador do cartão válido')),
        dataValidadeCartao: Joi.string().length(5).required().error(new Error('Insira uma data de validade válida')),
        cvv: Joi.string().required().error(new Error('Por favor, digite um CVV válido!')),
        token: Joi.string().required().error(new Error('Insira o nome do portador do cartão válido')),
    })
}), handler(async (req, res, next) => {
    const transacao = new controllers.Transacao(req, res, next)
    await transacao.gravarNovaTransacao()
}))

routes.get(version + '/client/payables/:token', handler(controllers.PagamentosCliente.getPagamentos))

// Simular um erro ao Rollbar
routes.get(version + '/erro/simulacao/:tipo', handler(controllers.ErroSimulacao.simulacao))

// Evitar 404 padrao do Express para ocultar o uso do Express ao cliente
routes.get('*', Routes404.invalidRoute404)
routes.post('*', Routes404.invalidRoute404)
routes.put('*', Routes404.invalidRoute404)
routes.delete('*', Routes404.invalidRoute404)
routes.patch('*', Routes404.invalidRoute404)


routes.use(errors())
module.exports = routes