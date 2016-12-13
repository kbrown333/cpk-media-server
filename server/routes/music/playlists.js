var express = require('express');
var router = express.Router();
var playlists = require('../../controllers/playlists');

router.get('/', function(req, res) {
	res.json(playlists.get_playlists());
});

router.post('/', function(req, res) {
	playlists.add_playlist(req.body.playlist);
	res.send('success');
});

router.post('/insert', function(req, res) {
	try {
		var parms = JSON.parse(req.body.info);
		if (parms.name == null || parms.songs == null) {
			res.status(500).send('Required parameter is missing.');
		} else {
			playlists.insert_songs(parms.name, parms.songs, function(err, rslt) {
				if (err) {
					console.dir(err);
					res.status(500).send('Error adding songs to playlist, please try again.');
				} else {
					res.json(rslt);
				}
			});
		}
	} catch(ex) {
		res.status(500).send('Server error, please try again.');
	}
});

router.post('/remove', function(req, res) {
	try {
		var parms = JSON.parse(req.body.info);
		if (parms.map == null || parms.name == null) {
			res.status(500).send('Required parameter is missing.');
		} else {
			var list = playlists.remove_songs(parms.map, parms.name);
			res.json(list);
		}
	} catch(ex) {
		res.status(500).send('Server error, please try again.');
	}
});

router.post('/delete', function(req, res) {
	try {
		var parms = JSON.parse(req.body.info);
		if (parms.map == null) {
			res.status(500).send('Required parameter is missing.');
		} else {
			var list = playlists.delete_playlist(parms.map);
			res.json(list);
		}
	} catch(ex) {
		res.status(500).send('Server error, please try again.');
	}
});

module.exports = router;
