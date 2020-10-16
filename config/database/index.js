const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST || 127.0.0.1,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'pcab',
    },
});

module.exports = knex;