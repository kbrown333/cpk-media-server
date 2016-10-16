var express = require('express');
var router = express.Router();
var ls = require('list-directory-contents');

router.get('/', function(req, res) {
	ls('./public/video/videos/', function(err, tree) {
		if (err) {
			res.status(200).send(err);
		} else {
			var files = [];
			tree.forEach(function(file, index) {
				if (file.indexOf('.mp4') != -1) {
					files.push(file.replace(/\\/g, '/').replace('public/video/', ''));
				}
			});
			res.json({
				data: files
			});
		}
	});
});

module.exports = router;