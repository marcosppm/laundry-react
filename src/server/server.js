const express = require('express');
const mysql = require('mysql');

const PORT = process.env.PORT || 3001;

const app = express();

const connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'laundry_db'
});

connection.getConnection(function(err) {
  (err) ? console.log(err) : console.log(connection);
});

require('./routes/routes')(app, connection);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});