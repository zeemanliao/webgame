var ItemAccess = require('./db/ItemAccess');
var tool = require('../util/tool');

function Item(data) {
	this.data = data;
	this.id = this.data.id;
}

module.exports = Item;

Item.prototype.save = function(callback) {
	ItemAccess.save(this.data, function(err){
		callback(err);
	});
}

Item.prototype.delete = function(callback) {
	ItemAccess.delete(this.data, function(err){
		callback(err);
	});
}

Item.prototype.create = function(callback) {
	var self = this;
	ItemAccess.create(this.data, function(err, id){
		if (err)
		 return callback(err);

		self.data.id = id;
		self.id = id;
		callback(null, id);
	});
}