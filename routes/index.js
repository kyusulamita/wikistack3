'use strict';
var express = require('express');
var router = express.Router();
var wiki = require('./wiki');
var user = require('./user');

router.use('/wiki', wiki);
router.use('/user', user);

router.get('/', function(req, res, next){
	// retrieve all wiki pages
	res.redirect('/wiki');
});

module.exports = router;