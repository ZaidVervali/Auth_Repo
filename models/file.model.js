const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../database");

const FileModel = sequelize.define('file', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    filepath: {
        type: DataTypes.STRING,
        allowNull: false
    },
   
}, {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
    underscored: true, // Converts camelCased fields to snake_case in the database
});

module.exports = FileModel;
