const moment = require('moment')
const {Payables} = require('../models/')

class Payable {

    constructor(idCliente, idTransacao, metodoPagamento, valorTransacao) {
        this.idCliente = idCliente
        this.idTransacao = idTransacao
        this.metodoPagamento = metodoPagamento
        this.valorTransacao = parseFloat(valorTransacao)
        this.status = null
        this.dataPagamento = null
        this.fee = null
        this.valorLiquido = null

        this.setData()
    }

    setData() {
        this.setStatus()
        this.setDataPagamento()
        this.setFees()
        this.setValorLiquido()
    }

    setStatus() {

        if (this.metodoPagamento === 'debit_card')
            this.status = 'paid'

        if (this.metodoPagamento === 'credit_card')
            this.status = 'waiting_funds'

        if (this.status === null)
            throw new Error(`Método de pagamento não configurado ${this.metodoPagamento}`)
    }

    setDataPagamento() {

        if (this.status === 'paid')
            this.dataPagamento = moment()

        if (this.status === 'waiting_funds')
            this.dataPagamento = moment().add(30, 'days')

        if (this.dataPagamento === null)
            throw new Error(`Status não configurado: ${this.status}`)
    }

    setFees() {
        // Esta tabela de config poderia vir do banco de dados, provavelmente
        if (this.metodoPagamento === 'debit_card')
            this.fee = parseFloat(0.03 * this.valorTransacao)

        if (this.metodoPagamento === 'credit_card')
            this.fee = parseFloat(0.05 * this.valorTransacao)
    }

    setValorLiquido() {
        this.valorLiquido = this.valorTransacao - this.fee
    }

    async salvarDB() {
        const payableDB = {
            id_client: this.idCliente,
            id_transaction: this.idTransacao,
            nr_valor: this.valorTransacao,
            dt_pagamento: this.dataPagamento,
            nr_fee: this.fee,
            nr_valor_liquido: this.valorLiquido
        }

        await Payables.create(payableDB)
    }
}

module.exports = Payable