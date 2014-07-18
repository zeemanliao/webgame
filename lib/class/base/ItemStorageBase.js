var tool = require('../../util/tool');


var id=0;
function ItemStorageBase() {
  this.items = {};
  this.limit = 0;
  this._newID = 0;
}

module.exports = ItemStorageBase;

ItemStorageBase.prototype.count = function() {
	return Object.keys(this.items).length;
}

ItemStorageBase.prototype.isFull = function() {
	return this.count() >= this.limit;
}

ItemStorageBase.prototype.delete = function() {

}

ItemStorageBase.create = function (data, callback) {
	
}

Team.prototype.__defineGetter__("newID", function(){
	this._newID += 1;
  return this._newID;
});
