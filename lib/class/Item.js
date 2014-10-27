var tool = require('../util/tool');
//var publicData = require('./GameData');

function Item(data) {
	this.data = {
		id:data.id,
		baseID:data.baseID,
		level:data.level?data.level:1,
		num:data.num?data.num:1,
		storage:data.storage?data.storage:1
	};
	this.id = data.id;
}

module.exports = Item;


Item.prototype.__defineGetter__("dmg", function(){
	if (this.base.data.dmg)
		return parseInt(((this.data.level-1)/10 + 1) * this.base.data.dmg);

	return 0;
});

Item.prototype.__defineGetter__("def", function(){
	if (this.base.data.def)
		return parseInt(((this.data.level-1)/10 + 1) * this.base.data.def);

	return 0;
});

Item.prototype.__defineGetter__("mag", function(){
	if (this.base.data.mag)
		return parseInt(((this.data.level-1)/10 + 1) * this.base.data.mag);

	return 0;
});

Item.prototype.__defineGetter__("base", function(){
	if (tool.isUndefinedOrNull(publicData.items[this.data.baseID]))
		return {};

  return publicData.items[this.data.baseID];
});

Item.prototype.__defineGetter__("nam", function(){
	if (this.data.nam)
		return this.data.nam;

	return this.base.nam;
});