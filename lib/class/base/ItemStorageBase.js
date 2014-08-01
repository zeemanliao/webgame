var tool = require('../../util/tool');
var ItemAccess = require('../db/ItemAccess');

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

ItemStorageBase.prototype.addItem = function(item, callback) {
	var self = this;
	var _item = this.getTheSameItem(item);

	if (tool.isUndefinedOrNull(_item)) {

		item.data.storage = this.type;

		item.create(function(err, id){
			if (err)
				return callback(err);

			self.append(item);
			return callback(null);
		});
		
	} else {
		_item.data.num += item.data.num;
		_item.save(function(err){
			if (err)
				_item.data.num -= item.data.num;

			return callback(err);
		});
	}
}

ItemStorageBase.prototype.getTheSameItem = function(item) {
	for (var i in this.items) {
		var _item = this.items[i];
		if (_item.data.baseID == item.data.baseID &&
			  _item.data.level == item.data.level) {
			return _item;
		}
	}
	return null;
}