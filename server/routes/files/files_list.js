var express = require('express');
var router = express.Router();
var ls = require('list-directory-contents');
var __ = require('underscore');
var path = require('path');

router.get('/', function(req, res) {
	var files = [], errs = [];
	var finished = __.after(4, function() {
		if (errs.length > 0) {
			console.dir(errs);
			res.status(500).send('Error retrieving files.');
		} else {
			res.json({
				files: files
			});
		}
	});
	var add = function(err, tree) {
		if (err) {
			errs.push(err);
			finished();
		} else {
			tree.forEach(function(file, index) {
				files.push(file.replace(/\\/g, '/').replace('../client/private/files/', ''));
			});
			finished();
		}
	}
	ls(path.join('../client/private/files/documents/'), function(err, tree) {
		add(err, tree);
	});
	ls(path.join('../client/private/files/videos/'), function(err, tree) {
		add(err, tree);
	});
	ls(path.join('../client/private/files/pictures/'), function(err, tree) {
		add(err, tree);
	});
	ls(path.join('../client/private/files/music/'), function(err, tree) {
		add(err, tree);
	});
});

module.exports = router;