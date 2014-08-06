var tool = require('../util/tool');
var game = require('../game');

function Item(data) {
	this.data = {
		id:data.id,
		baseID:data.baseID,
		level:data.level?data.level:1,
		num:data.num?data.num:1,
		storage:data.storage?data.storage:1
	};
	this.id = data.id;
}

module.exports = Item;


Item.prototype.remove = function() {

}

Item.prototype.create = function(callback) {
	var self = this;

}

Item.prototype.__defineGetter__("base", function(){
	if (tool.isUndefinedOrNull(game.publicData.items[this.data.baseID]))
		return {};

  return game.publicData.items[this.data.baseID];
});