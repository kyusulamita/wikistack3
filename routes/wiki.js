'use strict';
var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;


router.get('/', function(req, res, next){
	res.render('index.html');
});

router.post('/', function(req, res, next){
	User.findOrCreate({
		where: {
			name: req.body.name,
			email: req.body.email
		}
	})
	.then(function (user){
		var arrTags = req.body.tags;
		arrTags = arrTags.split(" ");
		return Page.create({
			title: req.body.title,
			content: req.body.content,
			status: req.body.status,
			tags: arrTags
		})
		.then(function(newPage){
			newPage.setAuthor(user[0])
			res.redirect(newPage.route);
		})
	})
	.catch(err => console.log(err))

});

router.get('/add', function(req, res, next){
	// retrieve the 'add a page' form
	res.render('addpage.html');
});



router.get('/:urlTitle', function(req, res, next){
	Page.findOne({
		where: {
			urlTitle: req.params.urlTitle
		},
		include: [{
			model: User, as: "author"
		}]
	})
	.then(function(foundPage){
		res.render('wikipage', {foundPage})
	})
	.catch(err => console.log(err));

})

module.exports = router;
