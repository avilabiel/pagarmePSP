const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
    const Clients = sequelize.define('Clients', {
        id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement:true, primaryKey:true },
        nm_cliente: {type: DataTypes.STRING, allowNull: false},
        nm_email: {type: DataTypes.STRING, allowNull: false},
        nm_senha: {type: DataTypes.STRING, allowNull: false}
    }, {
        timestamps: true,
        tableName: 'clients',
        hooks: {
            beforeSave: async client => {
                if (client.nm_senha)
                    client.nm_senha = await bcrypt.hash(client.nm_senha, 8)
            }
        }
    })

    return Clients
}