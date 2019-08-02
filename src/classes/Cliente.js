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
            throw new Error('Token inválido')

        
    }
}

module.exports = Cliente