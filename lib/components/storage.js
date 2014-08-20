var tool = require('../util/tool.js');

module.exports = {
	getItems:function(player) {
		var _item = [];
		for (var i in player.storage.items)
			_item.push(player.storage.items[i].data);
		
		return _item;
	}
}
