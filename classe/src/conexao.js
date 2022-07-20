
const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'ec2-34-235-198-25.compute-1.amazonaws.com',
        port: 5432,
        user: 'ufasjflihvqjey',
        password: 'db2f8b75b22b5088cd3019eac411b5b39b36b5eec8465a8dea6e143501e9152e',
        database: 'd27odh2entdf86',
        ssl: { rejectUnauthorized: false }
    }

});

module.exports = knex;

