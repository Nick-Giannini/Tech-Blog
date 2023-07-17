const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// Create a Sequelize instance based on the environment
if (process.env.JAWSDB_URL) {
    // If JawsDB URL is available (on Heroku), use it for the connection
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    // Otherwise, use local MySQL database credentials from .env file
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        }
    );
}

module.exports = sequelize;