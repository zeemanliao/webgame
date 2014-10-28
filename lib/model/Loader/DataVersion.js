var fs = require('fs');
var path = require('path');
var loader = require('./Loader');

module.exports = function () {
	var _path = path.resolve('data');
	var _obj = loader('data');
	var _returnObj = {};

	for (var i in _obj) {
		_returnObj[i] = fs.statSync(path.resolve('data',i +'.json')).mtime.getTime();
		console.log('publicData Version %s\t[%s]', i, _returnObj[i]);
	}

	return _returnObj;
}