var tool = require('../util/tool.js');

module.exports = {
	getAllPlayer:function() {
		var _returnData = [];
		for (var v in game.players) {
			var g ={
				nam: game.players[v].data.nam,
				cex: game.players[v].data.cex,
				level: game.players[v].data.level,
				photo: game.players[v].data.photo
			}
			_returnData.push(g);
		}
		return _returnData;
	}
}