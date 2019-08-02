const bcrypt = require('bcryptjs')
const md5 = require('md5')

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
            },
            afterFind: async clients => {
                if (clients instanceof Array) {
                    clients = clients.map(client => {
                        client.token = md5(client.nm_email + client.id)
                    })
                } else {
                    clients.token = md5(clients.nm_email + clients.id)
                }
            }
        }
    })

    return Clients
}