var express = require('express');
var router = express.Router();
var ls = require('list-directory-contents');
var path = require('path');

router.get('/', function(req, res) {
	ls(path.join('../client/src/content/videos/'), function(err, tree) {
		if (err) {
			res.status(200).send(err);
		} else {
			var files = [];
			tree.forEach(function(file, index) {
				if (file.indexOf('.mp4') != -1) {
					files.push(file.replace(/\\/g, '/').replace('../client/src/', ''));
				}
			});
			res.json({
				data: files
			});
		}
	});
});

module.exports = router;