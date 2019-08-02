class Transacao {

    constructor() {}

    gravarNovaTransacao(req, res, next) {
        const {} = req.body
        return res.send({ message: 'OK' })
    }

    listaTransacoes() {}


}

module.exports = new Transacao