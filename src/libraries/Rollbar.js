class Rollbar {

    constructor() {
        this.accessToken = process.env.ROLLBAR_TOKEN
    }

    enviarLog(error) {

        const Rollbar = require('rollbar')

        // Operador ternario apenas para simular o erro na producao. O ideal é pegar direto das variaveis de ambiente
        const environment = (error.message === 'Erro simulação produção') ? 'production' : process.env.NODE_ENV

        const rollbar = new Rollbar({
            accessToken: this.accessToken,
            captureUncaught: true,
            captureUnhandledRejections: true,
            environment
        })

        rollbar.critical(error)
    }
}

module.exports = new Rollbar