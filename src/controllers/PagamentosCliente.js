const {Payables, Transactions} = require('../models/')
const Cliente = require('../classes/Cliente')

class PagamentosClienteController {

    constructor() {}

    async getPagamentos(req, res, next) {
        const { token } = req.params

        const cliente = new Cliente(token)
        await cliente.setDadosCliente()
        const payables = await Payables.findAll({ 
            where: {id_client: cliente.id}, 
            include: [{ model: Transactions }],
            raw: true 
        })

        let balance = { available: 0, waiting_funds: 0 }
        
        const listPayables = payables.map(p => {
            
            if (p['Transaction.nm_metodo_pgto'] === 'debit_card')
                balance.available =  parseFloat(balance.available) + parseFloat(p.nr_valor_liquido)

            if (p['Transaction.nm_metodo_pgto'] === 'credit_card')
                balance.waiting_funds = parseFloat(balance.waiting_funds) + parseFloat(p.nr_valor_liquido)

            return {
                nr_valor: p.nr_valor,
                nr_fee: p.nr_fee,
                nr_valor_liquido: p.nr_valor_liquido,
                dt_pagamento: p.dt_pagamento,
                nm_descricao: p['Transaction.nm_descricao'],
                nm_metodo_pgto: p['Transaction.nm_metodo_pgto']
            }
        })

        return res.send({ message: { balance, payables: listPayables }})
    }

}

module.exports = new PagamentosClienteController