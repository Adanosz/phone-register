const knex = require('../../database/db');
const readLine = require('readline-sync');


const register = async () => {
  const first = readLine.question('Enter FIRST NAME: ');
  const last = readLine.question('Enter LAST NAME: ');
  const phone_number = readLine.question('Enter PHONE NUMBER (valid hungarian phone number): ');
  const validNumber = /((?:\+?3|0)6)(?:-|\()?(\d{1,2})(?:-|\))?(\d{3})-?(\d{3,4})/im;
  let newPNRecords = '';
  if (phone_number.match(validNumber)) {
    newPNRecords = [
      { First_name: first,
        Last_name: last,
        Phone_number: phone_number }
      ];
  } else {
    console.log("It's not a valid phone number!");
    console.log("Valid phone number examples: ");
    console.log("+36123456789, +36(12)345-6789, +36-12-345-6789, +3612345678, +36(1)234-5678, +36-1-234-5678, +361234567, +36(12)345-678, +36-12-345-678, 36123456789, 36(12)345-6789, 36-12-345-6789, 3612345678");
    console.log("36(1)234-5678, 36-1-234-5678, 361234567, 36(12)345-678, 36-12-345-678, 06123456789, 06(12)345-6789, 06-12-345-6789, 0612345678, 06(1)234-5678, 06-1-234-5678, 061234567, 06(12)345-678, 06-12-345-678");
    register();
  }
  for (let record of newPNRecords) {
    await knex.knex('TelNumbs').insert(record)
    console.log(first, last, phone_number, 'has been registered');
  }
  const newRegister = readLine.keyInYN('Do you want to register a new phone number? ');
  if (newRegister) {
    register();
  } else {
  process.exit();
  }
};

module.exports = {
  register
};