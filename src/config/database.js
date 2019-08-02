const path = require('path')

// Para funcionar as migrations
require('dotenv').config({
    path: process.env.NODE_ENV === 'production'
    ? path.resolve(__dirname, '..', '.env.production')
    : path.resolve(__dirname, '..', '.env.development')
})

module.exports = {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    define:{
        paranoid: false,
        timestamps: true,
        freezeTableName: true,
        underscored: true
    }
}