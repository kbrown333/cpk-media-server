var express = require('express');
var fs = require('fs');
var path = require('path');

var groups = {
	partials: true,
	keys: true
}

module.exports.by_group = function(data, callback, error) {
	if (data.group == null) {
		error('Group not provided');
	} else if (data.file == null) {
		error('Path not provided');
	} else if (!groups[data.group]) {
		error('Invalid group');
	} else {
		var path = "";
		switch (data.group) {
			case "keys": 
				path = "./keys/" + data.file;
				break;
			default:
				break;
		}
		if (path == "") {
			error('Error finding group path');
		} else {
			fs.readFile(path, function(err, rslt) {
				if (err) {
					error(err);
				} else {
					callback(String(rslt));
				}
			})
		}
	}
}

module.exports.by_path = function(path, callback, error) {
	fs.readFile(path, function(err, rslt) {
		if (err) {
			error(err);
		} else {
			callback(String(rslt));
		}
	})
}