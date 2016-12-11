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

module.exports = router;
