var util = require('util');
var tool = require('../util/tool');
var settings = require('../settings');
var ItemStorageBase = require('./base/ItemStorageBase');

var id=0;
function Equipment(limit) {
	ItemStorageBase.call(this);
  this.items = {};
  this.limit = limit;
  this.type = settings.game.storageType.equipment;
}

util.inherits(Equipment, ItemStorageBase);

Equipment.prototype.dmg = function() {
	return sumData(items, 'dmg');
}

Equipment.prototype.def = function() {
	return sumData(items, 'def');
}

function sumData(items, dataName){
	var _val = 0;
	for (var i in items) {
		if (!tool.isUndefinedOrNull(items[i][dataName]))
			_val += items[i][dataName];
	}
	return _val;
}
module.exports = Equipment;
