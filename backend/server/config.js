var express = require('express');
var bodyParser = require('body-parser');
var cors = require("cors");
var morgan = require("morgan");
var controller = require('./controller.js');
var crudUtils = require('./utils/crudUtils.js');
var path = require('path');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../../client'));

app.get('/', controller.sendIndex);
app.get('/fetch', controller.sendSurfSpots);

module.exports = app;
