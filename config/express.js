const jwt = require('jsonwebtoken');
const config = require('config');
const helmet = require('helmet');
const path = require('path');
var bodyParser = require('body-parser')
var express = require('express')
const cors = require("cors");
var corsOptions = {
  origin: ['http://meuroleapp.com', 'http://www.meuroleapp.com' , 'http://www.meuroleapp.com.br', 'http://meuroleapp.com.br', 'http://localhost', 'null'],
  optionsSuccessStatus: 200
}

module.exports = () => {
  const app = express();
  app.set('port', process.env.PORT || config.get('server.port'));
  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use(helmet());
  app.use(bodyParser.urlencoded({ extended: true }))

  require('../api/routes/UsersRoutes')(app);
  require('../api/routes/EventoRoutes')(app);

  app.use('/', express.static('public'));
  return app;
};