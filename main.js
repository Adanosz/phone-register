const knex = require('knex') ({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'toor',
    database: 'phonebook'
  }
});

const fs = require('fs');
const table = require('table').table;
const readLine = require('readline-sync');
const stdin = process.stdin;
stdin.setRawMode(true);

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

const search = async () => {
  const fNameToSearch = readLine.question("Whose number are you looking for? First enter FIRST NAME: ");
  const lNameToSearch = readLine.question("Whose number are you looking for? Now enter LAST NAME: ")
  const output = [
    [ 'First_name',
      'Last_name',
      'Phone_number' ]
  ];
  const result = await knex('TelNumbs').where({'TelNumbs.First_name': fNameToSearch, 'TelNumbs.Last_name': lNameToSearch});
  for (let record of result) {
    output.push([
      record.First_name,
      record.Last_name,
      record.Phone_number ]);
  }
  console.log(table(output));
};

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
    await knex('TelNumbs').insert(record)
    console.log(first, last, phone_number, 'has been registered');
  }
  const newRegister = readLine.keyInYN('Do you want to register a new phone number? ');
  if (newRegister) {
    register();
  } else {
  process.exit();
  }
};

const changePhoneNumb = async () => {
  const outdatedNumb = readLine.question('Outdated number: ');
  const updatedNumb = readLine.question('New number: ');
  await knex('TelNumbs').where('TelNumbs.Phone_number', outdatedNumb).update({'TelNumbs.Phone_number': updatedNumb});
  console.log(outdatedNumb, 'has been changed to', updatedNumb);
  const newChange = readLine.keyInYN('Do you want to change another phone number? ');
  if (newChange) {
    changePhoneNumb();
  } else {
  process.exit();
  }
}

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

const mainPage = async () => {
  const choices = ['Show me the phone book',
                   'Search in the phone book', 
                   'Register someone', 
                   'Change someone number', 
                   'Delete someone by phone number']; 
  const index = readLine.keyInSelect(choices, 'Which operation do you need?');
  if (index === 0) {
    await showTable();
    process.exit();
  }
  if (index === 1) {
    await search();
    process.exit();
  }
  if (index === 2) {
    await register();
  }
  if (index === 3) {
    await changePhoneNumb();
  }
  if (index === 4) {
    delPhoneNumb();
  }
};

mainPage();
