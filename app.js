const express = require('express'),
  bodyParser = require('body-parser'),
  low = require('lowdb'),
  logger = require('./scripts/config/logger'),
  db = low('./database/users.json'),
  app = express();

db._.mixin(require('underscore-db'));

app.set('port', (process.env.PORT || 3030));

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use('/libraries', express.static('node_modules'));

require('./authentication/index').add(app, db);

const usersRouter = require('./routers/usersRouter')(db);

app.use('/api/users', usersRouter);

app.listen(app.get('port'), logger.info('Server is running at http://localhost:', app.get('port')));
