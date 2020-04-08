const knex = require('../../database/db');
const readLine = require('readline-sync');
const table = require('table').table;

const search = async () => {
  const fNameToSearch = readLine.question("Whose number are you looking for? First enter FIRST NAME: ");
  const lNameToSearch = readLine.question("Whose number are you looking for? Now enter LAST NAME: ")
  const output = [
    [ 'First_name',
      'Last_name',
      'Phone_number' ]
  ];
  const result = await knex.knex('TelNumbs').where({'TelNumbs.First_name': fNameToSearch, 'TelNumbs.Last_name': lNameToSearch});
  for (let record of result) {
    output.push([
      record.First_name,
      record.Last_name,
      record.Phone_number ]);
  }
  console.log(table(output));
};

module.exports = {
  search
};