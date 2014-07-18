var ItemAccess = require('./db/ItemAccess');
var tool = require('../util/tool');
var util = require('util');

function Item(data) {
	this.data = data;
	this.id = data.id;
}

module.exports = Item;

Item.prototype.save = function() {
	ItemAccess.save(this.data, function(err){
		console.log(err);
	});
}

Item.getByPlayerID = function(playerID, callback) {
	ItemAccess.getByPlayerID(playerID,
		function(err, items){
			if (err)
				return callback(err);

			if (tool.isUndefinedOrNull(items))
				return callback(null, null);

			var _Items = {};
			for (var i in items){
				_Items[items[i].id]=new Item(items[i]);
			}
			return callback(null, _Items);
	});
}

Item.create = function(data, callback) {
	return callback(null, new Item(data));
}