const Sequelize = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

// Create a new Sequelize instance with database configuration from environment variables
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT
    }
);

module.exports = sequelize; // Export the configured Sequelize instance
