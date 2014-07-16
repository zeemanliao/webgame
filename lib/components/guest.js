var tool = require('../util/tool.js');

module.exports = {
	getAllPlayer:function() {
		var _returnData = [];

		for (var v in this.game.players) {
			_returnData.push(this.game.players[v].data.getGuest());
		}
		return _returnData;
	}
}