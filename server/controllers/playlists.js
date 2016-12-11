module.exports.get_playlists = function() {
	var music_db;
	try {
		music_db = jsdb.playlists.getData('/data');
	} catch (ex) {
		jsdb.music.push('/data', []);
		music_db = [];
	}
	return music_db;
}

module.exports.add_playlist = function(name) {
	var playlists;
	try {
		playlists = jsdb.playlists.getData('/data');
	} catch (ex) {
		jsdb.music.push('/data', []);
		playlists = [];
	}
	var exists = playlists.filter((val) => {
		return val.name == name;
	});
	if (exists.length == 0) {
		try {
			playlists.push({name: name, tracks: []});
			jsdb.playlists.push('/data', playlists);
		} catch(ex) {
			console.log(ex);
		}
	}
}
