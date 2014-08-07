var tool = require('../util/tool.js');
var Item = require('../class/Item');

module.exports = {
	add:function(player, itemID, callback) {
	},

	remove:function(player, equipmentType, callback) {
		try {

			if (!tool.isNumeric(equipmentType))
				return callback(null);

			var _item = player.storage.equipmentItem(equipmentType);

			if (tool.isUndefinedOrNull(_item))
				return callback(null);

			this.move(player, _item.id, callback);

		} catch (e) {
			return callback(e);
		}
	},

	move:function(player, itemID, callback) {

		try {

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
				case this.game.settings.game.storageType.equipment:
					item.data.storage = this.game.settings.game.storageType.bag;
					break;
				default:
					return callback(new this.game.GameWarring('E0031'));
			}
			if (player.storage.isFull(item.data.storage)) {
				return callback(new this.game.GameWarning('E0032', item.base.nam));
			}
		}catch (e) {
			return callback(e);
		}

		var _data = {item:{}};
		_data.item.remove = [itemID];
		_data.item.add = [item.data];
		
		player.emit(_data);	
		callback(null);
	},

	equip:function(player, itemID, callback) {
		if (!tool.isNumeric(itemID))
			return callback(new this.game.GameWarning('E0026',itemID));

		var item = player.storage.items[itemID];

		if (tool.isUndefinedOrNull(item))
			return callback(new this.game.GameWarning('E0030',itemID));

		this.remove(player, item.base.type, function(err){
			if (err)
				return callback(err);

			var _data = {item:{}};
			if (item.data.num == 1) {
				item.data.storage = this.game.settings.game.storageType.equipment;

				_data.item.remove = [item.id];
			} else {
				item.data.num--;
				_data.item.add = [item.data];
				var new_itemData = {};
				for (var i in item.data) {
					new_itemData[i] = item.data[i];
				}
				new_itemData.num = 1;
				player.storage.add(new_itemData);

				player.emit(_data);
				callback(null);
			}
		});
	},
	
	buy:function(player, itemID, callback) {
			try {

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

			var _item = player.storage.getTheSameItem(_data);

			if (tool.isUndefinedOrNull(_item)) {

				if (player.storage.isFull(_data.storage, player.data.bag))
					return callback(new this.game.GameWarning('E0029', item.nam));

				_item = player.storage.add(_data);
			} else {

				_item.data.num += _data.num;
			}
		
			player.storage.save(function(err){
				if (err)
					return callback(err);
				
				player.data.gold -= item.coins;
				player.emit({item:{add:[_item.data]}});
				player.reflushchangeData();
				callback(null);
			});

			
		}catch (e) {
			return callback(e);
		}
	}
}
