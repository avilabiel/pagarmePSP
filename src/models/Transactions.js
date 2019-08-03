module.exports = (sequelize, DataTypes) => {
    const Transactions = sequelize.define('Transactions', {
        id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement:true, primaryKey:true},
        id_client: {type: DataTypes.INTEGER, allowNull: false, references: {
            model: 'clients',
            key: 'id'
        }},
        nr_valor: {type: DataTypes.DECIMAL(20,2), allowNull: false},
        nm_descricao: {type: DataTypes.STRING, allowNull: false},
        nm_metodo_pgto: {type: DataTypes.STRING, allowNull: false},
        nr_cartao: {type: DataTypes.STRING, allowNull: false},
        nm_portador_cartao: {type: DataTypes.STRING, allowNull: false},
        dt_validade_cartao: {type: DataTypes.DATE, allowNull: false},
        nr_cvv_cartao: {type: DataTypes.STRING, allowNull: false},
    }, {
        timestamps: true,
        tableName: 'transactions',
    })

    Transactions.associate = models => {
        Transactions.belongsTo(models.Clients, { foreignKey: 'id' })
    }

    return Transactions
}