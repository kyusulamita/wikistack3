'use strict';
var express = require('express');
var router = express.Router();
var wiki = require('./wiki');
var user = require('./user');
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.use('/wiki', wiki);
router.use('/users', user);

router.get('/', function(req, res, next){
	Page.findAll({})
	.then(function(allPages){
		res.render('index', {allPages})
	})
	.catch(err => console.log(err))

});

router.get('/search', function(req, res, next){
	var tags = [];
	tags = (req.query.tags) ? req.query.tags.split(" ") : tags;
	Page.findByTag(tags)
	.then((pages)=>{
		res.render('tagSearch', { pages: pages, tags: tags});
	}).catch((err) => console.log(err));
})
module.exports = router;
