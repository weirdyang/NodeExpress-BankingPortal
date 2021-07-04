const fs = require('fs');
const path = require('path');
const express = require('express');
const { accounts, users, writeJSON } = require('./data');
const debug = require('debug')('app:app');
const app = express();
const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');
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
app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);
//console.log(users[0]);
app.get('/', (req, res) => {
  return res.render('index', { title: 'Account Summary', accounts: accounts });
});


app.get('/profile', (req, res) => {
  return res.render('profile', { user: users[0] });
});


app.listen(3000, () => {
  console.log('PS Project Running on port 3000!');
});
