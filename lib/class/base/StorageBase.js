var tool = require('../../util/tool');
var StorageAccess = require('../db/StorageAccess');
var Item = require('../Item');
var settings = require('../../settings');
var realTimeData = {};
var id = 0;

function StorageBase(playerID, items) {
	equip = JSON.parse(items.equip);
	this.items = {};
	this.stone = {
		1:items.stone1,
		2:items.stone2,
		3:items.stone3,
		4:items.stone4,
		5:items.stone5,
		6:items.stone6
	};
	this.playerID = playerID;
	this.equipmentData = {
		dmg: 0,
		mag: 0,
		def: 0
	};

	for (var i in equip) {
		this.append(this.newItem(equip[i]));
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
		_item = null;
		delete this.items[itemID];
	}
}

StorageBase.prototype.newItem = function(data){
	var _item = new Item(data);
	id ++;
	_item.id = id;
	_item.data.id = id;
	return _item;
}

StorageBase.prototype.save = function(callback) {
	var _equip = [];
	var _data ={
		stone1:this.stone[1],
		stone2:this.stone[2],
		stone3:this.stone[3],
		stone4:this.stone[4],
		stone5:this.stone[5],
		stone6:this.stone[6]
	};
	for (var i in this.items) {
		if (this.items[i].data.storage && this.items[i].data.storage != settings.game.storageType.sell)
			_equip.push(this.items[i].data);
	}
	_data.equip = JSON.stringify(_equip);
	StorageAccess.save(this.playerID, _data, function(err){
		if (err)
			return callback(err);

		callback(null);
	});
}

StorageBase.prototype.getTheSameItem = function(item, storageType) {
	for (var i in this.items) {
		var _item = this.items[i];
		if (
			_item.data.baseID == item.data.baseID &&
			_item.data.storage == storageType &&
			_item.data.id != item.data.id &&
			_item.data.level == item.data.level &&
			_item.data.nam == item.nam) {
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