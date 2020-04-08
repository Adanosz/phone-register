const knex = require('../../database/db');
const readLine = require('readline-sync');


const changePhoneNumb = async () => {
  const outdatedNumb = readLine.question('Outdated number: ');
  const updatedNumb = readLine.question('New number: ');
  await knex.knex('TelNumbs').where('TelNumbs.Phone_number', outdatedNumb).update({'TelNumbs.Phone_number': updatedNumb});
  console.log(outdatedNumb, 'has been changed to', updatedNumb);
  const newChange = readLine.keyInYN('Do you want to change another phone number? ');
  if (newChange) {
    changePhoneNumb();
  } else {
  process.exit();
  }
}

module.exports = {
  changePhoneNumb
};