var tool = require('../util/tool.js');

module.exports = {
	getInfo:function(player) {
		return _data = {
			storage: getInfo(player.storage),
			bag: getInfo(player.bag),
			equipment: getInfo(player.equipment)
		};
	}
}

function getInfo(storage) {
	var _data = {};
	_data.limit = storage.limit;
	_data.list = [];
	for (var i in storage.items) {
		_data.list.push(storage.items[i].data);
	}
	return _data;
}