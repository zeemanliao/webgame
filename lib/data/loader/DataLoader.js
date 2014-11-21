var Loader = require('./Loader');
var util = require('util');
var fs = require('fs');
var	path = require('path');

function DataLoader() {
	Loader.call(this);
	this._interval = 0;
	this._intervalObj = null;
}

util.inherits(DataLoader, Loader);

DataLoader.prototype.read = function(self, fileInfo) {
	fs.readFile(path.join(self._path, fileInfo.fullName), 'utf8', function(err, data) {
		if (err) {
	      console.log(err);
	  } else {
	    self._fileInfos[fileInfo.fileName] = {
	        mtime: fileInfo.mtime,
	        data: data
	    };
	    console.log('Load Data %s\\%s',self._path ,fileInfo.fullName);
	  }
	});
}

DataLoader.prototype.setInterval = function(interval) {
	this._interval = interval;
}

DataLoader.prototype.runInterval = function() {
	var self = this;
	this.stopInterval();
	if (this._interval){
		this._intervalObj = setInterval(function(){self.load(self)}, this._interval);
	}
}

DataLoader.prototype.stopInterval = function() {
	clearInterval(this._intervalObj);
}


module.exports = DataLoader;

