var tool = require('../../util/tool');
var StorageAccess = require('../db/StorageAccess');
var Item = require('../Item');

var realTimeData = {};
var id = 0;

function StorageBase(playerID, items) {
	this.items = {};
	this.playerID = playerID;
	for (var i in items) {
		this.add(items[i]);
	}
}

module.exports = StorageBase;

StorageBase.prototype.count = function(storageType, noCountID) {
	var _count = 0;
	for (var i in this.items) {
		if (this.items[i].data.storage == storageType && this.items[i].id != noCountID) {
			_count ++;
		}
	}
	return _count;
}

StorageBase.prototype.isFull = function(item) {
	return this.count(item.data.storage, item.id) >= this.limit[item.data.storage] &&
					tool.isUndefinedOrNull(this.getTheSameItem(item));
}

StorageBase.prototype.append = function(item) {
	this.items[item.id] = item;
}

StorageBase.prototype.remove = function(itemID) {
	delete this.items[itemID];
}

StorageBase.prototype.add = function(item, callback) {
	id ++;
	item.id = id;
	this.items[id] = new Item(item);
}

StorageBase.prototype.save = function(callback) {
	var _items = [];
	for (var i in this.items) {
		_items.push(this.items[i].data);
	}
	StorageAccess.save(this.playerID, _items, function(err){
		if (err)
			return callback(err);

		callback(null);
	});
}

StorageBase.prototype.getTheSameItem = function(item) {
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

StorageBase.getByPlayerID = function(playerID, callback) {
	if (realTimeData[playerID]) {
		return callback(null, realTimeData[playerID]);
	} else {
		StorageAccess.getByPlayerID(playerID, function(err, items){
			if (err)
				return callback(err);

			var storage = new StorageBase(playerID, items);
		  realTimeData[playerID] = storage;
		  callback(null, storage);
		});
		
	}
}