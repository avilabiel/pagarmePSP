module.exports = (sequelize, DataTypes) => {
    const Payables = sequelize.define('Payables', {
        id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement:true, primaryKey:true},
        id_client: {type: DataTypes.INTEGER, allowNull: false, references: {
            model: 'clients',
            key: 'id'
        }},
        id_transaction: {type: DataTypes.INTEGER, allowNull: false, references: {
            model: 'transactions',
            key: 'id'
        }},
        nr_valor: {type: DataTypes.DECIMAL(20,2), allowNull: false},
        dt_pagamento: {type: DataTypes.DATE, allowNull: false},
        nr_fee: {type: DataTypes.DECIMAL(20,2), allowNull: false},
        nr_valor_liquido: {type: DataTypes.DECIMAL(20,2), allowNull: false},
    }, {
        timestamps: true,
        tableName: 'payables',
    })

    Payables.associate = models => {
        Payables.belongsTo(models.Clients, { foreignKey: 'id' })
        Payables.belongsTo(models.Transactions, { foreignKey: 'id' })
    }

    return Payables
}