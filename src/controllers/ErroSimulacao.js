class ErroSimulacao {

    constructor() {}

    simulacao(req, res, next) {
        const { tipo } = req.params

        if (tipo === 'desenvolvimento')
            throw new Error('Erro simulação desenvolvimento')

        if (tipo === 'producao') {
            throw new Error('Erro simulação produção')
        }
    }
}

module.exports = new ErroSimulacao