var fs = require('fs');
var	path = require('path');

module.exports = function (folder) {
	var _returnObj = {};
	var _path = path.resolve(folder);

	fs.readdirSync(_path).forEach(function (filename) {
		var _extname = path.extname(filename);

		if (_extname =='')
			return;
		
	  var name = path.basename(filename, _extname);
		_returnObj[name] = require(path.resolve(_path, filename));
	});

	return _returnObj;
}
