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

module.exports = router;
