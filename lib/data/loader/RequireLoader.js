var Loader = require('./Loader');
var util = require('util');
var	path = require('path');

function RequireLoader() {
	Loader.call(this);
}

util.inherits(RequireLoader, Loader);

RequireLoader.prototype.read = function(self, fileInfo) {
	self._fileInfos[fileInfo.fileName] = require(path.join(self._path, fileInfo.fullName));
	console.log('Require %s\\%s',self._path ,fileInfo.fullName);
}
module.exports = RequireLoader;

