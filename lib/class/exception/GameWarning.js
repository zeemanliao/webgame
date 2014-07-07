var util = require('util');

function GameWarning(errCode){
	var that = GameWarning.super_.call(this, errCode);
	this.errCode = errCode;
	return that;
}

util.inherits(GameWarning, Error);

module.exports = GameWarning;
