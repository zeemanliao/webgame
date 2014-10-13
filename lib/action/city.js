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

			if (player.build.id != buildID) {
				player.room.leave('city_' + build.id);
				player.room.join('city_' + buildID);
				player.build = build;
			}
			
			player.leaveMap();
			player.leaveTeam();
			var _alert = build.alert == true;
			player.emit({city:{move:{nam:buildID,alert:_alert}}});

			callback(null);
		} catch (e) {
			callback(e);
		}
	}
}