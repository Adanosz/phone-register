const knex = require('knex') ({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'toor',
    database: 'phonebook'
  }
});

module.exports = {
  knex
}