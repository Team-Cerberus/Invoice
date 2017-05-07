const express = require('express'),
  authKeyGenerator = require('./authentication/auth-key-generator'),
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
  low = require('lowdb'),
  logger = require('./scripts/config/logger'),
  db = low('./database/users.json'),
  app = express();

db._.mixin(require('underscore-db'));

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use('/libraries', express.static('node_modules'));

let test = require('./authentication/index').add(app, db);

app.post('/api/users', (req, res) => {
  const user = req.body;

  user.usernameLower = user.username.toLowerCase();
  user.authKey = authKeyGenerator.get(user.id);
  if (db.get('users').find({
    usernameLower: user.usernameLower
  })
    .value()) {

    res.status(400)
      .json('Username is already taken');
    return;
  }
  db.get('users')
    .value()
    .push(user);

  res.status(200)
    .json({
      result: user
    });
})

app.put('/api/users/auth', (req, res) => {
  var user = req.body;
  var dbUser = db.get('users').find({
    usernameLower: user.username.toLowerCase()
  }).value();
  if (!dbUser || dbUser.passHash !== user.passHash) {
    res.status(404)
      .json('Username or password is invalid');
    return;
  }
  res.status(200)
    .json({
      result: {
        username: dbUser.username,
        authKey: dbUser.authKey
      }
    });
  return;
});

const port = 3030;
app.listen(port, function () {
  logger.info('Server is running at http://localhost:' + port);
});
