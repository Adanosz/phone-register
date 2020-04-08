
exports.up = function(knex) {
  return knex.schema
  .createTable('TelNumbs', function(table) {
    table.increments();
    table.string('First_name', 35).notNullable();
    table.string('Last_name', 35).notNullable();
    table.string('Phone_nnumber', 15).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTable('TelNumbs');
};
