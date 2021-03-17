const fs = require('fs');
const debug = require('debug')('app:data')
const path = require('path');

// accounts
const accountsPath = path.join(__dirname, 'json', 'accounts.json');
//console.log(accountsPath);
const accountData = fs.readFileSync(accountsPath, 'utf-8');
const accounts = JSON.parse(accountData);

// accounts
const usersPath = path.join(__dirname, 'json', 'users.json');
//console.log(usersPath);
const userData = fs.readFileSync(usersPath, 'utf-8');
const users = JSON.parse(userData);

writeJSON = () => {
  const accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(accountsPath, accountsJSON, 'utf-8');
}

module.exports = {
  accounts,
  users,
  writeJSON
}