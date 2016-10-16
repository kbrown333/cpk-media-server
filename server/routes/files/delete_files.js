var express = require('express');
var router = express.Router();
var fs = require('fs-extra');
var __ = require('underscore');

router.post('/', function(req, res) {
	var files = req.body['files[]'];
	if (typeof files === 'string') {
		files = [files];
	}
	try {
		deleteFiles(files, req.body.path, fs_root_dir, function(err) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send('success');
			}
		});
	} catch(ex) {
		res.status(500).send(ex);
	}
});

router.post('/folder', function(req, res) {
	//if (req.body.)
	res.status(500).send('not implemented');
});

module.exports = router;

function deleteFiles(files, path, rt, callback){
	var errs;
   	var finished = __.after(files.length, function() {
   		callback(errs);
   	});
   	for(var i = 0; i < files.length; i++) {
   		var file = rt + path + '/' + files[i];
   		fs.remove(file, function(err) {
   			if (err) {
   				if (errs == null) {errs = []};
   				errs.push(err);
   				finished();
   			} else {
   				finished();
   			}
   		});
   	}
}