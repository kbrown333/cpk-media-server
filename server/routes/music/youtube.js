var express = require('express');
var router = express.Router();
var youtube = require('../../controllers/youtube');
var fs = require('fs');
var url = require('url');
var request = require('request');

router.get('/id', function(req, res) {
	youtube.getVideoByID(req.query.id, function(data) {
		res.json(data);
	}, function(get_err) {
		res.status(500).send(get_err);
	});
});

router.get('/keywords', function(req, res) {
	youtube.getVideosByKeywords(req.query.phrase, function(data) {
		res.json(data);
	}, function(get_err) {
		res.status(500).send(get_err);
	});
});

router.post('/download', function(req, res) {
	var id3 = require('jsmediatags');
	var req_url = req.body.to_url;	
	var curr_dir = __dirname;
	var save_dir = curr_dir.replace('/routes/music', '') + '/private/files/dir/music/';
	if (req.body.fname == null) {
		res.status(500).send('no path provided');
	} else {
		var file_name = req.body.fname.replace(/['"]+/g, '');
		var new_file = save_dir + file_name + '.mp3';
		request.get(req_url).on('error', function(err) {
			console.dir(err);
			res.status(500).send('Error downloading file');
		}).pipe(fs.createWriteStream(new_file)).on('finish', function() {
			var saved_file = app_root_dir + '/public/music/tracks/' + file_name + '.mp3';
			console.log('Song downloaded: ' + saved_file);
			id3.read(saved_file, {
				onSuccess: function(rslt) {
					var info = rslt.tags;
					var id3_info = {
						path: 'tracks/' + file_name + '.mp3',
						title: info.title,
						artist: info.artist,
						album: info.album,
						year: info.year,
						track: info.track,
						genre: info.genre
					};
					res.json(id3_info);
				}, 
				onError: function(err2) {
					console.dir(err2);
					res.status(500).send(err2);
				}
			});
		});
	}
});

module.exports = router;