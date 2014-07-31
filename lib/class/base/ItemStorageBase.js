var tool = require('../../util/tool');

var id=0;
function ItemStorageBase() {
  this.items = {};
  this.limit = 0;
  this.type = 1;
}

module.exports = ItemStorageBase;

ItemStorageBase.prototype.count = function() {
	return Object.keys(this.items).length;
}

ItemStorageBase.prototype.isFull = function() {
	return this.count() >= this.limit;
}

ItemStorageBase.prototype.append = function(item) {
	item.data.storage = this.type
	this.items[item.id] = item;
}

