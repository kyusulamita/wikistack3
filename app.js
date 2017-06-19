'use strict';
var express = require('express');
var app = express();
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var path = require('path');
var makesRouter = require('./routes');
var models = require('./models');

var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

app.use(express.static(path.join(__dirname, '/public')));

// modular routing that uses io inside it
app.use('/', makesRouter);

models.db.sync().then(function(){
	// start the server
	app.listen(1337, function(){
	console.log('listening on port 1337');
	})
}).catch(console.error);
