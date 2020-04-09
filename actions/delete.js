const knex = require('../database/db').knex;
const readLine = require('readline-sync');

const delPhoneNumb = async () => {
  const whichNumb = readLine.question('Which number do you want to delete? Enter the number: ');
  const agree = readLine.keyInYN('Do you really want to delete this number? ');
  if (agree) {
    await knex('TelNumbs').where('TelNumbs.Phone_number', whichNumb).del();
    console.log(whichNumb, 'has been removed!');
    process.exit();
  } else {
    mainPage();
  }
};

module.exports = {
  delPhoneNumb
};