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


			this.move(player, _item.id, function(err){
				if (err)
					return callback(err);

				player.storage.reflushEquipmentData();
				
				callback(null);
			});

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

			var change_storage = 0;
			switch (item.data.storage) {
				case this.game.settings.game.storageType.storage:
					change_storage = this.game.settings.game.storageType.bag;
					break;
				case this.game.settings.game.storageType.bag:
					change_storage = this.game.settings.game.storageType.storage;
					break;
				case this.game.settings.game.storageType.equipment:
					change_storage = this.game.settings.game.storageType.bag;
					break;
				default:
					return callback(new this.game.GameWarring('E0031'));
			}

			
			var _item = player.storage.getTheSameItem(item.data, change_storage);

			if (player.storage.isFull(item.data.storage) &&
				  tool.isUndefinedOrNull(_item)) {
				return callback(new this.game.GameWarning('E0032', item.base.nam));
			}

			var _data = {item:{}};
			_data.item.remove = [itemID];

			if (tool.isUndefinedOrNull(_item)) {
				item.data.storage = change_storage;
				_data.item.add = [item.data];
			} else {
				player.storage.remove(itemID);
				_item.data.num += item.data.num;
				_data.item.add = [_item.data];
			}
			
			player.emit(_data);	
			callback(null);

		}catch (e) {
			return callback(e);
		}

	},

	equip:function(player, itemID, callback) {
		var self = this;
		if (!tool.isNumeric(itemID))
			return callback(new this.game.GameWarning('E0026',itemID));

		var item = player.storage.items[itemID];

		if (tool.isUndefinedOrNull(item))
			return callback(new this.game.GameWarning('E0030',itemID));

		var _change_storage = this.game.settings.game.storageType.equipment;

		if (!tool.isUndefinedOrNull(player.storage.getTheSameItem(item.data, _change_storage))){
			return callback(null);
		}

		this.remove(player, item.base.type, function(err){
			if (err)
				return callback(err);

			var _data = {item:{}};
			if (item.data.num == 1) {
				item.data.storage = _change_storage;

				_data.item.remove = [item.id];
				_data.item.add = [item.data];
			} else {

				item.data.num--;
				var new_itemData = {};
				for (var i in item.data) {
					new_itemData[i] = item.data[i];
				}
				new_itemData.num = 1;
				new_itemData.storage = self.game.settings.game.storageType.equipment;
				player.storage.add(new_itemData);
				_data.item.add = [new_itemData, item.data];
			}
			player.storage.reflushEquipmentData();
			player.emit(_data);
			callback(null);
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

			var _item = player.storage.getTheSameItem(_data, _data.storage);

			if (tool.isUndefinedOrNull(_item)) {

				if (player.storage.isFull(_data.storage, player.data.bag))
					return callback(new this.game.GameWarning('E0029', item.nam));

				_item = player.storage.add(_data);
			} else {

				_item.data.num += _data.num;
			}
		
			player.data.gold -= item.coins;
			player.emit({item:{add:[_item.data]}});
			player.reflushchangeData();
			callback(null);
			
		}catch (e) {
			return callback(e);
		}
	}
}
