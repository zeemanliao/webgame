var tool = require('../util/tool.js');

module.exports = {
	move:function(player, buildData, callback) {
		try {
			var build = null;
			if (!tool.isUndefinedOrNull(buildData))
				build = this.game.publicData.builds[buildData];

			if (tool.isUndefinedOrNull(build)){
				buildData = this.game.settings.default.position;
				build = this.game.publicData.builds[buildData];
			}
				//return callback(new game.GameError('E0016'));

			player.move(buildData);
			player.emit({city:{move:buildData}});
		} catch (e) {
			callback(e);
		}
	}
}