const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Comment model
class Comment extends Model {}

// Initialize the Comment model
Comment.init(
    {
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);

module.exports = Comment; // Export the Comment model
