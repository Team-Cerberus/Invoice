const express = require('express'),
  authKeyGenerator = require('../authentication/auth-key-generator'),
  router = express.Router();

function configure(db) {

  router
    .post('/', (req, res) => {
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
    .put('/auth', (req, res) => {
      const user = req.body;

      const dbUser = db.get('users').find({
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
    })
    .get('/', (req, res) => {

      // TODO: Implement real logic
      res.status(200)
        .json({
          result: {
           //
          }
        });
    });

  return router;
};

module.exports = configure;