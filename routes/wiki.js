'use strict';
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	// retrieve all wiki pages
	res.render('index.html');
});

router.post('/', function(req, res, next){
	// submit a new page to the db
	res.send("Welcome to wikistack - post!");
});

router.get('/add', function(req, res, next){
	// retrieve the 'add a page' form
	res.render('addpage.html');
});

module.exports = router;