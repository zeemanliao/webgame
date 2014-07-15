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

			if (tool.isUndefinedOrNull(player.build))
				player.build = build;

			if (player.build.room != build.room) {
				player.leaveRoom(player.build.room);
				player.joinRoom(build.room);
				player.build = build;
			}
			player.leaveMap();
			player.leaveTeam();

			player.emit({city:{move:buildID}});

			callback(null);
		} catch (e) {
			callback(e);
		}
	}
}