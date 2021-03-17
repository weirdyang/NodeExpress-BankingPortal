const fs = require('fs');
const path = require('path');
const express = require('express');
const { F } = require('ramda');
const debug = require('debug')('app:app');
const app = express();

const viewsPath = path.join(__dirname, 'views');
app.set('views', viewsPath);
// https://expressjs.com/en/starter/static-files.html
const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));
// https://github.com/mde/ejs/blob/master/docs/syntax.md
app.set('view engine', 'ejs');

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
  return res.render('profile', { user: users[0] });
});

app.post('/transfer', (req, res) => {
  const { from, to, amount } = req.body;

  accounts[from].balance -= parseInt(amount);
  accounts[to].balance += parseInt(amount);

  const accountsJSON = JSON.stringify(accounts);
  debug(accountsJSON);
  fs.writeFileSync(accountsPath, accountsJSON, 'utf-8');
  debug(req);
  return res.render('transfer', { message: 'Transfer Completed' });
});

app.get('/transfer', (req, res) => {
  return res.render('transfer');
});

app.get('/payment', (req, res) => {
  return res.render('payment', { account: accounts.credit });
});

app.post('/payment', (req, res) => {
  const { amount } = req.body;
  debug(amount);
  accounts.credit.balance -= parseInt(amount);
  accounts.credit.available += parseInt(amount);
  const accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(accountsPath, accountsJSON, 'utf-8');
  return res.render('payment', {
    message: 'Payment Successful',
    account: accounts.credit,
  });
});
app.listen(3000, () => {
  console.log('PS Project Running on port 3000!');
});
