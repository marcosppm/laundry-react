const mysql = require('mysql');

module.exports = function(app, connection) {
  app.get('/', function(req, res) {
    connection.query('SELECT * FROM residence', function(err, data) {
      (err) ? res.send(err) : res.json({residence: data});
    })
  })
}
