var tool = require('../util/tool.js');

module.exports = {
	checkVersion:function(player, version, callback) {
		game.components.login.getDiffentVersion(player, function(err, diffentVersion){
			if (err)
				return callback(err);

			player.setReturnData('login', 'update', diffentVersion);
			callback(null);
		});

		player.move(data);
	}
}