
const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 1302,
        user: 'postgres',
        password: '1302',
        database: 'mercadinho'
    }
});

module.exports = knex;
