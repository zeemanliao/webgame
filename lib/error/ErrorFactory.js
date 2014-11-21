var Factory = module.exports = {};

function GameError(errCode, args){
	this.errCode = errCode;
	this.args = args;
}

function GameWarning(errCode, args){
	this.errCode = errCode;
	this.args = args;
}



Factory.create = function(errorType, errCode, args) {
		var _returnError;
		switch (errorType)
		{
			case "error":
				_returnError = GameError;
				break;
			case "warning":
				_returnError = GameWarning;
				break;
		}
	return new _returnError(errCode, args);
}

Factory.GameError = GameError;
Factory.GameWarning = GameWarning;
