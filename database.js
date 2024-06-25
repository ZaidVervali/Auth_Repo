

const Sequelize = require("sequelize")
// (database: string, username: string, password: string, options: object)

const sequelize = new Sequelize('authDB','root','root',{
dialect:'mysql',
host:'localhost'
})

module.exports = sequelize;