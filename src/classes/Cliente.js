const { Clients } = require('../models/')

class Cliente {

    constructor(token) {
        this.token = token
        this.id = null
        this.nome = null
        this.email = null
        this.senha = null
    }

    async setDadosCliente() {
        let sql = 'SELECT * FROM clients WHERE MD5(CONCAT(nm_email, id)) = $1'
        let data = await Clients.sequelize.query(sql, { bind: [this.token], type: Clients.sequelize.QueryTypes.SELECT })

        if (data.length === 0)
            throw new Error(`Token inválido ${this.token}`)

        let {id, nm_cliente, nm_email, nm_senha} = data[0]
        this.id = id
        this.nome = nm_cliente
        this.email = nm_email
        this.senha = nm_senha
    }

    async getIdCliente() {
        return this.id
    }

    teste() {
        console.log('tese')
    }
}

module.exports = Cliente