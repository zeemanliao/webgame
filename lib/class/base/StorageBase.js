var tool = require('../../util/tool');
var StorageAccess = require('../db/StorageAccess');
var Item = require('../Item');
var settings = require('../../settings');
var realTimeData = {};
var id = 0;

function StorageBase(playerID, items) {
	this.items = {};
	this.playerID = playerID;
	this.equipmentData = {
		dmg: 0,
		mag: 0,
		def: 0
	};

	for (var i in items) {
		this.add(items[i]);
	}
	this.reflushEquipmentData();
}

module.exports = StorageBase;


StorageBase.prototype.isFull = function(storageType, limit) {
	return this.count(storageType) >= limit;
}

StorageBase.prototype.count = function(storageType) {
	var _count = 0;
	for (var i in this.items){
		if (this.items[i].data.storage == storageType)
			_count ++;
	}
	return _count;
}

StorageBase.prototype.append = function(item) {
	this.items[item.id] = item;
}

StorageBase.prototype.remove = function(itemID) {
	var _item = this.items[itemID];
	if (_item) {
		delete this.items[itemID];
	}
}

StorageBase.prototype.add = function(data) {
	id ++;
	data.id = id;
	this.items[id] = new Item(data);
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

StorageBase.prototype.getTheSameItem = function(itemData, storageType) {
	for (var i in this.items) {
		var _item = this.items[i];
		if (
			_item.data.id != itemData.id &&
			_item.data.baseID == itemData.baseID &&
			_item.data.level == itemData.level &&
			_item.data.storage == storageType) {
			return _item;
		}
	}
	return null;
}

StorageBase.prototype.equipmentItem = function(equipmentType) {
	for (var i in this.items) {
		if (this.items[i].data.storage == settings.game.storageType.equipment &&
				this.items[i].base.type == equipmentType)
			return this.items[i];
	}
	return null;
}

StorageBase.prototype.clearEquipmentData = function(){
	for (var i in this.equipmentData) {
		this.equipmentData[i] = 0;
	}
}

StorageBase.prototype.reflushEquipmentData = function() {
	this.clearEquipmentData();
	for (var i in this.items) {
		var item = this.items[i];
		if (item.data.storage == settings.game.storageType.equipment) {
			for (var j in this.equipmentData) {
				this.equipmentData[j] += item[j];
			}
		}
	}
}

StorageBase.prototype.getMixSourceItem = function(item) {
		for (var i in this.items) {
			var _item = this.items[i];
			if (_item.data.level == 1 && 
				item.data.baseID == _item.data.baseID &&
				_item.data.storage == settings.game.storageType.bag) {
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