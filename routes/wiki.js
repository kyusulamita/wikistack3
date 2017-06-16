'use strict';
var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;


router.get('/', function(req, res, next){
	// retrieve all wiki pages
	res.render('index.html');
});

router.post('/', function(req, res, next){
	// submit a new page to the db
	// res.send("Welcome to wikistack - post!");
	console.log(req.body);
	var page = Page.build({
		title : req.body.title,
		content: req.body.content,
		// urlTitle: generateUrlTitle(req.body.title),
		status: req.body.status
	});

	page.save().then(
		function(){
			res.redirect('/');
		}
	)
});

router.get('/add', function(req, res, next){
	// retrieve the 'add a page' form
	res.render('addpage.html');
});

module.exports = router;