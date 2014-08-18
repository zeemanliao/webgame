var tool = require('../util/tool.js');
var Item = require('../class/Item');
var storageType = require('../settings').game.storageType;

module.exports = {
	put:function(player, itemID, callback){
		try {
			var item = player.storage.items[tool.parseInt(itemID)];

			if (tool.isUndefinedOrNull(item) || 
				item.data.storage != storageType.bag)
				return callback(new this.game.GameWarning('E0030'));

			var _theSameItem = player.storage.getTheSameItem(item, storageType.storage);

			if (player.storage.isFull(storageType.storage, player.data.storage) &&
				tool.isUndefinedOrNull(_theSameItem))
				return callback(new this.game.GameWarning('E0029'));

			var _data = {item:{update:[]}};

			if (tool.isUndefinedOrNull(_theSameItem)) {
				item.data.storage = storageType.storage;

			} else {
				_theSameItem.data.num += item.data.num;
				item.data.num = 0;
				player.storage.remove[item.id];
				_data.item.update.push(_theSameItem.data);
			}
			_data.item.update.push(item.data);
			console.log(item.data);
			player.emit(_data);

			callback(null);

		} catch(e) {
			return callback(e);
		}
	},

	get:function(player, itemID, callback) {
		try {
			var item = player.storage.items[tool.parseInt(itemID)];

			if (tool.isUndefinedOrNull(item) || 
				item.data.storage != storageType.storage)
				return callback(new this.game.GameWarning('E0038'));

			if (player.storage.isFull(storageType.bag, player.data.bag))
				return callback(new this.game.GameWarning('E0029'));

			var _newItem = player.storage.newItem(item.data);
			_newItem.data.num = 1;
			_newItem.data.storage = storageType.bag;

			player.storage.append(_newItem);
			item.data.num -= 1;

			var _data = {item:{update:[]}};

			if (item.data.num == 0) {
				player.storage.remove[item.id];
			}

			_data.item.update.push(_newItem.data);
			_data.item.update.push(item.data);
			player.emit(_data);

			callback(null);

		} catch(e) {
			return callback(e);
		}
	},

	buy:function(player, baseID, callback) {
		try {
			if (player.storage.isFull(storageType.bag, player.data.bag))
				return callback(new this.game.GameWarning('E0029'));

			baseID = tool.parseInt(baseID);

			var _baseData = this.game.publicData.items[baseID];

			if (tool.isUndefinedOrNull(_baseData))
				return callback(new this.game.GameWarning('E0026', baseID));

			if (_baseData.shop != true)
				return callback(new this.game.GameWarning('E0028',_baseData.nam));

			if (player.data.gold < _baseData.coins)
				return callback(new this.game.GameWarning('E0027',_baseData.nam));

			var _itemData = {
				baseID: baseID,
				num: 1,
				level: 1,
				storage: storageType.bag
			};
			var item = player.storage.newItem(_itemData);

			player.storage.append(item);

			player.data.gold -= item.base.coins;
			player.emit({item:{update:[item.data]}});
			player.reflushchangeData();
			callback(null);
			
		}catch (e) {
			return callback(e);
		}
	},

	sell:function(player, itemID, callback) {
		try {
			var item = player.storage.items[tool.parseInt(itemID)];

			if (tool.isUndefinedOrNull(item) || 
				item.data.storage != storageType.bag)
				return callback(new this.game.GameWarning('E0030'));

			var _data = {item:{update:[]}};
			var _getGold = parseInt(item.data.level * item.base.coins * item.data.num / 2);
			player.data.gold += _getGold;

			item.data.storage = storageType.sell;
			_data.item.update.push(item.data);
			
			player.emit(_data);
			player.reflushchangeData();

			callback(null);

		} catch(e) {
			return callback(e);
		}
	},

	reSell:function(player, itemID, callback) {
		try {
			if (player.storage.isFull(storageType.bag, player.data.bag))
				return callback(new this.game.GameWarning('E0029'));

			var item = player.storage.items[tool.parseInt(itemID)];

			if (tool.isUndefinedOrNull(item) || 
				item.data.storage != storageType.sell)
				return callback(new this.game.GameWarning('E0026', tool.parseInt(itemdID)));

			var _useGold = parseInt(item.data.level * item.base.coins * item.data.num);

			if (_useGold > player.data.gold)
				return callback(new this.game.GameWarning('E0027',item.nam));

			var _data = {item:{update:[]}};
			player.data.gold -= _useGold;

			item.data.storage = storageType.bag;
			_data.item.update.push(item.data);
			
			player.emit(_data);
			player.reflushchangeData();

			callback(null);

		} catch(e) {
			return callback(e);
		}
	},

	mix:function(player, itemID, callback) {
		try {
			var item = player.storage.items[tool.parseInt(itemID)];

			if (tool.isUndefinedOrNull(item) || 
				item.data.storage != storageType.bag)
				return callback(new this.game.GameWarning('E0030'));

			var _useGold = parseInt(item.data.level * item.base.coins);

			if (_useGold > player.data.gold)
				return callback(new this.game.GameWarring('E0032',item.nam));

			player.data.gold -= _useGold;

			var _data = {item:{update:[]}};
			item.data.level += 1;
			_data.item.update.push(item.data);
			
			player.emit(_data);
			player.reflushchangeData();

			callback(null);

		} catch(e) {
			return callback(e);
		}
	},

	reMix:function(player, itemID, callback) {

	},

	equip:function(player, itemID, callback) {
		try {
			var item = player.storage.items[tool.parseInt(itemID)];

			if (tool.isUndefinedOrNull(item) || 
				item.data.storage != storageType.bag)
				return callback(new this.game.GameWarning('E0030'));

			var _equipmentItem = player.storage.equipmentItem(item.base.type);

			var _data = {item:{update:[]}};

			if (!tool.isUndefinedOrNull(_equipmentItem)) {
				_equipmentItem.data.storage = storageType.bag;
				_data.item.update.push(_equipmentItem.data);
			}

			item.data.storage = storageType.equipment;
			_data.item.update.push(item.data);
			
			player.emit(_data);

			callback(null);

		} catch(e) {
			return callback(e);
		}
	},

	remove:function(player, equipmentType, callback) {
		try {
			var equipmentType = tool.parseInt(equipmentType);

			if (player.storage.isFull(storageType.bag, player.data.bag))
				return callback(new this.game.GameWarning('E0029'));

			var _equipmentItem = player.storage.equipmentItem(equipmentType);

			if (tool.isUndefinedOrNull(_equipmentItem))
				return callback(new this.game.GameWarning('E0039'));

			_equipmentItem.data.storage = storageType.bag;

			var _data = {item:{update:[]}};

			_data.item.update.push(_equipmentItem.data);
			
			player.emit(_data);

			callback(null);

		} catch(e) {
			return callback(e);
		}
	}
	/*
	levelUp:function(player, itemID, callback) {
		try {

			if (!tool.isNumeric(itemID))
				return callback(new this.game.GameWarning('E0026',itemID));

			var item = player.storage.items[itemID];

			if (tool.isUndefinedOrNull(item) || 
					item.data.storage != this.game.settings.game.storageType.bag)
				return callback(new this.game.GameWarning('E0030' ,itemID));

			var _coinsRequest = item.base.coins * item.data.level;

			if (player.data.gold < _coinsRequest)
				return callback(new this.game.GameWarning('E0032',item.base.nam));
			
			var _mixSourceItem = player.storage.getMixSourceItem(item);

			if (tool.isUndefinedOrNull(_mixSourceItem) ||
					item.data.level > _mixSourceItem.data.num)
				return callback(new this.game.GameWarning('E0033' ,[item.base.nam, item.data.level]));

			var _data = {
				baseID:item.data.baseID,
				storage:item.data.storage,
				level:item.data.level+1,
				num:1
			};

			this.game.components.item.add(player, _data, function(err, _new_item){
				if (err)
					return callback(err);

				var _data = {item:{}};
				_data.item.add = [];
				_data.item.remove = [];

				_mixSourceItem.data.num -= item.data.level;
				item.data.num -=1;

				if (_mixSourceItem.data.num == 0) {
					player.storage.remove(_mixSourceItem.id);
					_data.item.remove.push(_mixSourceItem.id);

				} else {
					_data.item.add.push(_mixSourceItem.data);
				}

				if (item.data.num == 0) {
					player.storage.remove(item.id);
					_data.item.remove.push(item.id);

				} else {
					_data.item.add.push(item.data);
				}

				player.data.gold -= _coinsRequest;

				_data.item.add.push(_new_item.data);
				player.emit(_data);
				player.reflushchangeData();
				return callback(null);
			});

		}catch (e) {

			return callback(e);
		}
	},

	levelDown:function(player, itemID, callback) {
			if (!tool.isNumeric(itemID))
				return callback(new this.game.GameWarning('E0026',itemID));

			var item = player.storage.items[itemID];

			if (tool.isUndefinedOrNull(item) || 
					item.data.storage != this.game.settings.game.storageType.bag)
				return callback(new this.game.GameWarning('E0030' ,itemID));

			if (item.data.level<2)
				return callback(new this.game.GameWarning('E0035','lv.'+ item.data.level + item.base.nam));

			var _coinsRequest = item.base.coins * item.data.level;

			if (player.data.gold < _coinsRequest)
				return callback(new this.game.GameWarning('E0034','lv.'+ item.data.level + item.base.nam));
			
			var _data = {
				baseID:item.data.baseID,
				storage:item.data.storage,
				level:1,
				num:item.data.level
			};

			this.game.components.item.add(player, _data, function(err, _new_item){
				if (err)
					return callback(err);

				player.data.gold -= _coinsRequest;

				player.storage.remove(item.data.id);
				var _data = {item:{
					add:[_new_item.data],
					remove:[item.data.id]
				}};
				
				player.emit(_data);
				player.reflushchangeData();
				return callback(null);
			});
	},

	remove:function(player, equipmentType, callback) {
		try {

			if (!tool.isNumeric(equipmentType))
				return callback(null);

			var _item = player.storage.equipmentItem(equipmentType);

			if (tool.isUndefinedOrNull(_item))
				return callback(null);


			this.game.components.item.changeStorage(player, 
				{item:_item, storage:this.game.settings.game.storageType.bag}, 
				function(err){
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
				return callback(new this.game.GameWarning('E0026', itemID));

			var item = player.storage.items[itemID];

			if (tool.isUndefinedOrNull(item))
				return callback(new this.game.GameWarning('E0030', itemID));

			var _change_storage = 0;
			switch (item.data.storage) {
				case this.game.settings.game.storageType.storage:
					_change_storage = this.game.settings.game.storageType.bag;
					break;
				case this.game.settings.game.storageType.bag:
					_change_storage = this.game.settings.game.storageType.storage;
					break;
				case this.game.settings.game.storageType.equipment:
					_change_storage = this.game.settings.game.storageType.bag;
					break;
				default:
					return callback(new this.game.GameWarring('E0031'));
			}


			this.game.components.item.changeStorage(player,
					{item:item, storage:_change_storage},
					function(err){
						callback(err);
					});

		}catch (e) {
			return callback(e);
		}

	},

	equip:function(player, itemID, callback) {
		var self = this;
		if (!tool.isNumeric(itemID))
			return callback(new this.game.GameWarning('E0026',itemID));

		var item = player.storage.items[itemID];

		if (tool.isUndefinedOrNull(item) || item.data.storage != this.game.settings.game.storageType.bag)
			return callback(new this.game.GameWarning('E0030',itemID));

		var _change_storage = this.game.settings.game.storageType.equipment;

		if (!tool.isUndefinedOrNull(player.storage.getTheSameItem(item.data, _change_storage)))
			return callback(null);

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
			if (!tool.isNumeric(itemID))
				return callback(new this.game.GameWarning('E0026',itemID));

			var item = this.game.publicData.items[itemID];

			if (tool.isUndefinedOrNull(item))
				return callback(null);

			if (item.shop != true)
				return callback(new this.game.GameWarning('E0028',item.nam));

			if (player.data.gold < item.coins)
				return callback(new this.game.GameWarning('E0027',item.nam));

			var _data = {
				baseID: item.id,
				playerID: player.id,
				num: 1,
				level: 1,
				storage: this.game.settings.game.storageType.bag
			};

			this.game.components.item.add(player, _data, function(err, _new_item){
				if (err)
					return callback(err);

				player.data.gold -= item.coins;
				player.emit({item:{add:[_new_item.data]}});
				player.reflushchangeData();
				callback(null);
			});
			
		}catch (e) {
			return callback(e);
		}
	},

	sell:function(player, data, callback) {
		try {
			var num = data.num;

			if (!tool.isNumeric(num))
				return callback(new this.game.GameWarning('E0036', num));

			var itemID = data.id;

			if (!tool.isNumeric(itemID))
				return callback(new this.game.GameWarning('E0026', itemID));

			var item = player.storage.items[itemID];

			if (tool.isUndefinedOrNull(item) || item.data.storage != this.game.settings.game.storageType.bag)
				return callback(new this.game.GameWarning('E0030', itemID));

			if (num > item.data.num)
				return callback(new this.game.GameWarning('E0037', [item.base.name, item.data.num, num]));

			var _sell_itemData = {};
			for (var i in item.data) {
				_sell_itemData[i] = item.data[i];
			}
			_sell_itemData.num = num;
			_sell_itemData.storage = this.game.settings.game.storageType.sell;

			this.game.components.item.add(player, _sell_itemData, function(err, new_item) {
				if (err)
					return callback(err);
				
				player.data.gold += parseInt(new_item.data.num * new_item.data.level * new_item.base.coins / 2);

				var _data = {item:{}};
				_data.item.add = [new_item.data];

				item.data.num -= new_item.data.num;

				if (item.data.num == 0) {
					player.storage.remove(item.id);
					_data.item.remove=[item.id];

				} else {
					_data.item.add.push(item.data);
				}
				player.emit(_data);
				player.reflushchangeData();
				callback(null);
			});
		} catch (e) {
			return callback(e);
		}
	}
	*/
}
