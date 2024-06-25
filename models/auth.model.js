const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../database");

const AuthModel = sequelize.define('auth', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true // Ensures the value is a valid email address
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
    underscored: true, // Converts camelCased fields to snake_case in the database
});

module.exports = AuthModel;
