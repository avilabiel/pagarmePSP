class ClienteController {

    constructor() {}

    store(req, res, next) {

        
        return res.status(200).send({ message: "Enviado com sucesso!" })
    }

}

module.exports = new ClienteController