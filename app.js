const express = require('express'),
  bodyParser = require('body-parser'),

  low = require('lowdb'),
  logger = require('./scripts/config/logger'),
  db = low('./database/users.json'),
  app = express();

app.use(express.static(__dirname + '/public'));
app.use('/libraries', express.static('node_modules'));
app.use('/resources', express.static('resources'));

db._.mixin(require('underscore-db'));

app.set('port', (process.env.PORT || 3030));

app.use(bodyParser.json());

require('./authentication/index').add(app, db);

const usersRouter = require('./routers/usersRouter')(db),
  invoiceRouter = require('./routers/invoiceRouter')(db),
  sellersRouter = require('./routers/sellersRouter')(db),
  buyersRouter = require('./routers/buyersRouter')(db);

app.use('/api/users', usersRouter);
app.use('/invoice', invoiceRouter);
app.use('/sellers', sellersRouter);
app.use('/buyers', buyersRouter);

app.listen(app.get('port'), logger.info('Server is running at http://localhost:', app.get('port')));
