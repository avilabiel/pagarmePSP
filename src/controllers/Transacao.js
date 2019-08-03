const Cliente = require('../classes/Cliente')
const Payable = require('../classes/Payable')
const {Transactions} = require('../models/')
const moment = require('moment')

class Transacao {

    constructor(req, res, next) {
        this.req = req
        this.res = res
        this.next = next
    }

    async gravarNovaTransacao() {
        let {
            valorTransacao: nr_valor,
            descricaoTransacao: nm_descricao,
            metodoPagamento: nm_metodo_pgto,
            nomePortadorCartao: nm_portador_cartao,
            dataValidadeCartao: dt_validade_cartao,
            nroCartao: nr_cartao,
            cvv: nr_cvv_cartao,
            token
        } = this.req.body
        
        let cliente = new Cliente(token)
        await cliente.setDadosCliente()

        const transaction = await Transactions.sequelize.transaction()

        try {

            nr_cartao = this.formatarCartao(nr_cartao)
            const tx = {id_client: cliente.id, nr_valor, nm_descricao, nm_metodo_pgto, nr_cartao, nm_portador_cartao, dt_validade_cartao, nr_cvv_cartao}
            const {dataValues: transacaoCriada} = await this.criarTransacao(tx)

            const payable = new Payable(cliente.id, transacaoCriada.id, nm_metodo_pgto, nr_valor)
            await payable.salvarDB()

            await transaction.commit()
            return this.res.send({ message: 'OK' })

        } catch (err) {
            await transaction.rollback()
            this.next(err)
        }
    }

    async criarTransacao(tx) {
        tx.dt_validade_cartao = this.formatarDataValidadeRecebida(tx.dt_validade_cartao)
        return await Transactions.create(tx)
    }


    formatarDataValidadeRecebida(dataValidade) {
        // Sempre jogar para o último dia do mês/ano
        let [month, year] = dataValidade.split('/')
        year = parseInt(year) + 2000 // Dinamico

        let startDate = moment([year, month - 1])
        let endDate = moment(startDate).endOf('month')

        return endDate
    }

    formatarCartao(cartao) {
        return cartao.substr(-4)
    }
}

module.exports = Transacao