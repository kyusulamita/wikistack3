'use strict';
var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next){
	User.findAll({})
	.then(allUsers => res.render('users', {allUsers}))
	.catch(err => console.log(err));
});

router.get('/:id', function(req, res, next){
	const foundUser = User.findById(req.params.id);
	const foundPages = Page.findAll({where:
		{authorId: req.params.id }
	});

	Promise.all([foundUser, foundPages])
	.then((data) => res.render('singleUser', {user: data[0], pages: data[1]}))
	.catch(err => console.log(err));
});



module.exports = router;
