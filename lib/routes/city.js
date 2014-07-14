var tool = require('../util/tool.js');

module.exports = {
	move:function(player, buildID, callback) {
		try {
			var build = null;

			if (!tool.isUndefinedOrNull(buildID))
				build = this.game.publicData.builds[buildID];

			if (tool.isUndefinedOrNull(build)){
				buildID = this.game.settings.default.position;
				build = this.game.publicData.builds[buildID];
			}

			if (player.build.room != build.room) {
				player.leaveRoom(build.room);
				player.joinRoom(build.)
			}
			player.leaveCityRoom();

			player.emit({city:{move:buildID}});
		} catch (e) {
			callback(e);
		}
	}
}