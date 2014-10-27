var fs = require('fs');
var	path = require('path');
var sub = 'js';
var patt = new RegExp(sub);

module.exports = function (folder) {
	var _returnObj = {};
	var _path = path.resolve('lib', folder);
	fs.readdirSync(_path).forEach(function (filename) {

	  if (!patt.test(filename)) {
	    return;
	  }
		console.log('Load ' + folder +'......' + filename);
	  var name = path.basename(filename, sub);
		_returnObj[name] = require(path.resolve(_path, filename));
	});
	return _returnObj;
}
