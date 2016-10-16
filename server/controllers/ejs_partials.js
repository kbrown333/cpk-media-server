var getfile = require('./get_file_contents');
var __ = require('underscore');

module.exports.video_partials = function(callback, error) {
	var cached = default_cache.get('video_partials');
	if (cached != undefined) {
		callback(cached);
	} else {
		var partials = {}, err = [];
		var finished = __.after(3, function() {
			if (err.length > 0) {
				error(err);
			} else {
				if (cache_flags.partials) {
					console.log("Caching Partials");
					default_cache.set('video_partials', partials);
				}
				callback(partials);
			}
		});
		getfile.by_group({group: 'partials', file: 'video/header.html'}, function(hdr) {
			partials['header'] = hdr;
			finished();
		}, function(get_err) {
			err.push(get_err);
			finished();
		});
		getfile.by_group({group: 'partials', file: 'video/common_ref.html'}, function(meta) {
			partials['meta'] = meta;
			finished();
		}, function(get_err) {
			err.push(get_err);
			finished();
		});
		getfile.by_group({group: 'partials', file: 'video/aside.html'}, function(meta) {
			partials['aside'] = meta;
			finished();
		}, function(get_err) {
			err.push(get_err);
			finished();
		});
	}
}

module.exports.files_partials = function(callback, error) {
	var cached = default_cache.get('files_partials');
	if (cached != undefined) {
		callback(cached);
	} else {
		var partials = {}, err = [];
		var finished = __.after(3, function() {
			if (err.length > 0) {
				error(err);
			} else {
				if (cache_flags.partials) {
					console.log("Caching Partials");
					default_cache.set('files_partials', partials);
				}
				callback(partials);
			}
		});
		getfile.by_group({group: 'partials', file: 'files/header.html'}, function(hdr) {
			partials['header'] = hdr;
			finished();
		}, function(get_err) {
			err.push(get_err);
			finished();
		});
		getfile.by_group({group: 'partials', file: 'files/common_ref.html'}, function(meta) {
			partials['meta'] = meta;
			finished();
		}, function(get_err) {
			err.push(get_err);
			finished();
		});
		getfile.by_group({group: 'partials', file: 'files/aside.html'}, function(meta) {
			partials['aside'] = meta;
			finished();
		}, function(get_err) {
			err.push(get_err);
			finished();
		});
	}
}

module.exports.pictures_partials = function(callback, error) {
	var cached = default_cache.get('picture_partials');
	if (cached != undefined) {
		callback(cached);
	} else {
		var partials = {}, err = [];
		var finished = __.after(2, function() {
			if (err.length > 0) {
				error(err);
			} else {
				if (cache_flags.partials) {
					console.log("Caching Partials");
					default_cache.set('picture_partials', partials);
				}
				callback(partials);
			}
		});
		getfile.by_group({group: 'partials', file: 'pictures/header.html'}, function(hdr) {
			partials['header'] = hdr;
			finished();
		}, function(get_err) {
			err.push(get_err);
			finished();
		});
		getfile.by_group({group: 'partials', file: 'pictures/common_ref.html'}, function(meta) {
			partials['meta'] = meta;
			finished();
		}, function(get_err) {
			err.push(get_err);
			finished();
		});
	}
}

module.exports.music_partials = function(callback, error) {
	var cached = default_cache.get('music_partials');
	if (cached != undefined) {
		callback(cached);
	} else {
		var partials = {}, err = [];
		var finished = __.after(3, function() {
			if (err.length > 0) {
				error(err);
			} else {
				if (cache_flags.partials) {
					console.log("Caching Partials");
					default_cache.set('music_partials', partials);
				}
				callback(partials);
			}
		});
		getfile.by_group({group: 'partials', file: 'music/header.html'}, function(hdr) {
			partials['header'] = hdr;
			finished();
		}, function(get_err) {
			err.push(get_err);
			finished();
		});
		getfile.by_group({group: 'partials', file: 'music/common_ref.html'}, function(meta) {
			partials['meta'] = meta;
			finished();
		}, function(get_err) {
			err.push(get_err);
			finished();
		});
		getfile.by_group({group: 'partials', file: 'music/aside.html'}, function(meta) {
			partials['aside'] = meta;
			finished();
		}, function(get_err) {
			err.push(get_err);
			finished();
		});
	}
}