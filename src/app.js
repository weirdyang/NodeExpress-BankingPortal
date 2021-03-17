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

app.get('/', (req, res) => {
  return res.render('index', { title: 'Index'});
})

app.listen(3000, () => {
  console.log('PS Project Running on port 3000!')
})