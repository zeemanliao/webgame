var tool = require('../util/tool.js');

module.exports = {
	changeStorage:function(player, data, callback) {
		try {
			var item = data.item;

			var _old_storage = item.data.storage;
			var _oldID = data.item.id;

			item.data.storage = data.storage;

			this.add(player, item.data, function(err, _new_item){
				if (err) {
					item.data.storage = _old_storage;
					return callback(err);
				}

				player.storage.remove(_oldID);
				var _data = {item:{
					add:[_new_item.data],
					remove:[_oldID]
				}};
				player.emit(_data);

				callback(null);
			});

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