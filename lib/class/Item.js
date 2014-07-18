var ItemAccess = require('./db/ItemAccess');
var tool = require('../util/tool');

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
