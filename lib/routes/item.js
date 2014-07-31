var tool = require('../util/tool.js');
var Item = require('../class/Item');

module.exports = {
	add:function(player, itemID, callback) {
	},

	storageList:function(player, itemID, callback) {
	},

	bagList:function(player, itemID, callback) {
	},

	putStorage:function(player, itemID, callback) {
	},

	getStorage:function(player, itemID, callback) {
	},

	equipment:function(player, itemID, callback) {
	},

	buy:function(player, itemID, callback) {
		var item = this.game.publicData.items[itemID];
		if (tool.isUndefinedOrNull(item))
			return callback(null);

		if (item.shop != true)
			return callback(new this.game.GameWarning('E0028',item.nam));

		if (player.data.gold<item.coins)
			return callback(new this.game.GameWarning('E0027',item.nam));

		if (player.bag.isFull())
			return callback(new this.game.GameWarning('E0029'));

		player.bag.append(new Item(item));
			
		player.data.gold -= item.coins;
		player.reflushchangeData();
		callback(null);	
		
	}
}
