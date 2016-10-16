var ls = require('list-directory-contents');
var __ = require('underscore');
var path = require('path');

module.exports.get_data = function(callback, error) {
	var id3 = require('jsmediatags');
	ls(path.join('../client/src/content/tracks/'), function(err, tree) {
		if (err) {
			error(err);
		} else {
			var files = [], exists = [], full_path, path, data, fname;
			var music_db;
			try {
				music_db = jsdb.music.getData('/data');
			} catch (ex) {
				jsdb.music.push('/data', {});
				music_db = jsdb.music.getData('/data');
			}
			tree.forEach(function(file, index) {
				if (file.indexOf('.mp3') != -1) {
					path = file.replace('../client/src/', '');
					full_path = app_root_dir + '/' + file;
					if (music_db[path] == null) {
						files.push({full_path: full_path, path: path});
					} else {
						exists.push({
							data: music_db[path],
							path: path
						});
					}
				}
			});
			var next = function(arr) {
				if (arr == null || arr.length == 0) {
					var add = {};
					jsdb.music.push('/data', data);
					for (var i = 0; i < exists.length; i++) {
						data[exists[i].path] = exists[i].data;
					}
					jsdb.music.push('/data', data);
					callback(jsdb.music.getData('/data'))
				} else {
					var curr = arr.shift();
					var info;
					id3.read(curr.full_path, {
						onSuccess: function(rslt) {
							info = rslt.tags;
							data[curr.path] = {
								path: curr.path,
								title: info.title,
								artist: info.artist,
								album: info.album,
								year: info.year,
								track: info.track,
								genre: info.genre
							};
							next(arr);
						}, 
						onError: function(err2) {
							//console.dir(err2);
							next(arr);
						}
					});
				}
			}
			data = {};
			jsdb.music.delete('/data');
			next(files);
		}
	});
}

module.exports.update_data = function(file, data) {
	var id3_editor = require('node-id3');
	return null;
}