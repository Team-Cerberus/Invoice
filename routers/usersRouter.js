const express = require('express'),
  logger = require('../scripts/config/logger'),
  authKeyGenerator = require('../authentication/auth-key-generator'),
  router = express.Router();

function configure(db) {

  router
    .post('/', (req, res) => {
      const user = req.body;

      user.userNameLower = user.userName.toLowerCase();
      user.authKey = authKeyGenerator.get(user.passHash);

      if (db.get('users').find({
        userNameLower: user.userNameLower
      })
        .value()) {

        res.status(400)
          .json('Username is already taken');
        return;
      }
      db.get('users')
        .value()
        .push(user);
      db.write();

      res.status(200)
        .json({
          result: user
        });
    })
    .put('/auth', (req, res) => {
      const user = req.body;

      const dbUser = db.get('users').find({
        userNameLower: user.userName.toLowerCase()
      }).value();

      if (!dbUser || dbUser.passHash !== user.passHash) {
        res.status(404)
          .json('Username or password is invalid');
        return;
      }

      res.status(200)
        .json({
          result: {
            userName: dbUser.userName,
            authKey: dbUser.authKey
          }
        });
    })
    .get('/', (req, res) => {
      const user = req.user;
      if (!user) {
        res.status(401)
          .json('Not authorized User');
        return;
      }

      res.status(200)
        .json({
          result: user
        });
    });

  return router;
};

module.exports = configure;