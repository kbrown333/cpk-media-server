var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res) {
	try {
		var file = fs_root_dir + req.query.file;
		console.log(file);
		res.download(file);
	} catch (ex) {
		res.status(500).send(ex);
	}
});

module.exports = router;