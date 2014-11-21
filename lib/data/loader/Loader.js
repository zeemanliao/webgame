var Loader = module.exports = {};
var fs = require('fs');
var	path = require('path');

function loader() {
	this._path = null;
	this._fileInfos = {};
	this._subNameFilter = null;
}

loader.prototype.setSubNameFilter = function(filter) {
	this._subNameFilter = filter;
}

loader.prototype.setPath = function(path) {
	this._path = path;
}

loader.prototype.load = function(_this) {
	var self = _this || this;

	if (!self._path)
		return;

	readDirFileInfo(self._path, function(fileInfo){

		var _thisFileInfo = self._fileInfos[fileInfo.fileName];

		if (!_thisFileInfo ||
				_thisFileInfo.mtime != fileInfo.mtime) {
            self.read(self, fileInfo);
		}
	});
}

loader.prototype.read = function(self, err, data) {
	throw new Error("Loader Need Override prototype.read(self, fileInfo) Method");
}

loader.prototype.get = function() {
	return this._fileInfos;
}

module.exports = loader;

function readDirFileInfo(_path, callback) {
	fs.readdirSync(_path).forEach(function (filename) {

		var _extname = path.extname(filename);

		if (_extname !='') {
			fs.stat(path.join(_path, filename), function(err, stat) {

				var _name = path.basename(filename, _extname);
				var _d = new Date(stat.mtime);
				var _mtime = _d.getTime();

			  callback({
				  	fileName: _name,
				  	extName: _extname,
				  	mtime: _mtime,
				  	fullName: filename
				  });
      });
		}
	});
}
