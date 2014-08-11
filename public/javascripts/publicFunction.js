;(function (name, definition) { 
// 檢測上下文環逆是否為AMD或CMD
var hasDefine = typeof define === 'function';
// 檢測上下文環逆是否為Node
var hasExports = typeof module !== 'undefined' && module.exports;
if (hasExports) {
// 定義exports 
module.exports = definition(); 
} else { 
// Client端
this[name] = definition(); 
} 
})('publicFunction', 
function () {
	var funs = {};
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

	return Item;
});
/*
var tool = require('../util/tool');
var publicData = require('./GameData');

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
*/
