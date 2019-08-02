class Transacao {

    constructor() {}

    async gravarNovaTransacao(req, res, next) {
        let {token} = req.body
        console.log(token)
        // let cliente = new Cliente(token)
        
        // await cliente.setDadosCliente()

        return res.send({ message: 'OK' })
    }

    listaTransacoes() {

    }


}

module.exports = new Transacao