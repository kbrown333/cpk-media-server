var request = require('request');
var getfile = require('./get_file_contents');

module.exports.getVideoByID = function(id, callback, error) {
	getfile.by_group({group: 'keys', file: 'api_key.json'}, function(rslt) {
		try {
			var js = JSON.parse(rslt);
			var url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + id + '&key=' + js.youtube;
			request(url, function (err, response, body) {
				if (!err && response.statusCode == 200) {
					var rslt = JSON.parse(body);
					callback(rslt);
				} else {
					console.dir(err);
					error(response.statusCode);
				}
			});
		} catch (ex) {
			console.dir(ex);
			error('Unknown error occured, please contact support.');
		}
	}, function(err) {
		error(err);
	});
};

module.exports.getVideosByKeywords = function(phrase, callback, error) {
	getfile.by_group({group: 'keys', file: 'api_key.json'}, function(rslt) {
		try {
			var js = JSON.parse(rslt);
			var keywords = phrase.replace('/ /g', '+');
			var url_prefix = 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=';
			var url = url_prefix + keywords + '&key=' + js.youtube;
			request(url, function (err, response, body) {
				if (!err && response.statusCode == 200) {
					var rslt = JSON.parse(body);
					callback(rslt);
				} else {
					console.dir(err);
					error(response.statusCode);
				}
			});
		} catch (ex) {
			console.dir(ex);
			error('Unknown error occured, please contact support.');
		}
	}, function(err) {
		error(err);
	});
};