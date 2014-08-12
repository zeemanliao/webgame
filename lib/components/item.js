var tool = require('../util/tool.js');

module.exports = {
	changeStorage:function(player, data, callback) {
		try {
			var item = data.item;
			var storage = data.storage;

			var _theSameItem = player.storage.getTheSameItem(item.data, storage);

			if (player.storage.isFull(storage, player.storageLimit(storage)) &&
				  tool.isUndefinedOrNull(_theSameItem)) {
				return callback(new this.game.GameWarning('E0032', item.base.nam));
			}


			var _data = {item:{}};
			_data.item.remove = [item.id];

			if (tool.isUndefinedOrNull(_theSameItem)) {
				item.data.storage = storage;
				_data.item.add = [item.data];

			} else {
				player.storage.remove(item.id);
				_theSameItem.data.num += item.data.num;
				_data.item.add = [_theSameItem.data];
			}
			
			player.emit(_data);	
			callback(null);

		}catch (e) {
			return callback(e);
		}
	},

	add:function(player, _data, callback) {
		try {
			var _item = player.storage.getTheSameItem(_data, _data.storage);

			if (tool.isUndefinedOrNull(_item)) {

				if (player.storage.isFull(_data.storage, player.data.bag))
					return callback(new this.game.GameWarning('E0029'));

				
				callback(null, player.storage.add(_data));
			} else {

				_item.data.num += _data.num;
				
				callback(null, _item);
			}
		} catch (e) {
			return callback(e);
		}
	}
}