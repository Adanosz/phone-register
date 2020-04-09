const knex = require('../database/db').knex;
const table = require('table').table;

const showTable = async () => {
  const data = [
    [
      'First_name',
      'Last_name',
      'Phone_number',
    ]
  ];
  const records = await knex('First_name', 'Last_name', 'Phone_number').from('TelNumbs');
  for (let record of records) {
    data.push([
      record.First_name,
      record.Last_name,
      record.Phone_number,
    ]);
  }
  console.log(table(data));
};

module.exports = {
  showTable
};