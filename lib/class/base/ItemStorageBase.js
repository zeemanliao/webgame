var tool = require('../../util/tool');
var ItemAccess = require('../db/ItemAccess');

function ItemStorageBase(limit) {
  this.items = {};
  this.limit = limit;
}

module.exports = ItemStorageBase;

ItemStorageBase.prototype.count = function(storageType, noCountID) {
	var _count = 0;
	for (var i in this.items) {
		if (this.items[i].data.storage == storageType && this.items[i].id != noCountID) {
			_count ++;
		}
	}
	return _count;
}

ItemStorageBase.prototype.isFull = function(item) {
	return this.count(item.data.storage, item.id) >= this.limit[item.data.storage] &&
					tool.isUndefinedOrNull(this.getTheSameItem(item));
}

ItemStorageBase.prototype.append = function(item) {
	this.items[item.id] = item;
}

ItemStorageBase.prototype.remove = function(itemID, callback) {
	try {
		var self = this;
		var _item = this.items[itemID];

		if (tool.isUndefinedOrNull(_item))
			return callback(null);
		_item.delete(function(err) {
			if (err)
				return callback(err);

			delete self.items[itemID];
			callback(null);
		});
	} catch(e) {
		return callback(e);
	}
}

ItemStorageBase.prototype.add = function(item, callback) {
	var self = this;
	var _item = this.getTheSameItem(item);

	if (tool.isUndefinedOrNull(item.id) && 
			tool.isUndefinedOrNull(_item)) {
		item.create(function(err, id){
			if (err)
				return callback(err);

			self.append(item);
			return callback(null, item);
		});
		
	} else if (tool.isUndefinedOrNull(_item)){

		item.save(function(err){
			return callback(err, item);
		});
	} else {

		_item.data.num += item.data.num;
		_item.save(function(err){
			if (err) {
				_item.data.num -= item.data.num;
				return callback(err);
			}

			self.remove(item.id, function(err2){
				if (err2) {
					_item.data.num -= item.data.num;
					return callback(err2);
				}
				return callback(null, _item);
			});
			
		});
	}
}

ItemStorageBase.prototype.getTheSameItem = function(item) {
	for (var i in this.items) {
		var _item = this.items[i];
		if (
			_item.data.id != item.data.id &&
			_item.data.baseID == item.data.baseID &&
			  _item.data.level == item.data.level &&
			  _item.data.storage == item.data.storage) {
			return _item;
		}
	}
	return null;
}