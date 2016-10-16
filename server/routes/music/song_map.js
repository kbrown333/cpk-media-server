var express = require('express');
var router = express.Router();
var mapping = require('../../controllers/song_map');

router.get('/', function(req, res) {
	mapping.get_data(function(music_db) {
		var keys = Object.keys(music_db);
		mergeSort(keys, function(keys2) {
			res.json({data: music_db});
		});
	}, function(err) {
		console.dir(err);
		res.status(500).send('error');
	});
});

mergeSort = function(array, callback) {
	try {
		function Sort(arr) {
			if (arr.length < 2)
				return arr;
		
			var middle = parseInt(arr.length / 2);
			var left   = arr.slice(0, middle);
			var right  = arr.slice(middle, arr.length);
		
			return merge(Sort(left), Sort(right));
		}

		function remove_path(str) {
			var tmp = str.split('/');
			return tmp[tmp.length - 1];
		}
		
		function merge(left, right) {
			var result = [], left2, right2;
		
			while (left.length && right.length) {
				left2 = remove_path(left[0]);
				right2 = remove_path(right[0]);
				if (left2 <= right2) {
					result.push(left.shift());
				} else {
					result.push(right.shift());
				}
			}
		
			while (left.length)
				result.push(left.shift());
		
			while (right.length)
				result.push(right.shift());
		
			return result;
		}
		
		var rslt = Sort(array);
		callback(rslt);
		
	} catch (ex) {
		callback(array);
	}
	
};


module.exports = router;