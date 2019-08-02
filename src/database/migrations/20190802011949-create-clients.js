'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('clients', { 
      id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement:true, primaryKey:true },
      nm_cliente: {type: Sequelize.STRING, allowNull: false},
      nm_email: {type: Sequelize.STRING, allowNull: false},
      nm_senha: {type: Sequelize.STRING, allowNull: false},
      created_at: {type: Sequelize.DATE, allowNull: false},
      updated_at: {type: Sequelize.DATE},
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('clients')
  }
};
