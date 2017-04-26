let express = require('express'),
    bodyParser = require('body-parser');


var app = express();


app.use(express.static(__dirname + '/public'));
app.use('/libraries', express.static('node_modules'));
app.use(bodyParser.json());

//TODO: SetUp request handler

var port = 3030;
app.listen(port, function () {
  console.log('Server is running at http://localhost:' + port);
});
