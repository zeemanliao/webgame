var tool = require('../util/tool.js');

module.exports = {
	move:function(player, buildData, callback) {
		var build = this.game.publicData.citys[buildData] ;

		if (tool.isUndefinedOrNull(build))
			return callback(new game.GameError('E0016'));

		player.move(buildData);
	}
}