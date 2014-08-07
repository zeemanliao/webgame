var tool = require('../../util/tool');
var StorageAccess = require('../db/StorageAccess');
var Item = require('../Item');
var settings = require('../../settings');
var realTimeData = {};
var id = 0;

function StorageBase(playerID, items) {
	this.items = {};
	this.playerID = playerID;
	this.count={};

	for (var i in settings.game.storageType) {
		this.count[settings.game.storageType[i]] = 0;
	}

	for (var i in items) {
		this.add(items[i]);
	}
}

module.exports = StorageBase;


StorageBase.prototype.isFull = function(storageType, limit) {
	return this.count[storageType] >= limit;
}

StorageBase.prototype.append = function(item) {
	this.items[item.id] = item;
}

StorageBase.prototype.remove = function(itemID) {
	var _item = this.items[itemID];
	if (_item) {
		delete this.items[itemID];
		this.count(_item.data.storage) -= 1;
	}
}

StorageBase.prototype.add = function(data) {
	id ++;
	data.id = id;
	this.items[id] = new Item(data);
	this.count[this.items[id].data.storage] +=1;
	return this.items[id];
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

StorageBase.prototype.getTheSameItem = function(itemData) {
	for (var i in this.items) {
		var _item = this.items[i];
		if (
			_item.data.id != itemData.id &&
			_item.data.baseID == itemData.baseID &&
			  _item.data.level == itemData.level &&
			  _item.data.storage == itemData.storage) {
			return _item;
		}
	}
	return null;
}

StorageBase.prototype.equipmentItem = function(equipmentType) {
	for (var i in this.items) {
		if (this.items[i].data.storage == settings.game.storageType.equipmenet &&
				this.items[i].base.type == equipmentType)
			return this.items[i];
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