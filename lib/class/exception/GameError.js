var util = require('util');

function GameError(errCode){
	var that = GameError.super_.call(this, errCode);
	this.errCode = errCode;
	return that;
}

util.inherits(GameError, Error);

module.exports = GameError;
