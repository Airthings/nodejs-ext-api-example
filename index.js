'use strict';
const app = require('express')();
const express = require('express');
const port = 3000;

require('dotenv').config();

app.use(require('./routes'));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.listen(port, (err) => {
  if (err) console.error(err);
  console.log(`Express server listening at http://localhost:${port}`);
});
