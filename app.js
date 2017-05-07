const express = require('express'),
  bodyParser = require('body-parser'),
  lowdb = require('lowdb'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

// Mocking database
// let usersDB = {
//   "users": [{
//     "username": "test",
//     "password": "pass",
//   }, {
//     "username": "test2",
//     "password": "pass2",
//   }]
// }
const db = lowdb('db.json');
db.defaults('[]');

const app = express();
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use('/libraries', express.static('node_modules'));

//TODO: SetUp request handler
app.post('/api/users', (req, res) => {
  res.status(200)
    .json({
      result: {
        username: req.body.username
      }
    });
  return;
});

const port = 3030;
app.listen(port, function () {
  console.log('Server is running at http://localhost:' + port);
});