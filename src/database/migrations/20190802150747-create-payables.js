'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('payables', { 
      id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement:true, primaryKey:true},
      id_client: {type: Sequelize.INTEGER, allowNull: false, references: {
        model: 'clients',
        key: 'id'
      }},
      id_transaction: {type: Sequelize.INTEGER, allowNull: false, references: {
        model: 'transactions',
        key: 'id'
      }},
      nr_valor: {type: Sequelize.DECIMAL(20,2), allowNull: false},
      dt_pagamento: {type: Sequelize.DATE, allowNull: false},
      nr_fee: {type: Sequelize.DECIMAL(20,2), allowNull: false},
      nr_valor_liquido: {type: Sequelize.DECIMAL(20,2), allowNull: false},
      created_at: {type: Sequelize.DATE, allowNull: false},
      updated_at: {type: Sequelize.DATE},
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('payables')
  }
};
