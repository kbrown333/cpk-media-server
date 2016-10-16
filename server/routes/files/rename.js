var express = require('express');
var router = express.Router();
var fs = require('fs-extra');

router.post('/', function(req, res) {
	if (req.body.old_name == null) {
		res.status(500).send('No previous name provided.');
	} else if (req.body.new_name == null) {
		res.status(500).send('No new name provided.');
	} else {
		var old_name = fs_root_dir + req.body.old_name;
		var new_name = fs_root_dir + req.body.new_name;
		fs.move(old_name, new_name, function(err){
			if (err) {
				res.status(500).send('Processing error, check logs.');
				console.dir(err);
			} else {
				res.send('complete');
			}
		});
	}
});

module.exports = router;