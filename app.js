let express = require('express'),
  app = express();


app.use(express.static('public'));
app.use('/libraries', express.static('node_modules'));

//TODO: SetUp request handler

var port = 3030;
app.listen(port, function () {
  console.log('Server is running at http://localhost:' + port);
});
