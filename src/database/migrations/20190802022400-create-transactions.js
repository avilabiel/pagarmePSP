'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transactions', { 
      id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement:true, primaryKey:true},
      id_client: {type: Sequelize.INTEGER, allowNull: false, references: {
        model: 'clients',
        key: 'id'
      }},
      nr_valor: {type: Sequelize.DECIMAL(20,2), allowNull: false},
      nm_descricao: {type: Sequelize.STRING, allowNull: false},
      nm_metodo_pgto: {type: Sequelize.STRING, allowNull: false},
      nr_cartao: {type: Sequelize.STRING, allowNull: false},
      nm_portador_cartao: {type: Sequelize.STRING, allowNull: false},
      dt_validade_cartao: {type: Sequelize.DATE, allowNull: false},
      nr_cvv_cartao: {type: Sequelize.STRING, allowNull: false},
      created_at: {type: Sequelize.DATE, allowNull: false},
      updated_at: {type: Sequelize.DATE},
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('transactions')
  }
};
