var tool = require('../util/tool.js');
var Item = require('../class/Item');

module.exports = {
	add:function(player, itemID, callback) {
	},

	move:function(player, itemID, callback) {
		if (!tool.isNumeric(itemID))
			return callback(new this.game.GameWarning('E0026',itemID));

		var item = player.storage.items[itemID];

		if (tool.isUndefinedOrNull(item))
			return callback(new this.game.GameWarning('E0030',itemID));

		var old_storage = item.data.storage;

		switch (item.data.storage) {
			case this.game.settings.game.storageType.storage:
				item.data.storage = this.game.settings.game.storageType.bag;
				break;
			case this.game.settings.game.storageType.bag:
				item.data.storage = this.game.settings.game.storageType.storage;
				break;
			default:
				return callback(new this.game.GameWarring('E0031'));
		}

		player.storage.add(item, function(err, _item){
			if (err) {
				item.data.storage = old_storage;
				return callback(err);
			}

			var _data = {item:{}};
			_data.item.remove = [itemID];
			_data.item.add = [_item.data];
			
			player.emit(_data);	
			callback(null);
		});
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


		var _data = {
			baseID: item.id,
			playerID: player.id,
			num: 1,
			level: 1,
			storage: this.game.settings.game.storageType.bag
		};

		var tmp_item = new Item(_data);

		if (player.storage.isFull(tmp_item.data.storage) &&
			tool.isUndefinedOrNull(player.storage.getTheSameItem(tmp_item)))
			return callback(new this.game.GameWarning('E0029', item.nam));

		player.storage.add(tmp_item, function (err, _item){

			if (err)
				return callback(err);

			player.data.gold -= item.coins;
			player.emit({item:{add:[_item.data]}});
			player.reflushchangeData();
			callback(null);		
		});
	}
}
