const {Clients} = require('../models')

class Cliente {

    constructor() {}

    async gravarNovoCliente(req, res, next) {
        const { nome: nm_cliente, email: nm_email, senha: nm_senha } = req.body
        if (await Clients.count({ nm_email }) > 0)
            return res.status(400).send({ message: "Cliente já cadastrado. Por favor, utilize outro e-mail" })

        await Clients.create({ nm_cliente, nm_email, nm_senha })

        return res.status(200).send({ message: "Cliente cadastrado com sucesso!" })
    }

    async buscarDados(req, res, next) {
        const { email: nm_email } = req.query

        const client = await Clients.findOne({ where: { nm_email }, raw: true })
        return res.status(200).send({ message: client })
    }

}

module.exports = new Cliente