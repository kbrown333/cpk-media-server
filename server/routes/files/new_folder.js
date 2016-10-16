var express = require('express');
var router = express.Router();
var fs = require('fs');

router.post('/', function(req, res) {
	console.log('new folder', req.body.path);
	fs.mkdir((fs_root_dir + req.body.path), function(err) {
		if (err) {
			console.dir(err);
		}
		res.send('success');
	});
});

module.exports = router;