const express = require('express');
const { accounts, writeJSON } = require('../data');
const router = express.Router();

router.post('/transfer', (req, res) => {
  const { from, to, amount } = req.body;

  accounts[from].balance -= parseInt(amount);
  accounts[to].balance += parseInt(amount);

  writeJSON();
  debug(req);
  return res.render('transfer', { message: 'Transfer Completed' });
});

router.get('/transfer', (req, res) => {
  return res.render('transfer');
});

router.get('/payment', (req, res) => {
  return res.render('payment', { account: accounts.credit });
});

router.post('/payment', (req, res) => {
  const { amount } = req.body;
  debug(amount);
  accounts.credit.balance -= parseInt(amount);
  accounts.credit.available += parseInt(amount);
  writeJSON();
  return res.render('payment', {
    message: 'Payment Successful',
    account: accounts.credit,
  });
});

module.exports = router;