const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

const viewsPath = path.join(__dirname, 'views');
app.set('views', viewsPath);
// https://expressjs.com/en/starter/static-files.html
const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));
// https://github.com/mde/ejs/blob/master/docs/syntax.md
app.set('view engine', 'ejs');

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
//console.log(users[0]);
app.get('/', (req, res) => {
  return res.render('index', { title: 'Account Summary', accounts: accounts });
});

app.get('/savings', (req, res) => {
  return res.render('account', { account: accounts.savings });
});
app.get('/checking', (req, res) => {
  return res.render('account', { account: accounts.checking });
});
app.get('/credit', (req, res) => {
  return res.render('account', { account: accounts.credit });
});

app.get('/profile', (req, res) => {
  return res.render('profile',{ user: users[0]});
})

app.listen(3000, () => {
  console.log('PS Project Running on port 3000!');
});
