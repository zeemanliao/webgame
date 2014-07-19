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

module.exports = Equipment;
