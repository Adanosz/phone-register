const read = require('../actions/read');
const search = require('../actions/search');
const create = require('../actions/create');
const update = require('../actions/update')
const del = require('../actions/delete')

const readLine = require('readline-sync');
const stdin = process.stdin;
stdin.setRawMode(true);

const mainPage = async () => {
  const choices = ['Show me the phone book',
                   'Search in the phone book', 
                   'Register someone', 
                   'Change someone number', 
                   'Delete someone by phone number']; 
  const index = readLine.keyInSelect(choices, 'Which operation do you need?');
  if (index === 0) {
    await read.showTable();
    process.exit();
  }
  if (index === 1) {
    await search.search();
    process.exit();
  }
  if (index === 2) {
    await create.register();
  }
  if (index === 3) {
    await update.changePhoneNumb();
  }
  if (index === 4) {
    del.delPhoneNumb();
  }
};

mainPage();

