
var tool = require('../util/tool');
var Game = require('../game');
var Battle = require('./battle')
var settings = Game.settings;


var id=0;
function Bag() {
  this.items = {};
  this.limit = 0;
}

module.exports = Bag;

Bag.prototype.count = function() {
	return Object.keys(this.items).length;
}

Bag.prototype.isFull = function() {
	return this.count() >= this.limit;
}

Bag.prototype.storageItems = function(){
	var _items = {};
	for (var i in this.items){
		if (this.items.data.type == Game.settings.game.bagType.storage)
			_items[this.items.id] = this.items;
	}
	return _items;
}

Bag.create = function (data, callback) {
}
