module.exports.get_playlists = function() {
	var music_db;
	try {
		music_db = jsdb.playlists.getData('/data');
	} catch (ex) {
		jsdb.playlists.push('/data', []);
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

module.exports.insert_songs = function(name, songs, callback) {
	var playlists;
	try {
		playlists = jsdb.playlists.getData('/data');
		var index = -1;
		var exists = playlists.filter((val, i) => {
			if (val.name == name && index == -1) {
				index = i;
				return true;
			}
		});
		if (exists.length == 0) {
			callback("Playlist doesnt exist");
		} else {
			var list = exists[0];
			var map = list.tracks.map((val) => {
				return val.path;
			});
			for (var i = 0; i < songs.length; i++) {
				if (map.indexOf(songs[i].path) == -1) {
					list.tracks.push(songs[i]);
				}
			}
			jsdb.playlists.push('/data', playlists);
			callback(null, list);
		}
	} catch (ex) {
		callback(ex);
	}
}

module.exports.remove_songs = function(map, name) {
	try {
		console.log(name);
		playlists = jsdb.playlists.getData('/data');
		var index = -1;
		var exists = playlists.filter((val, i) => {
			if (val.name == name && index == -1) {
				index = i;
				return true;
			}
		});
		if (exists.length == 0) {
			return [];
		} else {
			var list = exists[0];
			playlists[index].tracks = list.tracks.filter((val) => {
				return map[val.path] == null;
			});
			jsdb.playlists.push('/data', playlists);
			return playlists[index];
		}
	} catch(ex) {
		console.log(ex);
		return [];
	}
}

module.exports.delete_playlist = function(map, name) {
	playlists = jsdb.playlists.getData('/data');
	try {
		playlists = playlists.filter((val) => {
			return map[val.name] == null;
		});
		jsdb.playlists.push('/data', playlists);
		return playlists;
	} catch(ex) {
		console.log(ex);
		return playlists;
	}
}
