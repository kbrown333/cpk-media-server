var express = require('express');
var __ = require('underscore');

module.exports.mergeSort_asc = function(array, obj, callback) {
	try {
		function Sort(arr) {
			if (arr.length < 2)
				return arr;
		
			var middle = parseInt(arr.length / 2);
			var left   = arr.slice(0, middle);
			var right  = arr.slice(middle, arr.length);
		
			return merge(Sort(left), Sort(right));
		}
		
		function merge(left, right) {
			var result = [];
		
			if (obj == null) {
				while (left.length && right.length) {
					if (left[0] >= right[0]) {
						result.push(left.shift());
					} else {
						result.push(right.shift());
					}
				}
			} else {
				while (left.length && right.length) {
					if (left[0][obj] >= right[0][obj]) {
						result.push(left.shift());
					} else {
						result.push(right.shift());
					}
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

module.exports.mergeSort_desc = function(array, obj, callback) {
	try {
		function Sort(arr) {
			if (arr.length < 2)
				return arr;
		
			var middle = parseInt(arr.length / 2);
			var left   = arr.slice(0, middle);
			var right  = arr.slice(middle, arr.length);
		
			return merge(Sort(left), Sort(right));
		}
		
		function merge(left, right) {
			var result = [];
		
			if (obj == null) {
				while (left.length && right.length) {
					if (left[0] <= right[0]) {
						result.push(left.shift());
					} else {
						result.push(right.shift());
					}
				}
			} else {
				while (left.length && right.length) {
					if (left[0][obj] <= right[0][obj]) {
						result.push(left.shift());
					} else {
						result.push(right.shift());
					}
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
