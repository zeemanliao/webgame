var tool = require('../util/tool.js');

module.exports = {
	checkAndUpdateVersion:function(player, localVersion, callback) {
		if (tool.isUndefinedOrNull(localVersion) ||
				this.game.components.login.isDiffentVersion(localVersion)) {
			this.game.components.login.getLocalStorage(player, function(err, data){
				if (err)
					return callback(err);
				
				player.emit({login:{updateLoaclStorage:data}});
			});
		
		} else {
			player.emit({login:{updateLoaclStorage:null}});
		}
		callback(null);
	},

	checkLocalStorageVersion:function(player, callback) {
		player.emit({login:{getVersion:1}});
		callback(null);
	}

	loadAllData:function(player, callback) {
		try {
			var data = {};
			data.chara = {
				update:player.data;
			}
			player.emit(data);
		} catch (e) {
			return callback(e);
		}
		return callback(null);
	}
}